import React, { useState } from "react";

export default function ItemToolbar({
  searchTerm,
  onSearch,
  selectedCategory,
  onSelectCategory,
  categories,
  showLowStockOnly,
  onToggleLowStock,
  onBulkAction,
  onCreateItem,
  onAddCategoryClick // <-- added
}) {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  return (
    <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Search */}
        <div className="flex items-center border rounded px-3 py-1 bg-white text-sm">
          <span className="text-gray-400 pr-2">🔍</span>
          <input
            type="text"
            placeholder="Search Item"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="outline-none w-full"
          />
        </div>

        {/* Custom Dropdown */}
        <div className="relative">
          <button
            className="border px-3 py-1 rounded text-sm bg-white"
            onClick={() => setShowCategoryMenu(!showCategoryMenu)}
          >
            {selectedCategory || "Select Categories"}
          </button>
          {showCategoryMenu && (
            <div className="absolute left-0 mt-1 z-10 bg-white border shadow-md rounded w-48 text-sm">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onSelectCategory(cat);
                    setShowCategoryMenu(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {cat}
                </div>
              ))}
              <div className="border-t" />
              <div
                onClick={() => {
                  setShowCategoryMenu(false);
                  onAddCategoryClick(); // 🔔 trigger modal
                }}
                className="px-4 py-2 text-indigo-600 hover:bg-gray-100 cursor-pointer"
              >
                ➕ Add Category
              </div>
            </div>
          )}
        </div>

        {/* Show Low Stock */}
        <button
          onClick={onToggleLowStock}
          className="border px-3 py-1 rounded text-sm bg-white"
        >
          📦 Show Low Stock
        </button>

        {/* Bulk Actions */}
        <select
          onChange={(e) => onBulkAction(e.target.value)}
          className="border px-3 py-1 rounded text-sm bg-white"
        >
          <option value="">Bulk Actions</option>
          <option value="delete">Delete Selected</option>
          <option value="export">Export</option>
        </select>
      </div>

      {/* New Item Button */}
      <div>
        <button
          onClick={onCreateItem}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded text-sm"
        >
          New Item
        </button>
      </div>
    </div>
  );
}
