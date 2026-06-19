import { useState } from "react";

import { InputField } from "../components/InputField";
import { MedicationsTable } from "../components/MedicationsTable";
import { TableEntry } from "../components/TableEntry";

import { MedicationRow } from "../types/MedicationRow"

export function FormPage() {
    return (
        <>
            <PersonalSection />
            <MedicationsSection />
        </>
    )
}

function PersonalSection() {
    const [weightUnit, setWeightUnit] = useState<"lb" | "kg">("lb");
    const [heightUnit, setHeightUnit] = useState<"in" | "cm">("in");
    return (
        <div className="personal-section">
            <h2 className="section-header">Personal Information</h2>
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

function MedicationsSection() {
    const [entryOpen, setEntryOpen] = useState(false)

    const [rows, setRows] = useState([
        { medication: "Idk", dosage: "200 mg", frequency: "2x a day", addDetails: "" }
    ])

    function handleDeleteRow(targetIdx: number) {
        setRows(rows.filter((_, idx) => idx !== targetIdx));
    }

    function handleSubmit(newRow: MedicationRow) {
        setRows([...rows, newRow])
    }

    return (
        <div className="meds-and-allergies-section">
            <h2>Medications and Known Allergies</h2>
            <MedicationsTable
                rows={rows}
                deleteRow={handleDeleteRow}
            />
            <button className="add-table-entry-btn" onClick={() => setEntryOpen(true)}>Add</button>
            {entryOpen && <TableEntry closeEntry={() => {
                setEntryOpen(false)
            }}
                onSubmit={handleSubmit} />}
        </div>
    )
}



