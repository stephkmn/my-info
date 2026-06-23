import { supabase } from "../supabaseClient";
import { ProfileDraft } from "../types/ProfileDraft";

export async function saveMedicalProfile(profileDraft: ProfileDraft) {
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error("You must be logged in to save your profile.")
    }

    // Save profile
    const { data: profile, error: profileError } = await supabase
        .from("medical_profiles")
        .upsert(
            {
                user_id: user.id,
                full_name: profileDraft.personal.name,
                date_of_birth: profileDraft.personal.dob,
                address: profileDraft.personal.addr,
                weight_kg: profileDraft.personal.weight_kg,
                height_cm: profileDraft.personal.height_cm,
                preferred_weight_unit: profileDraft.personal.preferred_weight_unit,
                preferred_height_unit: profileDraft.personal.preferred_height_unit,
            },
            { onConflict: "user_id" }
        )
        .select("id, qr_id")
        .single();

    if (profileError || !profile) {
        throw profileError ?? new Error("Could not save medical profile.")
    }

    // Save medications
    const { error: deleteMedicationsError } = await supabase
        .from("medical_profile_medications")
        .delete()
        .eq("profile_id", profile.id);

    if (deleteMedicationsError) {
        throw deleteMedicationsError;
    }

    if (profileDraft.medications.length > 0) {
        const { error: insertMedicationsError } = await supabase
            .from("medical_profile_medications")
            .insert(
                profileDraft.medications.map((row, index) => ({
                    profile_id: profile.id,
                    sort_order: index,
                    medication: row.medication,
                    dosage: row.dosage || null,
                    frequency: row.frequency || null,
                    add_details: row.addDetails || null,
                }))
            );

        if (insertMedicationsError) {
            throw insertMedicationsError;
        }
    }

    // Save allergies
    // Save allergies
    const { error: deleteAllergiesError } = await supabase
        .from("medical_profile_allergies")
        .delete()
        .eq("profile_id", profile.id);

    if (deleteAllergiesError) {
        throw deleteAllergiesError;
    }

    if (profileDraft.allergies.length > 0) {
        const { error: insertAllergiesError } = await supabase
            .from("medical_profile_allergies")
            .insert(
                profileDraft.allergies.map((row, index) => ({
                    profile_id: profile.id,
                    sort_order: index,
                    allergen: row.allergen,
                    reaction: row.reaction || null,
                    severity: row.severity || null,
                }))
            );

        if (insertAllergiesError) {
            throw insertAllergiesError;
        }
    }

    // Save chronic conditions
    const { error: deleteChronicConditionsError } = await supabase
        .from("medical_profile_chronic_conditions")
        .delete()
        .eq("profile_id", profile.id);

    if (deleteChronicConditionsError) {
        throw deleteChronicConditionsError;
    }

    if (profileDraft.chronicConditions.length > 0) {
        const { error: insertChronicConditionsError } = await supabase
            .from("medical_profile_chronic_conditions")
            .insert(
                profileDraft.chronicConditions.map((row, index) => ({
                    profile_id: profile.id,
                    sort_order: index,
                    condition: row.condition,
                    add_details: row.addDetails || null,
                }))
            );

        if (insertChronicConditionsError) {
            throw insertChronicConditionsError;
        }
    }

    // Save vaccines
    const { error: deleteVaccinesError } = await supabase
        .from("medical_profile_vaccines")
        .delete()
        .eq("profile_id", profile.id);

    if (deleteVaccinesError) {
        throw deleteVaccinesError;
    }

    if (profileDraft.vaccines.length > 0) {
        const { error: insertVaccinesError } = await supabase
            .from("medical_profile_vaccines")
            .insert(
                profileDraft.vaccines.map((row, index) => ({
                    profile_id: profile.id,
                    sort_order: index,
                    vaccine: row.vaccine,
                    date_given: row.dateGiven || null,
                    next_dose: row.nextDose || null,
                }))
            );

        if (insertVaccinesError) {
            throw insertVaccinesError;
        }
    }

    // Save emergency contacts
    const { error: deleteEmergencyContactsError } = await supabase
        .from("medical_profile_emergency_contacts")
        .delete()
        .eq("profile_id", profile.id);

    if (deleteEmergencyContactsError) {
        throw deleteEmergencyContactsError;
    }

    if (profileDraft.emergencyContacts.length > 0) {
        const { error: insertEmergencyContactsError } = await supabase
            .from("medical_profile_emergency_contacts")
            .insert(
                profileDraft.emergencyContacts.map((row, index) => ({
                    profile_id: profile.id,
                    sort_order: index,
                    name: row.name,
                    relationship: row.relationship || null,
                    phone: row.phone || null,
                    email: row.email || null,
                }))
            );

        if (insertEmergencyContactsError) {
            throw insertEmergencyContactsError;
        }
    }

    return {
        profileId: profile.id,
        qrId: profile.qr_id
    };
}

