import { useState, SubmitEvent, ChangeEvent } from "react";
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

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    }

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
                    value={formState.medication}
                    onChange={handleChange}
                />

                <label htmlFor="Dosage">Dosage</label>
                <input
                    type="text"
                    id="dosage"
                    name="dosage"
                    placeholder="e.g. 200 mg"
                    value={formState.dosage}
                    onChange={handleChange}
                />

                <label htmlFor="Frequency">Frequency</label>
                <input
                    type="text"
                    id="frequency"
                    name="frequency"
                    placeholder="e.g. 2 times a day"
                    value={formState.frequency}
                    onChange={handleChange}
                />
                
                <label htmlFor="Additional Details">Additional Details</label>
                <input
                    type="text"
                    id="addDetails"
                    name="addDetails"
                    placeholder=""
                    value={formState.addDetails}
                    onChange={handleChange}
                />

                <button type="submit" className="table-entry-submit-btn">
                    Submit
                </button>
            </form>
        </div>
    )
}