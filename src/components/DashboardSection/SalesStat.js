// import React from "react";

// export default function SalesStat() {
//   return (
//     <div className="bg-[#f4f4fb] border border-[#e0e0e0] ml-6 col-span-1 p-4 rounded-xl " style={{ height: "300px" }}>
//       <h3 className="font-semibold  text-[#25213B] mb-4 text-lg">Sales Stat</h3>
//       <div className="flex items-center space-x-2 mb-4">
//         <div className="w-10 h-3 bg-[#1C143F] rounded-sm" />
//         <span className="text-sm text-[#7D7D9C]">Sales ($)</span>
//       </div>
//       <div className="relative h-28 pl-6">
//         {/* Y-axis labels */}
//         {["1.0", "0.8", "0.6", "0.4", "0.2", "0"].map((label, index) => (
//           <div key={index} className="flex items-center h-[16.66%] text-xs text-gray-400">
//             <span className="w-6 -ml-6 text-right">{label}</span>
//             <div className="w-full h-px bg-gray-200 ml-2" />
//           </div>
//         ))}

//         {/* Dummy dark bar */}
//         <div className="absolute left-[60px] top-[6%] h-4 w-24 bg-[#1C143F] rounded-sm" />
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";

export default function SalesStat() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#f4f4fb] border border-[#e0e0e0] ml-6 col-span-1 p-4 rounded-xl " style={{ height: "300px" }}>
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-3 bg-gray-300 rounded-sm" />
            <div className="w-24 h-3 bg-gray-300 rounded-sm" />
          </div>
          <div className="relative h-28 pl-6 space-y-2">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-6 h-4 bg-gray-300 rounded" />
                <div className="w-full h-px bg-gray-300" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <h3 className="font-[600] text-[#2E294E] mb-4 text-base ">Sales Stat</h3>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-10 h-3 bg-[#1C143F] rounded-sm" />
            <span className="text-sm text-[#7D7D9C]">Sales ($)</span>
          </div>
          <div className="relative h-28 pl-6">
            {/* Y-axis labels */}
            {["1.0", "0.8", "0.6", "0.4", "0.2", "0"].map((label, index) => (
              <div key={index} className="flex items-center h-[16.66%] text-xs text-gray-400">
                <span className="w-6 -ml-6 text-right">{label}</span>
                <div className="w-full h-px bg-gray-200 ml-2" />
              </div>
            ))}

            {/* Dummy dark bar */}
            <div className="absolute left-[60px] top-[6%] h-4 w-24 bg-[#1C143F] rounded-sm" />
          </div>
        </>
      )}
    </div>
  );
}
