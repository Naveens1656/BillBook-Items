import React, { useState } from 'react';
import ItemTable from './components/ItemTable';
import CreateItemModal from './components/CreateItemModal';
import ItemDetailsModal from './components/ItemDetailsModal';
import BulkAddModal from './components/BulkAddModal';



function App() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState(["Snacks", "Stationery"]);
  const [showCreate, setShowCreate] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showLowStock, setShowLowStock] = useState(false);

  const handleAddItem = (item) => setItems([...items, item]);
  const handleAddBulkItems = (bulkItems) => setItems([...items, ...bulkItems]);
  const handleAddCategory = (cat) => {
    if (!categories.includes(cat)) setCategories([...categories, cat]);
  };

  const totalStockValue = items.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.stock || 0),
    0
  );
  const lowStockCount = items.filter(
    (item) => Number(item.stock) <= Number(item.lowStockQty || 5)
  ).length;

  const filteredItems = items.filter((item) => {
    const matchName = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === "" || item.category === selectedCategory;
    const matchStock = !showLowStock || parseInt(item.stock) <= parseInt(item.lowStockQty || 0);
    return matchName && matchCat && matchStock;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory Dashboard</h1>
        <div className="space-x-2">
          <button
            onClick={() => setShowCreate(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            + Create Item
          </button>
          <button
            onClick={() => setShowBulk(true)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Bulk Add Items
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-md border">
          <h3 className="text-sm text-gray-500">Total Stock Value</h3>
          <p className="text-xl font-semibold text-indigo-700">
            ₹ {totalStockValue.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md border">
          <h3 className="text-sm text-gray-500">Items Low In Stock</h3>
          <p className="text-xl font-semibold text-red-500">{lowStockCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search items"
          className="border px-3 py-2 rounded w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showLowStock}
            onChange={() => setShowLowStock(!showLowStock)}
          />
          <span>Show Low Stock</span>
        </label>
      </div>

      {/* Item Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Stock</th>
              <th className="p-2 text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, idx) => (
              <tr
                key={idx}
                onClick={() => setSelectedItem(item)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.category}</td>
                <td className="p-2">{item.stock}</td>
                <td className="p-2">₹ {item.price}</td>
              </tr>
            ))}
            {filteredItems.length === 0 && (
              <tr>
                <td className="p-4 text-center text-gray-400" colSpan={4}>
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {showCreate && (
        <CreateItemModal
          onClose={() => setShowCreate(false)}
          onAddItem={handleAddItem}
          categories={categories}
          onAddCategory={handleAddCategory}
        />
      )}
      {showBulk && (
        <BulkAddModal
          onClose={() => setShowBulk(false)}
          onAddBulkItems={handleAddBulkItems}
        />
      )}
      {selectedItem && (
        <ItemDetailsModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

export default App;
