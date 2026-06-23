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