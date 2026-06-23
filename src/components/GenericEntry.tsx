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

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = () => {
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
                {columns.map((col, idx) => (
                    <div key={idx} className="input-group">
                        <label htmlFor={String(col)}>{col.label}</label>
                        <input
                            type={col.inputType || "text"}
                            id={String(col.key)}
                            name={String(col.key)}
                            placeholder={col.placeholder || ""}
                            value={formState[col.key] == null ? "" : String(formState[col.key])}
                            onChange={handleChange}
                        />
                    </div>
                ))}

                <button 
                    type="submit"
                    className="table-entry-submit-btn"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}