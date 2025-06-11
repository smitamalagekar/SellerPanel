// import React from "react";

// export default function SoldAmount() {
//     return (
//       <div className="bg-[#f4f4fb] p-4 rounded-lg shadow" style={{ height: "224px" }}>
//         <h3 className="font-semibold mt-1">Sold Amount</h3>
//         <p className="text-md text-gray-500 mt-1">Your sold amount (current month)</p>
//         <p className="text-3xl font-bold mt-2">$0.000</p>
//         <p className="text-md text-gray-400 mt-3">Last Month: $0.000</p>
//       </div>
//     );
//   }

import React, { useState, useEffect } from "react";

export default function SoldAmount() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Skeleton for 1 second
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#f4f4fb] p-4 rounded-lg shadow" style={{ height: "224px" }}>
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
          <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
          <div className="w-1/4 h-8 bg-gray-300 rounded"></div>
          <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
        </div>
      ) : (
        <>
          <h3 className="font-[600] text-[#2E294E] mb-4 text-base mt-1">Sold Amount</h3>
          <p className="text-[12px] text-[#1B1B28] mt-1">Your sold amount (current month)</p>
          <p className="text-[30px] font-[600] mt-2">$0.000</p>
          <p className="text-[12px] text-[#1B1B28] mt-3">Last Month: $0.000</p>
        </>
      )}
    </div>
  );
}
