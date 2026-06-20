import { useState } from "react";

import { InputField } from "../components/InputField";
import { MedicationsSection } from "./form-page-sections/MedicationsSection";
import { AllergiesSection } from "./form-page-sections/AllergiesSection";
import { CConditionsSection } from "./form-page-sections/ChronicConditionsSection";

export function FormPage() {
    return (
        <>
            <h2 className="section-header">Personal Information</h2>
            <PersonalSection />
            <h2 className="section-header">Medications and Known Allergies</h2>
            <MedicationsSection />
            <AllergiesSection />
            <h2 className="section-header">Health History</h2>
            <CConditionsSection />
        </>
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





