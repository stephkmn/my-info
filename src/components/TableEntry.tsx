import { useState, SubmitEvent } from "react";
import { MedicationRow } from "../types/MedicationRow"

export function TableEntry({
    closeEntry,
    onSubmit
} : {
    closeEntry: () => void;
    onSubmit: (r: MedicationRow) => void;
})
{
    const [formState, setFormState] = useState({
        medication: "",
        dosage: "",
        frequency: "",
        addDetails: ""
    })

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formState);
    };

    return(
        <div className="table-entry-wrapper"
            onClick={(e) => {
                if(e.target === e.currentTarget) {
                    closeEntry();
                }
            }}>
            <button className="table-entry-close-btn" onClick={closeEntry}>X</button>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Medication">Medication</label>
                <input 
                    type="text"
                    id="medication"
                    name="medication"
                    placeholder="Medication Name"
                />

                <label htmlFor="Dosage">Dosage</label>
                <input
                    type="text"
                    id="dosage"
                    name="dosage"
                    placeholder="e.g. 200 mg"
                />

                <label htmlFor="Frequency">Frequency</label>
                <input
                    type="text"
                    id="frequency"
                    name="frequency"
                    placeholder="e.g. 2 times a day"
                />
                
                <label htmlFor="Additional Details">Additional Details</label>
                <input
                    type="text"
                    id="add-details"
                    name="add-details"
                    placeholder=""
                />
            </form>
            <button type="submit" className="table-entry-submit-btn">
                Submit
            </button>
        </div>
    )
}