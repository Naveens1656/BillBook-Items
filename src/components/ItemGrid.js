import React from "react";

export default function ItemGrid({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="bg-white p-4 rounded-xl shadow border border-gray-200 flex flex-col gap-2"
        >
          <div className="font-medium text-gray-800">{item.name}</div>
          <span className="text-xs text-gray-600 bg-gray-200 rounded px-2 py-1 w-max">
            {item.category}
          </span>
          <div className="text-sm">
            <strong>Stock:</strong> {item.stock} {item.unit}
          </div>
          <div className="text-sm">
            <strong>Price:</strong> ₹{item.price}
          </div>
        </div>
      ))}
    </div>
  );
}
