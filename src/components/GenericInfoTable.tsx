import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { ColumnDef } from "../types/TableConfig";

interface GenericInfoTableProps<T> {
    rows: T[];
    columns: ColumnDef<T>[];
}

export function GenericInfoTable<T>({
    rows,
    columns,
}: 
    GenericInfoTableProps<T>
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
                        </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
