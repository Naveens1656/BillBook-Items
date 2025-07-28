export default function ItemSearchBar({ onCreateClick }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search Item"
          className="border px-4 py-2 rounded-md text-sm"
        />
        <select className="border px-3 py-2 rounded-md text-sm">
          <option>Select Categories</option>
        </select>
        <button className="border px-4 py-2 rounded-md text-sm flex items-center gap-1">
          📦 Show Low Stock
        </button>
      </div>
      <div className="flex gap-2">
        <button className="border px-4 py-2 rounded-md text-sm">Bulk Actions ⬇</button>
        <button
          onClick={onCreateClick}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold"
        >
          Create Item
        </button>
      </div>
    </div>
  );
}

