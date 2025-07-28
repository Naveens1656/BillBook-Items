import React, { useState } from "react";

export default function AddCategoryModal({ onClose, onAdd }) {
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd(name.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white w-80 p-4 rounded shadow-xl space-y-4">
        <h3 className="text-lg font-bold">Add Category</h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Snacks"
          className="w-full border p-2 rounded"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-sm px-3 py-1 rounded bg-gray-200">Cancel</button>
          <button onClick={handleAdd} className="text-sm px-3 py-1 rounded bg-indigo-600 text-white">Add</button>
        </div>
      </div>
    </div>
  );
}
