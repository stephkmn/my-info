import { Dispatch, SetStateAction } from "react";

import { GenericTable } from "../../components/GenericTable";
import { GenericEntry } from "../../components/GenericEntry";
import { ColumnDef } from "../../types/TableConfig";
import { useTableState } from "../../hooks/useTableState";
import { RxRowSpacing } from "react-icons/rx";

export type AllergyRow = {
    allergen: string;
    reaction: string;
    severity: string;
}

const ALLERGIES_COLUMNS: ColumnDef<AllergyRow>[] = [
        { key: "allergen", label: "Allergen", placeholder: "e.g. Peanuts"},
        { key: "reaction", label: "Reaction", placeholder: "e.g. Hives, Swelling"},
        { key: "severity", label: "Severity", placeholder: "e.g. Mild, Severe"}
    ];
const ALLERGIES_EMPTY_STATE: AllergyRow = {allergen: "", reaction: "", severity: ""}

type AllergiesSectionProps = {
    rows: AllergyRow[];
    setRows: Dispatch<SetStateAction<AllergyRow[]>>;
};

export function AllergiesSection({rows, setRows}: AllergiesSectionProps) {
    const { entryOpen, rowToEdit,
            deleteRow, editRow, openAddEntry, closeEntry, submitEntry
    } = useTableState<AllergyRow>(rows, setRows);

    return (
        <div className="section-wrapper">
            <h3>Known Allergies</h3>

            <GenericTable<AllergyRow>
                rows={rows}
                columns={ALLERGIES_COLUMNS}
                deleteRow={deleteRow}
                editRow={editRow}
            />
            <button className="add-btn" onClick={openAddEntry}>Add</button>

            {entryOpen && (
                <GenericEntry<AllergyRow>
                    columns={ALLERGIES_COLUMNS}
                    emptyState={ALLERGIES_EMPTY_STATE}
                    closeEntry={closeEntry}
                    onSubmit={submitEntry}
                    initialRow={rowToEdit !== null ? rows[rowToEdit] : null}
                />
            )}
        </div>
    )
} 