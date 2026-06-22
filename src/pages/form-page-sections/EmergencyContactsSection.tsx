import { Dispatch, SetStateAction } from "react";

import { GenericTable } from "../../components/GenericTable";
import { GenericEntry } from "../../components/GenericEntry";
import { ColumnDef } from "../../types/TableConfig";
import { useTableState } from "../../hooks/useTableState";

export type ContactRow = {
    name: string;
    relationship: string;
    phone: string;
    email: string;
};

const CONTACT_COLUMNS: ColumnDef<ContactRow>[] = [
        { key: "name", label: "Name", placeholder: "Enter Contact Name"},
        { key: "relationship", label: "Relationship", placeholder: "e.g. Parent, Spouse"},
        { key: "phone", label: "Phone Number", placeholder: "e.g. 000-000-0000"},
        { key: "email", label: "Email", inputType: "email", placeholder: "e.g. name@gmail.com"}
    ];
const CONTACT_EMPTY_STATE : ContactRow = {name: "", relationship: "", phone: "", email: ""}

type EmergencyContactsSectionProp = {
    rows: ContactRow[];
    setRows: Dispatch<SetStateAction<ContactRow[]>>;
}

export function EmergencyContactsSection({rows, setRows}: EmergencyContactsSectionProp) {
    const { entryOpen, rowToEdit,
            deleteRow, editRow, openAddEntry, closeEntry, submitEntry
    } = useTableState<ContactRow>(rows, setRows);

    return (
        <div className="section-wrapper">
            <GenericTable<ContactRow>
                rows={rows}
                columns={CONTACT_COLUMNS}
                deleteRow={deleteRow}
                editRow={editRow}
            />
            <button type="button" className="add-btn" onClick={openAddEntry}>Add</button>

            {entryOpen && (
                <GenericEntry<ContactRow>
                    columns={CONTACT_COLUMNS}
                    emptyState={CONTACT_EMPTY_STATE   }
                    closeEntry={closeEntry}
                    onSubmit={submitEntry}
                    initialRow={rowToEdit !== null ? rows[rowToEdit] : null}
                />
            )}
        </div>
    )
} 