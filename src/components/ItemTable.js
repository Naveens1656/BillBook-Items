import React from 'react';

export default function ItemTable({ items, onRowClick }) {
  return (
    <table className="w-full border text-sm shadow-md rounded-xl overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">Item Name</th>
          <th className="border p-2">Item Code</th>
          <th className="border p-2">Category</th>
          <th className="border p-2">Unit</th>
          <th className="border p-2">Stock QTY</th>
          <th className="border p-2">Selling Price</th>
          <th className="border p-2">Purchase Price</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, idx) => (
          <tr
            key={idx}
            className="border-t hover:bg-gray-50 cursor-pointer"
            onClick={() => onRowClick && onRowClick(item)}
          >
            <td className="p-2">{item.name}</td>
            <td className="p-2">{item.code || '-'}</td>
            <td className="p-2">{item.category || '-'}</td>
            <td className="p-2">{item.unit || '-'}</td>
            <td className="p-2">{item.stockQty} PCS</td>
            <td className="p-2">₹ {item.sellingPrice}</td>
            <td className="p-2">₹ {item.purchasePrice || 0}</td>
          </tr>
        ))}
        {items.length === 0 && (
          <tr>
            <td colSpan={7} className="text-center text-gray-400 py-4">
              No items found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
