import { Dispatch, SetStateAction } from "react";

import { GenericTable } from "../../components/GenericTable";
import { GenericEntry } from "../../components/GenericEntry";
import { ColumnDef } from "../../types/TableConfig";
import { useTableState } from "../../hooks/useTableState";

export type VaccineRow = {
    vaccine: string;
    dateGiven: Date | null;
    nextDose: Date | null;
};

const VACCINES_COLUMNS: ColumnDef<VaccineRow>[] = [
        { key: "vaccine", label: "Vaccine", placeholder: "e.g. HepB, TIV"},
        { key: "dateGiven", label: "Date Given", inputType: "date"},
        { key: "nextDose", label: "Next Dose Date", inputType: "date"}
    ];
const VACCINES_EMPTY_STATE : VaccineRow = {vaccine: "", dateGiven: null, nextDose: null}

type VaccinesSectionProps = {
    rows: VaccineRow[];
    setRows: Dispatch<SetStateAction<VaccineRow[]>>;
}

export function VaccinesSection({rows, setRows}: VaccinesSectionProps) {
    const { entryOpen, rowToEdit,
            deleteRow, editRow, openAddEntry, closeEntry, submitEntry
    } = useTableState<VaccineRow>(rows, setRows);

    return (
        <div className="section-wrapper">
            <h3>Immunizations</h3>

            <GenericTable<VaccineRow>
                rows={rows}
                columns={VACCINES_COLUMNS}
                deleteRow={deleteRow}
                editRow={editRow}
            />
            <button type="button" className="add-btn" onClick={openAddEntry}>Add</button>

            {entryOpen && (
                <GenericEntry<VaccineRow>
                    columns={VACCINES_COLUMNS}
                    emptyState={VACCINES_EMPTY_STATE   }
                    closeEntry={closeEntry}
                    onSubmit={submitEntry}
                    initialRow={rowToEdit !== null ? rows[rowToEdit] : null}
                />
            )}
        </div>
    )
} 