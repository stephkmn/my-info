import { useState } from "react";

import { InputField } from "../components/InputField";
import { MedicationsSection } from "./form-page-sections/MedicationsSection";
import { AllergiesSection } from "./form-page-sections/AllergiesSection";
import { CConditionsSection } from "./form-page-sections/ChronicConditionsSection";
import { VaccinesSection } from "./form-page-sections/VaccinesSection";
import { EmergencyContactsSection } from "./form-page-sections/EmergencyContactsSection";

import { MedicationRow } from "./form-page-sections/MedicationsSection";
import { AllergyRow } from "./form-page-sections/AllergiesSection";
import { CConditionRow } from "./form-page-sections/ChronicConditionsSection";
import { VaccineRow } from "./form-page-sections/VaccinesSection";
import { ContactRow } from "./form-page-sections/EmergencyContactsSection";

export function FormPage() {
    const [medications, setMedications] = useState<MedicationRow[]>([]);
    const [allergies, setAllergies] = useState<AllergyRow[]>([]);
    const [chronicConditions, setChronicConditions] = useState<CConditionRow[]>([]);
    const [vaccines, setVaccines] = useState<VaccineRow[]>([]);
    const [emergencyContacts, setEmergencyContacts] = useState<ContactRow[]>([]);
    return (
        <form className="form-page">
            <h2 className="section-header">Personal Information</h2>
            <PersonalSection />
            <h2 className="section-header">Medications and Known Allergies</h2>
            <MedicationsSection rows={medications} setRows={setMedications} />
            <AllergiesSection rows={allergies} setRows={setAllergies} />
            <h2 className="section-header">Health History</h2>
            <CConditionsSection rows={chronicConditions} setRows={setChronicConditions} />
            <VaccinesSection rows={vaccines} setRows={setVaccines} />
            <h2 className="section-header">Emergency Contacts</h2>
            <EmergencyContactsSection rows={emergencyContacts} setRows={setEmergencyContacts} />
            <button type="button" onClick={() => {console.log(medications)}}>Test</button>
            <button type="submit">Submit</button>
        </form>
    )
}

function PersonalSection() {
    const [weightUnit, setWeightUnit] = useState<"lb" | "kg">("lb");
    const [heightUnit, setHeightUnit] = useState<"in" | "cm">("in");

    return (
        <div className="section-wrapper">
            <InputField
                field="Name"
                fieldID="name"
                fieldType="text"
                placeHolder="Enter your full name"
            />
            <InputField
                field="Date of Birth"
                fieldID="dob"
                fieldType="date"
                placeHolder="Enter your date of birth"
            />
            <InputField
                field="Address"
                fieldID="addr"
                fieldType="text"
                placeHolder="Enter your address"
            />

            <InputField
                field="Weight"
                fieldID="weight"
                fieldType="number"
                placeHolder="Enter your weight"
            />
            <select name="w-unit"
                id="w-unit"
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value as "lb" | "kg")}>
                <option value="lb">lb</option>
                <option value="kg">kg</option>
            </select>

            <label>Height</label>
            {heightUnit === "in" ? (
                <>
                    <input
                        type="number"
                        id="height-ft"
                        name="height-ft"
                        placeholder="0"
                    />
                    <input
                        type="number"
                        id="height-in"
                        name="height-in"
                        placeholder="0"
                    />
                </>
            ) : (
                <input
                    type="number"
                    id="height-cm"
                    name="height-cm"
                    placeholder="0"
                />
            )}

            <select name="h-unit"
                id="h-unit"
                value={heightUnit}
                onChange={(e) => setHeightUnit(e.target.value as "in" | "cm")}>
                <option value="in">ft/in</option>
                <option value="cm">cm</option>
            </select>
        </div>
    )
}





