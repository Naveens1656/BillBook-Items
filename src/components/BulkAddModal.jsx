import React, { useState } from "react";

const defaultRows = [
  { name: "", description: "", category: "", unit: "", altUnit: "", conversion: "", itemCode: "", hsn: "", gst: "" },
];

export default function BulkAddModal({ onClose, onAddBulkItems }) {
  const [rows, setRows] = useState(defaultRows);

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const addNewRow = () => {
    setRows([...rows, { name: "", description: "", category: "", unit: "", altUnit: "", conversion: "", itemCode: "", hsn: "", gst: "" }]);
  };

  const handleSubmit = () => {
    const validItems = rows.filter((row) => row.name.trim());
    onAddBulkItems(validItems);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 w-full max-w-6xl rounded-lg overflow-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Bulk Add Items</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                {["Item Name*", "Description", "Category", "Unit", "Alternate Unit", "Conversion Rate", "Item Code", "HSN", "GST %"].map((h, idx) => (
                  <th key={idx} className="p-2 border">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx}>
                  {["name", "description", "category", "unit", "altUnit", "conversion", "itemCode", "hsn", "gst"].map((field) => (
                    <td key={field} className="border p-1">
                      <input
                        value={row[field]}
                        onChange={(e) => handleInputChange(idx, field, e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={addNewRow} className="bg-gray-200 px-3 py-1 rounded">+ Add Row</button>
          <div className="flex gap-2">
            <button onClick={onClose} className="border px-4 py-2 rounded">Cancel</button>
            <button onClick={handleSubmit} className="bg-indigo-600 text-white px-4 py-2 rounded">Add Items</button>
          </div>
        </div>
      </div>
    </div>
  );
}
