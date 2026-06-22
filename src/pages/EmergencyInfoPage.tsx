import { useParams } from "react-router-dom";

import { GenericInfoTable } from "../components/GenericInfoTable";

// Mock profile to test page before database hookup
const mockProfile = {
    qr_id: "mock-qr-id",
    full_name: "Jane Doe",
    age: 29,
    weight_kg: 68,
    height_cm: 170,
    medications: [
        {
            medication: "Metformin",
            dosage: "500 mg",
            frequency: "2x daily",
            addDetails: "With meals",
        },
    ],
    allergies: [
        {
            allergen: "Peanuts",
            reaction: "Swelling",
            severity: "Severe",
        },
    ],
    chronic_conditions: [
        {
            condition: "Type 2 Diabetes",
            addDetails: "Uses glucose monitor",
        },
    ],
    vaccines: [
        {
            vaccine: "Tetanus",
            dateGiven: "2023-06-01",
            nextDose: "2033-06-01",
        },
    ],
    emergency_contacts: [
        {
            name: "Alex Doe",
            relationship: "Spouse",
            phone: "555-123-4567",
            email: "alex@example.com",
        },
    ],
    updated_at: new Date().toISOString(),
};

export function EmergencyInfoPage() {
    const { qrId } = useParams();

    return (
        <main>
            <h1>{mockProfile.full_name}</h1>
            <p>Age: {mockProfile.age}</p>
            <p>QR ID: {qrId}</p>

            <section>
                <h2>Emergency Contacts</h2>
                {mockProfile.emergency_contacts.map((contact) => (
                    <div key={contact.phone}>
                        <strong>{contact.name}</strong>
                        <p>{contact.relationship}</p>
                        <p>{contact.phone}</p>
                        <p>{contact.email}</p>
                    </div>
                ))}
            </section>

            <section>
                <h2>Allergies</h2>
                {mockProfile.allergies.map((allergy) => (
                    <div key={allergy.allergen}>
                        <strong>{allergy.allergen}</strong>
                        <p>{allergy.reaction}</p>
                        <p>{allergy.severity}</p>
                    </div>
                ))}
            </section>

            <section>
                <h2>Medications</h2>
                {mockProfile.medications.map((medication) => (
                    <div key={medication.medication}>
                        <strong>{medication.medication}</strong>
                        <p>Dosage: {medication.dosage}</p>
                        <p>Frequency: {medication.frequency}</p>
                        <p>Other details: {medication.addDetails}</p>
                    </div>
                ))}
            </section>

            <section>
                <h2>Vaccines</h2>
                {mockProfile.vaccines.map((vaccine) => (
                    <div key={vaccine.vaccine}>
                        <strong>{vaccine.vaccine}</strong>
                        <p>Date Given: {vaccine.dateGiven}</p>
                        <p>Next Dose Date: {vaccine.nextDose}</p>
                    </div>
                ))}
            </section>

            <section>
                <h2>Chronic Conditions</h2>
                {mockProfile.chronic_conditions.map((chronic_conditions) => (
                    <div key={chronic_conditions.condition}>
                        <strong>{chronic_conditions.condition}</strong>
                        <p>Details: {chronic_conditions.addDetails}</p>
                    </div>
                ))}
            </section>
        </main>
    );
}