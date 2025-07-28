import React from "react";

export default function ItemDetailsModal({ item, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg">
        <h2 className="text-xl font-bold mb-4">Item Details</h2>

        <div className="space-y-2 text-sm">
          <p><strong>Name:</strong> {item.name}</p>
          <p><strong>Code:</strong> {item.code || '-'}</p>
          <p><strong>Category:</strong> {item.category || '-'}</p>
          <p><strong>Stock Quantity:</strong> {item.stockQty || 0}</p>
          <p><strong>Low Stock Qty:</strong> {item.lowStockQty || '-'}</p>
          <p><strong>Unit:</strong> {item.unit || '-'}</p>
          <p><strong>Selling Price:</strong> ₹ {item.sellingPrice}</p>
          <p><strong>Purchase Price:</strong> ₹ {item.purchasePrice || 0}</p>
          <p><strong>GST:</strong> {item.gst || '-'}</p>
          <p><strong>Show in Store:</strong> {item.showInStore ? "Yes" : "No"}</p>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
