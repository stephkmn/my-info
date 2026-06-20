import { GenericTable } from "../../components/GenericTable";
import { GenericEntry } from "../../components/GenericEntry";
import { ColumnDef } from "../../types/TableConfig";
import { useTableState } from "../../hooks/useTableState";

export type CConditionRow = {
    condition: string;
    addDetails: string;
};

const CHRONIC_CONDITIONS_COLUMNS: ColumnDef<CConditionRow>[] = [
        { key: "condition", label: "Condition", placeholder: "e.g. Heart Disease, Diabetes"},
        { key: "addDetails", label: "Additional Details", placeholder: ""}
    ];
const CHRONIC_CONDITIONS_EMPTY_STATE: CConditionRow = {condition: "", addDetails: ""}

export function CConditionsSection() {
    const { rows, entryOpen, rowToEdit,
            deleteRow, editRow, openAddEntry, closeEntry, submitEntry
    } = useTableState<CConditionRow>([]);

    return (
        <div className="section-wrapper">
            <h3>Chronic Conditions</h3>

            <GenericTable<CConditionRow>
                rows={rows}
                columns={CHRONIC_CONDITIONS_COLUMNS}
                deleteRow={deleteRow}
                editRow={editRow}
            />
            <button className="add-btn" onClick={openAddEntry}>Add</button>

            {entryOpen && (
                <GenericEntry<CConditionRow>
                    columns={CHRONIC_CONDITIONS_COLUMNS}
                    emptyState={CHRONIC_CONDITIONS_EMPTY_STATE}
                    closeEntry={closeEntry}
                    onSubmit={submitEntry}
                    initialRow={rowToEdit !== null ? rows[rowToEdit] : null}
                />
            )}
        </div>
    )
} 