import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

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

            <section>
                <h2>Emergency Contacts</h2>

                {profile.emergency_contacts.length === 0 ? (
                    <p>None</p>
                ) : (
                    profile.emergency_contacts.map((contact) => (
                        <div key={`${contact.name}-${contact.phone}`}>
                            <strong>{contact.name}</strong>
                            <p>{contact.relationship}</p>
                            <p>{contact.phone}</p>
                            <p>{contact.email}</p>
                        </div>
                    ))
                )}
            </section>

            <section>
                <h2>Allergies</h2>

                {profile.allergies.length === 0 ? (
                    <p>None</p>
                ) : (
                    profile.allergies.map((allergy) => (
                        <div key={allergy.allergen}>
                            <strong>{allergy.allergen}</strong>
                            <p>{allergy.reaction}</p>
                            <p>{allergy.severity}</p>
                        </div>
                    ))
                )}
            </section>

            <section>
                <h2>Medications</h2>

                {profile.medications.length === 0 ? (
                    <p>None</p>
                ) : (
                    profile.medications.map((medication) => (
                        <div key={medication.medication}>
                            <strong>{medication.medication}</strong>
                            <p>Dosage: {medication.dosage}</p>
                            <p>Frequency: {medication.frequency}</p>
                            <p>Other details: {medication.addDetails}</p>
                        </div>
                    ))
                )}
            </section>

            <section>
                <h2>Vaccines</h2>

                {profile.vaccines.length === 0 ? (
                    <p>None</p>
                ) : (
                    profile.vaccines.map((vaccine) => (
                        <div key={vaccine.vaccine}>
                            <strong>{vaccine.vaccine}</strong>
                            <p>Date Given: {vaccine.dateGiven}</p>
                            <p>Next Dose Date: {vaccine.nextDose}</p>
                        </div>
                    ))
                )}
            </section>

            <section>
                <h2>Chronic Conditions</h2>
                {profile.chronic_conditions.length === 0 ? (
                    <p>None</p>
                ) : (
                    profile.chronic_conditions.map((chronic_conditions) => (
                        <div key={chronic_conditions.condition}>
                            <strong>{chronic_conditions.condition}</strong>
                            <p>Details: {chronic_conditions.addDetails}</p>
                        </div>
                    ))
                )}
            </section>
        </main>
    );
}