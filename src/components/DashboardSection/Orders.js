// import React from "react";
// import { ShoppingBag, Ban, Truck, CheckSquare } from "lucide-react"; // Optional: use Lucide icons for better visuals

// export default function Orders() {
//   const statuses = [
//     { label: "New Order", icon: <ShoppingBag className="w-6 h-6" />, count: 0 },
//     { label: "Cancelled", icon: <Ban className="w-6 h-6" />, count: 0 },
//     { label: "On Delivery", icon: <Truck className="w-6 h-6" />, count: 0 },
//     { label: "Delivered", icon: <CheckSquare className="w-6 h-6" />, count: 0 },
//   ];

//   return (
//     // <div className="bg-white rounded-xl shadow p-10 w-full">
//     <div className="bg-white rounded-xl shadow p-10 w-full" style={{ height: "540px" }}> {/* Add height here */}
//       <h3 className="text-lg font-semibold text-gray-800 ml-8 text-lg">Orders</h3>
//       <p className="text-sm text-green-600 mb-4 ml-8">This Month</p>
//       <ul className="space-y-5 ml-8">
//         {statuses.map((status, idx) => (
//           <li key={idx} className="flex items-center gap-4">
//             <div className="text-purple-900">{status.icon}</div>
//             <div className="mr-10">
//               <p className="text-sm font-semibold text-gray-700">{status.label}</p>
//               <p className="text-lg font-bold text-purple-400">0</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import { ShoppingBag, Ban, Truck, CheckSquare } from "lucide-react";

export default function Orders() {
  const [loading, setLoading] = useState(true);

  const statuses = [
    { label: "New Order", icon: <ShoppingBag className="w-6 h-6" />, count: 0 },
    { label: "Cancelled", icon: <Ban className="w-6 h-6" />, count: 0 },
    { label: "On Delivery", icon: <Truck className="w-6 h-6" />, count: 0 },
    { label: "Delivered", icon: <CheckSquare className="w-6 h-6" />, count: 0 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-10 w-full" style={{ height: "540px" }}>
      {loading ? (
        <>
          <div className="ml-8 w-32 h-6 bg-gray-300 rounded animate-pulse "></div>
          <div className="ml-8 w-24 h-4 bg-green-200 rounded animate-pulse mb-6"></div>
          <ul className="space-y-5 ml-8">
            {[1, 2, 3, 4].map((_, idx) => (
              <li key={idx} className="flex items-center gap-4">
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="mr-10">
                  <div className="w-32 h-4 bg-gray-300 rounded animate-pulse mb-1"></div>
                  <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h3 className="font-[600] text-[#2E294E] mb-2 text-base ml-8  ">Orders</h3>
          <p className="text-sm text-green-600 mb-4 ml-8">This Month</p>
          <ul className="space-y-5 ml-8">
            {statuses.map((status, idx) => (
              <li key={idx} className="flex items-center gap-4">
                <div className="text-purple-900 text-left text=[12px]">{status.icon}</div>
                <div className="mr-10">
                  <p className="text-sm font-semibold text[13px] font-[600]  text-left text-[text-[#2E294E]">{status.label}</p>
                  <p className="text-lg font-bold  text-left text-purple-400">0</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

