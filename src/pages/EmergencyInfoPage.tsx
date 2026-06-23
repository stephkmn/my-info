import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

import { EmergencyInfoSection } from "../components/EmergencyInfoSection";

type EmergencyProfile = {
    qr_id: string;
    full_name: string;
    age: number | null;
    weight_kg: number | null;
    height_cm: number | null;
    preferred_weight_unit: "lb" | "kg";
    preferred_height_unit: "in" | "cm";
    medications: any[];
    allergies: any[];
    chronic_conditions: any[];
    vaccines: any[];
    emergency_contacts: any[];
    updated_at: string;
};

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
        <main>
            <h1>{profile.full_name}</h1>
            <p>Age: {profile.age ?? "Unknown"}</p>
            <p>QR ID: {profile.qr_id}</p>

            <EmergencyInfoSection
                title="Emergency Contacts"
                items={profile.emergency_contacts}
                renderItem={(contact) => (
                    <div key={`${contact.name}-${contact.phone}`}>
                        <strong>{contact.name}</strong>
                        <p>{contact.relationship}</p>
                        <p>{contact.phone}</p>
                        <p>{contact.email}</p>
                    </div>
                )}
            />

            <EmergencyInfoSection
                title="Allergies"
                items={profile.allergies}
                renderItem={(allergy) => (
                    <div key={allergy.allergen}>
                        <strong>{allergy.allergen}</strong>
                        <p>{allergy.reaction}</p>
                        <p>{allergy.severity}</p>
                    </div>
                )}
            />

            <EmergencyInfoSection
                title="Medications"
                items={profile.medications}
                renderItem={(medication) => (
                    <div key={medication.medication}>
                        <strong>{medication.medication}</strong>
                        <p>Dosage: {medication.dosage}</p>
                        <p>Frequency: {medication.frequency}</p>
                        <p>Other details: {medication.addDetails}</p>
                    </div>
                )}
            />

            <EmergencyInfoSection
                title="Vaccines"
                items={profile.vaccines}
                renderItem={(vaccine) => (
                    <div key={vaccine.vaccine}>
                        <strong>{vaccine.vaccine}</strong>
                        <p>Date Given: {vaccine.dateGiven}</p>
                        <p>Next Dose Date: {vaccine.nextDose || "None"}</p>
                    </div>
                )}
            />

            <EmergencyInfoSection
                title="Chronic Conditions"
                items={profile.chronic_conditions}
                renderItem={(condition) => (
                    <div key={condition.condition}>
                        <strong>{condition.condition}</strong>
                        <p>Details: {condition.addDetails || "None"}</p>
                    </div>
                )}
            />
        </main>
    );
}