import React, { useState } from "react";

function AddCategoryModal({ onClose, onAddCategory }) {
  const [newCategory, setNewCategory] = useState("");

  const handleAdd = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setNewCategory("");
      onClose();
    } else {
      alert("Enter a category name.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter new category"
          className="border p-2 w-full rounded"
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CreateItemModal({
  onClose,
  onAddItem,
  categories,
  onAddCategory,
}) {
  const [form, setForm] = useState({
    type: "Product",
    name: "",
    category: "",
    price: "",
    gst: "None",
    unit: "PCS",
    stock: "",
    showInStore: false,
  });

  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.category.trim()) {
      alert("Please fill required fields.");
      return;
    }

    onAddItem({ ...form, id: Date.now() });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl rounded p-6 shadow-lg relative">
        <h2 className="text-xl font-semibold mb-6">Create New Item</h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          {/* Item Type and Name */}
          <div>
            <label className="block mb-1 font-medium">Item Type *</label>
            <div className="flex items-center gap-4 mb-3">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  value="Product"
                  checked={form.type === "Product"}
                  name="type"
                  onChange={handleChange}
                />
                Product
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  value="Service"
                  checked={form.type === "Service"}
                  name="type"
                  onChange={handleChange}
                />
                Service
              </label>
            </div>

            <label className="block mb-1">Item Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Maggie 20gm"
              className="border px-2 py-1 rounded w-full"
            />
          </div>

          {/* Category and Show in Store */}
          <div>
            <label className="block mb-1">Category *</label>
            <div className="flex gap-2">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              >
                <option value="">Select</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button
                className="text-indigo-600 text-sm"
                onClick={() => setShowCategoryModal(true)}
              >
                + Add
              </button>
            </div>

            <label className="block mt-4">
              <input
                type="checkbox"
                name="showInStore"
                checked={form.showInStore}
                onChange={handleChange}
                className="mr-2"
              />
              Show in Store
            </label>
          </div>

          {/* Sales Price */}
          <div>
            <label className="block mb-1">Sales Price</label>
            <input
              name="price"
              type="number"
              placeholder="₹ e.g. 200"
              value={form.price}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full"
            />
          </div>

          {/* GST Tax Rate */}
          <div>
            <label className="block mb-1">GST Tax Rate (%)</label>
            <select
              name="gst"
              value={form.gst}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full"
            >
              <option value="None">None</option>
              <option value="5%">5%</option>
              <option value="12%">12%</option>
              <option value="18%">18%</option>
            </select>
          </div>

          {/* Measuring Unit */}
          <div>
            <label className="block mb-1">Measuring Unit</label>
            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full"
            >
              <option>PCS</option>
              <option>KG</option>
              <option>Liter</option>
            </select>
          </div>

          {/* Stock */}
          <div>
            <label className="block mb-1">Opening Stock</label>
            <input
              name="stock"
              type="number"
              placeholder="e.g. 150"
              value={form.stock}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>

        {/* Category Modal */}
        {showCategoryModal && (
          <AddCategoryModal
            onClose={() => setShowCategoryModal(false)}
            onAddCategory={onAddCategory}
          />
        )}
      </div>
    </div>
  );
} 