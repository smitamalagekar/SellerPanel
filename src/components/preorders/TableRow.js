import { Download, EyeIcon, Trash2Icon } from 'lucide-react';
import React from 'react';

function TableRow({ order, loading = false }) {
  if (loading) {
    return (
      <tr className="animate-pulse">
        <td className="px-6 py-4">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-300 rounded-md mr-3"></div>
            <div>
              <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
              <div className="w-16 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="w-20 h-4 bg-gray-300 rounded mb-2"></div>
          <div className="w-24 h-3 bg-gray-200 rounded"></div>
        </td>
        <td className="px-6 py-4">
          <div className="w-16 h-4 bg-gray-300 rounded mb-2"></div>
          <div className="w-20 h-3 bg-gray-200 rounded"></div>
        </td>
        <td className="px-6 py-4">
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
        </td>
        <td className="px-6 py-4">
          <div className="w-20 h-4 bg-gray-300 rounded mb-2"></div>
          <div className="w-24 h-3 bg-gray-200 rounded"></div>
        </td>
        <td className="px-6 py-4">
          <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
        </td>
        <td className="px-6 py-4">
          <div className="w-24 h-6 bg-gray-200 rounded-full"></div>
        </td>
        <td className="px-6 py-4">
          <div className="flex gap-2">
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr key={order.id} className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <input type="checkbox" className="rounded" />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <img
            src={order.product.image}
            alt={order.product.name}
            className="w-12 h-12 rounded-md mr-3"
          />
          <div>
            <div className="font-medium">{order.product.name}</div>
            <div className="text-sm text-gray-500">
              Qty: {order.product.quantity}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-blue-500">{order.id}</div>
        <div className="text-sm text-gray-500">Created {order.createdAt}</div>
      </td>
      <td className="px-6 py-4">
        <div>${order.price.toLocaleString()}</div>
        <div className="text-sm text-gray-500">
          ${order.prepayment.toLocaleString()}
        </div>
      </td>
      <td className="px-6 py-4">{order.seller}</td>
      <td className="px-6 py-4">
        <div>{order.customer.name}</div>
        <div className="text-sm text-gray-500">{order.customer.email}</div>
      </td>
      <td className="px-6 py-4">
        <span className="px-2 py-1 text-sm rounded-full bg-gray-100">
          {order.status}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 text-sm rounded-full ${
            order.refundable
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {order.refundable ? 'Refundable' : 'Non-Refundable'}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <button className="p-1 hover:bg-gray-100 rounded">
            <EyeIcon className="w-5 h-5" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <Download className="w-5 h-5" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <Trash2Icon className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TableRow;
