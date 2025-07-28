import React from 'react';
import { PackageSearch, PackageX } from 'lucide-react';

export default function SummaryCards({ stockValue, lowStockCount }) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="border rounded-xl p-4 shadow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Stock Value</span>
          <PackageSearch size={18} />
        </div>
        <div className="text-xl font-semibold">₹ {stockValue}</div>
      </div>
      <div className="border rounded-xl p-4 shadow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Low Stock</span>
          <PackageX size={18} />
        </div>
        <div className="text-xl font-semibold">{lowStockCount}</div>
      </div>
    </div>
  );
}
