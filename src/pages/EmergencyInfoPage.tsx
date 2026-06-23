import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { GenericInfoTable } from "../components/GenericInfoTable";
import { cmToFeetInches, kgToPounds } from "../utils/unitConversionHelpers";
import type { ColumnDef } from "../types/TableConfig";

type MedicationInfo = {
    medication: string | null;
    dosage: string | null;
    frequency: string | null;
    addDetails: string | null;
};

type AllergyInfo = {
    allergen: string | null;
    reaction: string | null;
    severity: string | null;
};

type ChronicConditionInfo = {
    condition: string | null;
    addDetails: string | null;
};

type VaccineInfo = {
    vaccine: string | null;
    dateGiven: string | null;
    nextDose: string | null;
};

type EmergencyContactInfo = {
    name: string | null;
    relationship: string | null;
    phone: string | null;
    email: string | null;
};

type EmergencyProfile = {
    qr_id: string;
    full_name: string;
    age: number | null;
    weight_kg: number | null;
    height_cm: number | null;
    preferred_weight_unit: "lb" | "kg";
    preferred_height_unit: "in" | "cm";
    medications: MedicationInfo[];
    allergies: AllergyInfo[];
    chronic_conditions: ChronicConditionInfo[];
    vaccines: VaccineInfo[];
    emergency_contacts: EmergencyContactInfo[];
    updated_at: string;
};

const CONTACT_COLUMNS: ColumnDef<EmergencyContactInfo>[] = [
    { key: "name", label: "Name" },
    { key: "relationship", label: "Relationship" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
];

const ALLERGY_COLUMNS: ColumnDef<AllergyInfo>[] = [
    { key: "allergen", label: "Allergen" },
    { key: "reaction", label: "Reaction" },
    { key: "severity", label: "Severity" },
];

const MEDICATION_COLUMNS: ColumnDef<MedicationInfo>[] = [
    { key: "medication", label: "Medication" },
    { key: "dosage", label: "Dosage" },
    { key: "frequency", label: "Frequency" },
    { key: "addDetails", label: "Details" },
];

const VACCINE_COLUMNS: ColumnDef<VaccineInfo>[] = [
    { key: "vaccine", label: "Vaccine" },
    { key: "dateGiven", label: "Date Given" },
    { key: "nextDose", label: "Next Dose" },
];

const CHRONIC_CONDITION_COLUMNS: ColumnDef<ChronicConditionInfo>[] = [
    { key: "condition", label: "Condition" },
    { key: "addDetails", label: "Details" },
];

function formatWeight(profile: EmergencyProfile) {
    if (profile.weight_kg === null) {
        return "Unknown";
    }

    if (profile.preferred_weight_unit === "lb") {
        return `${Math.round(kgToPounds(Number(profile.weight_kg)))} lb`;
    }

    return `${Math.round(Number(profile.weight_kg) * 10) / 10} kg`;
}

function formatHeight(profile: EmergencyProfile) {
    if (profile.height_cm === null) {
        return "Unknown";
    }

    if (profile.preferred_height_unit === "in") {
        const height = cmToFeetInches(Number(profile.height_cm));
        return `${height.ft}' ${height.inches}"`;
    }

    return `${Math.round(Number(profile.height_cm))} cm`;
}

function formatDate(value: string) {
    return new Date(value).toLocaleDateString();
}

export function EmergencyInfoPage() {
    const { qrId } = useParams();
    const [profile, setProfile] = useState<EmergencyProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function loadProfile() {
            if (!qrId) {
                setErrorMessage("Missing emergency profile ID.");
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .rpc("get_emergency_profile_by_qr_id", {
                    p_qr_id: qrId,
                })
                .single();

            if (error) {
                setErrorMessage(error.message);
                setLoading(false);
                return;
            }

            if (!data) {
                setErrorMessage("Emergency profile not found.");
                setLoading(false);
                return;
            }

            setProfile(data as EmergencyProfile);
            setLoading(false);
        }

        loadProfile();
    }, [qrId]);

    if (loading) {
        return <main>Loading emergency profile...</main>;
    }

    if (errorMessage || !profile) {
        return <main>Emergency profile not found.</main>;
    }

    return (
        <main className="emergency-info-page">
            <header className="emergency-info-header">
                <h1>{profile.full_name}</h1>
                <p>Emergency ID: {profile.qr_id}</p>
            </header>

            <div className="emergency-summary">
                <p>Age: {profile.age ?? "Unknown"}</p>
                <p>Weight: {formatWeight(profile)}</p>
                <p>Height: {formatHeight(profile)}</p>
                <p>Last Updated: {formatDate(profile.updated_at)}</p>
            </div>

            <section>
                <h2>Emergency Contacts</h2>
                <GenericInfoTable rows={profile.emergency_contacts} columns={CONTACT_COLUMNS} />
            </section>

            <section>
                <h2>Allergies</h2>
                <GenericInfoTable rows={profile.allergies} columns={ALLERGY_COLUMNS} />
            </section>

            <section>
                <h2>Medications</h2>
                <GenericInfoTable rows={profile.medications} columns={MEDICATION_COLUMNS} />
            </section>

            <section>
                <h2>Vaccines</h2>
                <GenericInfoTable rows={profile.vaccines} columns={VACCINE_COLUMNS} />
            </section>

            <section>
                <h2>Chronic Conditions</h2>
                <GenericInfoTable rows={profile.chronic_conditions} columns={CHRONIC_CONDITION_COLUMNS} />
            </section>
        </main>
    );
}
