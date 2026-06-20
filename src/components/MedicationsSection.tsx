import { GenericTable } from "../components/GenericTable";
import { GenericEntry } from "../components/GenericEntry";
import { ColumnDef } from "../types/TableConfig";
import { useTableState } from "../hooks/useTableState";

export type MedicationRow = {
  medication: string;
  dosage: string;
  frequency: string;
  addDetails: string;
};

const MEDICATIONS_COLUMNS: ColumnDef<MedicationRow>[] = [
        { key: "medication", label: "Medication", placeholder: "Medication name"},
        { key: "dosage", label: "Dosage", placeholder: "e.g. 200 mg"},
        { key: "frequency", label: "Frequency", placeholder: "e.g. 2x a day"},
        { key: "addDetails", label: "Additional Details", placeholder: ""},
    ];
const MEDICATIONS_EMPTY_STATE: MedicationRow = {medication: "", dosage: "", frequency: "", addDetails: ""}

export function MedicationsSection() {
    const { rows, entryOpen, rowToEdit,
            deleteRow, editRow, openAddEntry, closeEntry, submitEntry
    } = useTableState<MedicationRow>([]);

    return (
        <div className="section-wrapper">
            <h3>Current Medications</h3>

            <GenericTable<MedicationRow>
                rows={rows}
                columns={MEDICATIONS_COLUMNS}
                deleteRow={deleteRow}
                editRow={editRow}
            />
            <button className="add-btn" onClick={openAddEntry}>Add</button>

            {entryOpen && (
                <GenericEntry<MedicationRow>
                    columns={MEDICATIONS_COLUMNS}
                    emptyState={MEDICATIONS_EMPTY_STATE}
                    closeEntry={closeEntry}
                    onSubmit={submitEntry}
                    initialRow={rowToEdit !== null ? rows[rowToEdit] : null}
                />
            )}
        </div>
    )
} 