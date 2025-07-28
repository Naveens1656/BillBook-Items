import React from "react";

export default function ItemStats({ stockValue, lowStock }) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="border p-4 rounded shadow bg-white">
        <p className="text-sm text-gray-500">📈 Stock Value</p>
        <h2 className="text-xl font-semibold">₹ {stockValue}</h2>
      </div>
      <div className="border p-4 rounded shadow bg-white">
        <p className="text-sm text-orange-500">📦 Low Stock</p>
        <h2 className="text-xl font-semibold text-orange-600">{lowStock}</h2>
      </div>
    </div>
  );
}

