import { useState, ChangeEvent } from "react";
import { ColumnDef } from "../types/TableConfig";

interface GenericEntry<T> {
    closeEntry: () => void;
    onSubmit: (r: T) => void;
    initialRow?: T | null;
    columns: ColumnDef<T>[];
    emptyState: T;
}

export function GenericEntry<T>({
    closeEntry,
    onSubmit,
    initialRow,
    columns,
    emptyState
} : GenericEntry<T> )
{
    const [formState, setFormState] = useState<T>(initialRow || emptyState)
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setErrorMessage("");
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = () => {
        const missingColumn = columns.find((col) => {
            if (!col.required) {
                return false;
            }

            const value = formState[col.key];
            return value === null || value === undefined || String(value).trim() === "";
        });

        if (missingColumn) {
            setErrorMessage(`${missingColumn.label} is required.`);
            return;
        }

        onSubmit(formState);
    };

    return(
        <div className="table-entry-wrapper"
            onClick={(e) => {
                if(e.target === e.currentTarget) {
                    closeEntry();
                }
            }}>
            <div>
                <button type="button" className="table-entry-close-btn" onClick={closeEntry}>X</button>
                {errorMessage && <p className="validation-error">{errorMessage}</p>}
                {columns.map((col, idx) => (
                    <div key={idx} className="input-group">
                        <label htmlFor={String(col.key)}>{col.label}</label>
                        <input
                            type={col.inputType || "text"}
                            id={String(col.key)}
                            name={String(col.key)}
                            placeholder={col.placeholder || ""}
                            required={col.required}
                            value={formState[col.key] == null ? "" : String(formState[col.key])}
                            onChange={handleChange}
                        />
                    </div>
                ))}

                <button 
                    type="button"
                    className="table-entry-submit-btn"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}
