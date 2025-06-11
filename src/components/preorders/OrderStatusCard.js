import React from 'react'



function OrderStatusCard({ label, count, active, onClick }) {
  return (
    <button
      className={`px-4 py-2 rounded-full text-sm ${
        active ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
      }`}
      onClick={onClick}
    >
      {label} ({count})
    </button>
  );
}

export default OrderStatusCard