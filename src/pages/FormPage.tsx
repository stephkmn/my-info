import { useState, SubmitEvent } from "react";

import { InputField } from "../components/InputField";

import { PersonalSection, EMPTY_PERSONAL, PersonalInfo } from "./form-page-sections/PersonalSection";
import { MedicationsSection, MedicationRow } from "./form-page-sections/MedicationsSection";
import { AllergiesSection, AllergyRow } from "./form-page-sections/AllergiesSection";
import { CConditionsSection, CConditionRow } from "./form-page-sections/ChronicConditionsSection";
import { VaccinesSection, VaccineRow } from "./form-page-sections/VaccinesSection";
import { EmergencyContactsSection, ContactRow } from "./form-page-sections/EmergencyContactsSection";

export function FormPage() {
    const [personal, setPersonal] = useState<PersonalInfo>(EMPTY_PERSONAL)
    const [medications, setMedications] = useState<MedicationRow[]>([]);
    const [allergies, setAllergies] = useState<AllergyRow[]>([]);
    const [chronicConditions, setChronicConditions] = useState<CConditionRow[]>([]);
    const [vaccines, setVaccines] = useState<VaccineRow[]>([]);
    const [emergencyContacts, setEmergencyContacts] = useState<ContactRow[]>([]);

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        console.log({
            personal,
            medications,
            allergies,
            chronicConditions,
            vaccines,
            emergencyContacts
        });
    }

    return (
        <form className="form-page">
            <h2 className="section-header">Personal Information</h2>
            <PersonalSection personal={personal} setPersonal={setPersonal} />

            <h2 className="section-header">Medications and Known Allergies</h2>
            <MedicationsSection rows={medications} setRows={setMedications} />
            <AllergiesSection rows={allergies} setRows={setAllergies} />

            <h2 className="section-header">Health History</h2>
            <CConditionsSection rows={chronicConditions} setRows={setChronicConditions} />
            <VaccinesSection rows={vaccines} setRows={setVaccines} />

            <h2 className="section-header">Emergency Contacts</h2>
            <EmergencyContactsSection rows={emergencyContacts} setRows={setEmergencyContacts} />
            
            <button type="button" onClick={() => {console.log(personal)}}>Test</button>
            <button type="submit">Submit</button>
        </form>
    )
}







