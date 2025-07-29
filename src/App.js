import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import CreateItemModal from "./components/CreateItemModal";
import BulkAddModal from "./components/BulkAddModal";

export default function App() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState(["hi", "maagi"]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const totalStockValue = items.reduce(
    (sum, i) => sum + Number(i.sellingPrice || 0) * Number(i.stockQty || 0),
    0
  );
  const lowStockCount = items.filter((i) => Number(i.stockQty) <= 5).length;

  // ✅ Filter items by selected category
  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Items</h1>
        <div className="flex items-center gap-2">
          <button className="border px-4 py-2 rounded text-blue-600 border-blue-400 hover:bg-blue-50">
            Reports
          </button>
          <button className="border p-2 rounded">⚙</button>
          <button className="border p-2 rounded">⌨️</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 border rounded-lg p-4">
          <p className="text-sm text-gray-500">📈 Stock Value</p>
          <p className="text-xl font-semibold mt-2">₹ {totalStockValue.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 border rounded-lg p-4">
          <p className="text-sm text-gray-500">📦 Low Stock</p>
          <p className="text-xl font-semibold mt-2">{lowStockCount}</p>
        </div>
        <div className="hidden lg:block"></div>
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded"
          >
            Create Item
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="flex items-center border rounded px-3 py-2 w-full sm:w-60">
          <FiSearch className="text-gray-500 mr-2" />
          <input type="text" placeholder="Search Item" className="outline-none w-full" />
        </div>

        {/* Category Dropdown with filter support */}
        <div className="relative w-full sm:w-60">
          <div
            className="border border-violet-300 px-3 py-2 rounded-md cursor-pointer flex justify-between items-center bg-white hover:border-violet-500 transition"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="text-gray-700">{selectedCategory || "Search Categories"}</span>
            <svg className="w-4 h-4 text-violet-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </div>

          {dropdownOpen && (
            <div className="absolute top-full mt-1 z-10 w-full bg-white border border-violet-300 rounded-md shadow-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search..."
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                className="px-3 py-2 w-full border-b border-violet-200 text-sm focus:outline-none"
              />
              <div className="max-h-40 overflow-y-auto">
                {categories
                  .filter((cat) => cat.toLowerCase().includes(categorySearch.toLowerCase()))
                  .map((cat, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center px-3 py-2 text-sm hover:bg-violet-50 cursor-pointer transition"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setDropdownOpen(false);
                      }}
                    >
                      <span>{cat}</span>
                      <button className="text-gray-400 hover:text-violet-600"></button>
                    </div>
                  ))}
              </div>
              <div
                className="px-3 py-2 text-violet-600 hover:bg-violet-50 text-sm cursor-pointer border-t border-dashed border-violet-200"
                onClick={() => {
                  const newCat = prompt("Enter new category:");
                  if (newCat && !categories.includes(newCat)) {
                    setCategories([...categories, newCat]);
                    setSelectedCategory(newCat);
                    setDropdownOpen(false);
                  }
                }}
              >
                + Add Category
              </div>
            </div>
          )}
        </div>

        <button className="border px-3 py-2 rounded">Show Low Stock</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mb-8">
        <table className="table-auto w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Item Name</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Stock Qty</th>
              <th className="px-4 py-2 border">Selling Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, idx) => (
                <tr key={idx} className="text-center">
                  <td className="px-4 py-2 border">{item.itemName}</td>
                  <td className="px-4 py-2 border">{item.category}</td>
                  <td className="px-4 py-2 border">{item.stockQty}</td>
                  <td className="px-4 py-2 border">₹ {item.sellingPrice}</td>
                </tr>
              ))
            ) : (
              <tr className="text-center text-gray-400">
                <td colSpan="4" className="py-4">
                  No items found for this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="text-center mt-10">
          <div className="mx-auto w-48 h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
            📦
          </div>
          <h3 className="text-lg font-semibold mb-1">Add all your Items at once!</h3>
          <p className="text-sm text-gray-500 mb-4">For quicker and easier experience of creating sales invoices</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowBulkModal(true)}
              className="bg-violet-100 text-violet-700 px-4 py-2 rounded hover:bg-violet-200"
            >
              Add Items with Excel
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {showCreateModal && (
        <CreateItemModal
          onClose={() => setShowCreateModal(false)}
          onAddItem={(item) =>
            setItems([
              ...items,
              {
                itemName: item.name,
                category: item.category,
                stockQty: item.stock,
                sellingPrice: item.price,
              },
            ])
          }
          categories={categories}
          onAddCategory={(cat) => setCategories([...categories, cat])}
        />
      )}
      {showBulkModal && (
        <BulkAddModal
          onClose={() => setShowBulkModal(false)}
          onAddBulkItems={(bulk) => setItems([...items, ...bulk])}
        />
      )}
    </div>
  );
}
