import { useState } from "react";

export function useTableState<T>(
    rows: T[],
    setRows: React.Dispatch<React.SetStateAction<T[]>>
) {
    const [entryOpen, setEntryOpen] = useState(false);
    const [rowToEdit, setRowToEdit] = useState<number | null>(null);

    function deleteRow(targetIdx: number) {
        setRows(rows.filter((_, idx) => idx !== targetIdx));
    }

    function editRow(targetIdx: number) {
        setRowToEdit(targetIdx);
        setEntryOpen(true);
    }

    function openAddEntry() {
        setRowToEdit(null);
        setEntryOpen(true);
    }

    function closeEntry() {
        setEntryOpen(false);
        setRowToEdit(null);
    }

    function submitEntry(submittedRow: T) {
        if(rowToEdit !== null) {
            const updatedRows = [...rows];
            updatedRows[rowToEdit] = submittedRow;
            setRows(updatedRows);
        } else {
            setRows([...rows, submittedRow]);
        }
        closeEntry();
    }

    return {
        rows,
        entryOpen,
        rowToEdit,
        deleteRow,
        editRow,
        openAddEntry,
        closeEntry,
        submitEntry
    }
}