import type { PersonalInfo } from "../pages/form-page-sections/PersonalSection";
import type { MedicationRow } from "../pages/form-page-sections/MedicationsSection";
import type { AllergyRow } from "../pages/form-page-sections/AllergiesSection";
import type { CConditionRow } from "../pages/form-page-sections/ChronicConditionsSection";
import type { VaccineRow } from "../pages/form-page-sections/VaccinesSection";
import type { ContactRow } from "../pages/form-page-sections/EmergencyContactsSection";
import { kgToPounds, cmToFeetInches } from "../utils/unitConversionHelpers";

export type LoadedMedicalProfile = {
    personal: PersonalInfo;
    medications: MedicationRow[];
    allergies: AllergyRow[];
    chronicConditions: CConditionRow[];
    vaccines: VaccineRow[];
    emergencyContacts: ContactRow[];
    qrId: string;
};

export async function loadCurrentUserMedicalProfile(): Promise<LoadedMedicalProfile | null> {
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error("You must be logged in to load your medical profile.");
    }

    const { data: profile, error: profileError } = await supabase
        .from("medical_profiles")
        .select(
            "id, qr_id, full_name, date_of_birth, address, weight_kg, height_cm, preferred_weight_unit, preferred_height_unit"
        )
        .eq("user_id", user.id)
        .maybeSingle();

    if (profileError) {
        throw profileError;
    }

    if (!profile) {
        return null;
    }

    const [
        medicationsResult,
        allergiesResult,
        chronicConditionsResult,
        vaccinesResult,
        emergencyContactsResult,
    ] = await Promise.all([
        supabase
            .from("medical_profile_medications")
            .select("medication, dosage, frequency, add_details")
            .eq("profile_id", profile.id)
            .order("sort_order"),

        supabase
            .from("medical_profile_allergies")
            .select("allergen, reaction, severity")
            .eq("profile_id", profile.id)
            .order("sort_order"),

        supabase
            .from("medical_profile_chronic_conditions")
            .select("condition, add_details")
            .eq("profile_id", profile.id)
            .order("sort_order"),

        supabase
            .from("medical_profile_vaccines")
            .select("vaccine, date_given, next_dose")
            .eq("profile_id", profile.id)
            .order("sort_order"),

        supabase
            .from("medical_profile_emergency_contacts")
            .select("name, relationship, phone, email")
            .eq("profile_id", profile.id)
            .order("sort_order"),
    ]);

    if (medicationsResult.error) throw medicationsResult.error;
    if (allergiesResult.error) throw allergiesResult.error;
    if (chronicConditionsResult.error) throw chronicConditionsResult.error;
    if (vaccinesResult.error) throw vaccinesResult.error;
    if (emergencyContactsResult.error) throw emergencyContactsResult.error;

    const weightUnit = profile.preferred_weight_unit === "kg" ? "kg" : "lb";
    const heightUnit = profile.preferred_height_unit === "cm" ? "cm" : "in";

    const weight =
        profile.weight_kg == null
            ? ""
            : weightUnit === "lb"
                ? String(Math.round(kgToPounds(Number(profile.weight_kg)) * 10) / 10)
                : String(profile.weight_kg);

    const heightParts =
        profile.height_cm == null ? null : cmToFeetInches(Number(profile.height_cm));

    const personal: PersonalInfo = {
        name: profile.full_name ?? "",
        dob: profile.date_of_birth ?? "",
        addr: profile.address ?? "",
        weight,
        weightUnit,
        heightUnit,
        heightFt: heightUnit === "in" && heightParts ? String(heightParts.ft) : "",
        heightIn: heightUnit === "in" && heightParts ? String(heightParts.inches) : "",
        heightCm:
            heightUnit === "cm" && profile.height_cm != null
                ? String(profile.height_cm)
                : "",
    };

    return {
        personal,
        medications: (medicationsResult.data ?? []).map((row) => ({
            medication: row.medication ?? "",
            dosage: row.dosage ?? "",
            frequency: row.frequency ?? "",
            addDetails: row.add_details ?? "",
        })),
        allergies: (allergiesResult.data ?? []).map((row) => ({
            allergen: row.allergen ?? "",
            reaction: row.reaction ?? "",
            severity: row.severity ?? "",
        })),
        chronicConditions: (chronicConditionsResult.data ?? []).map((row) => ({
            condition: row.condition ?? "",
            addDetails: row.add_details ?? "",
        })),
        vaccines: (vaccinesResult.data ?? []).map((row) => ({
            vaccine: row.vaccine ?? "",
            dateGiven: row.date_given ?? "",
            nextDose: row.next_dose ?? "",
        })),
        emergencyContacts: (emergencyContactsResult.data ?? []).map((row) => ({
            name: row.name ?? "",
            relationship: row.relationship ?? "",
            phone: row.phone ?? "",
            email: row.email ?? "",
        })),
        qrId: profile.qr_id,
    };
}