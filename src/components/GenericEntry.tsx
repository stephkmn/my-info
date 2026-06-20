import { useState, SubmitEvent, ChangeEvent } from "react";
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
                {columns.map((col, idx) => (
                    <div key={idx} className="input-group">
                        <label htmlFor={String(col)}>{col.label}</label>
                        <input
                            type="text"
                            id={String(col.key)}
                            name={String(col.key)}
                            placeholder={col.placeholder || ""}
                            value={String(formState[col.key])}
                            onChange={handleChange}
                        />
                    </div>
                ))}

                <button type="submit" className="table-entry-submit-btn">
                    Submit
                </button>
            </form>
        </div>
    )
}