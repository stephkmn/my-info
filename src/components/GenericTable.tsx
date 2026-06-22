import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { ColumnDef } from "../types/TableConfig";

interface GenericTableProps<T> {
    rows: T[];
    columns: ColumnDef<T>[];
    deleteRow: (targetIdx: number) => void;
    editRow: (targetIdx: number) => void;
}

export function GenericTable<T>({
    rows,
    columns,
    deleteRow,
    editRow
}: 
    GenericTableProps<T>
) {
    return (
        <div className="table-wrapper">
            <table className="generic-table">
                <thead>
                    <tr>
                        {columns.map((col,idx) => (
                            <th key={idx}>{col.label}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, idx) => (
                        <tr key={idx}>
                            {columns.map((col, colIdx) => (
                                <td key={(colIdx)}>{String(row[col.key])}</td>
                            ))}
                            <td className="actions">
                                <button type="button" className="edit-btn" onClick={() => editRow(idx)}>Edit</button>
                                <button type="button" className="del-btn" onClick={() => deleteRow(idx)}>Delete</button>
                            </td>
                        </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
