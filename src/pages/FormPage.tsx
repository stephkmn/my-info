import { useState, SubmitEvent } from "react";

import { PersonalSection, EMPTY_PERSONAL, PersonalInfo } from "./form-page-sections/PersonalSection";
import { MedicationsSection, MedicationRow } from "./form-page-sections/MedicationsSection";
import { AllergiesSection, AllergyRow } from "./form-page-sections/AllergiesSection";
import { CConditionsSection, CConditionRow } from "./form-page-sections/ChronicConditionsSection";
import { VaccinesSection, VaccineRow } from "./form-page-sections/VaccinesSection";
import { EmergencyContactsSection, ContactRow } from "./form-page-sections/EmergencyContactsSection";
import { poundsToKg, feetInchesToCm } from "../utils/unitConversionHelpers";
import { saveMedicalProfile } from "../services/medicalProfileService";
import { ProfileDraft } from "../types/ProfileDraft";

export function FormPage() {
    const [personal, setPersonal] = useState<PersonalInfo>(EMPTY_PERSONAL)
    const [medications, setMedications] = useState<MedicationRow[]>([]);
    const [allergies, setAllergies] = useState<AllergyRow[]>([]);
    const [chronicConditions, setChronicConditions] = useState<CConditionRow[]>([]);
    const [vaccines, setVaccines] = useState<VaccineRow[]>([]);
    const [emergencyContacts, setEmergencyContacts] = useState<ContactRow[]>([]);

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const weightKg = 
            personal.weight === "" 
            ? null
            : personal.weightUnit === "lb"
                ? poundsToKg(Number(personal.weight))
                : Number(personal.weight)

        const heightCm = 
            personal.heightUnit === "in"
            ? feetInchesToCm(
                Number(personal.heightFt || 0),
                Number(personal.heightIn || 0)
            )
            : personal.heightCm === ""
            ? null
            : Number(personal.heightCm)
        
        const profileDraft : ProfileDraft = {
            personal: {
                name: personal.name,
                dob: personal.dob || null,
                addr: personal.addr || null,
                weight_kg: weightKg,
                height_cm: heightCm,
                preferred_weight_unit: personal.weightUnit,
                preferred_height_unit: personal.heightUnit
            },
            medications,
            allergies,
            chronicConditions,
            vaccines,
            emergencyContacts
        }
        
        const result = await saveMedicalProfile(profileDraft);
        console.log(result.qrId);
    }

    return (
        <form className="form-page" onSubmit={handleSubmit}>
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
            
            <button type="submit">Submit</button>
        </form>
    )
}







