import { ColumnDef } from "../types/TableConfig";

interface GenericInfoTableProps<T> {
    rows: T[];
    columns: ColumnDef<T>[];
    emptyMessage?: string;
}

export function GenericInfoTable<T>({
    rows,
    columns,
    emptyMessage = "None",
}: 
    GenericInfoTableProps<T>
) {
    function formatValue(value: T[keyof T]) {
        if (value === null || value === undefined || value === "") {
            return "None";
        }

        return String(value);
    }

    return (
        <div className="table-wrapper info-table-wrapper">
            <table className="generic-table info-table">
                <thead>
                    <tr>
                        {columns.map((col,idx) => (
                            <th key={idx}>{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length}>{emptyMessage}</td>
                        </tr>
                    ) : rows.map((row, idx) => (
                        <tr key={idx}>
                            {columns.map((col, colIdx) => (
                                <td key={(colIdx)}>{formatValue(row[col.key])}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
