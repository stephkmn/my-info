import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { MedicationRow } from "../types/MedicationRow"

export function MedicationsTable({
    rows,
    deleteRow,
    editRow
}: {
    rows: MedicationRow[];
    deleteRow: (targetIdx: number) => void;
    editRow: (targetIdx: number) => void;
}) {
    return (
        <div className="table-wrapper">
            <table className="medications-table">
                <thead>
                    <tr>
                        <th>Medication Name</th>
                        <th>Dosage</th>
                        <th>Frequency</th>
                        <th>Other Details</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, idx) => (
                        <tr key={idx}>
                            <td>{row.medication}</td>
                            <td>{row.dosage}</td>
                            <td>{row.frequency}</td>
                            <td>{row.addDetails}</td>
                            <td className="actions">
                                <button className="edit-btn" onClick={() => editRow(idx)}>Edit</button>
                                <button className="del-btn" onClick={() => deleteRow(idx)}>Delete</button>
                            </td>
                        </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
