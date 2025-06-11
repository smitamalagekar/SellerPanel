// import React from "react";
// import { FaStore } from "react-icons/fa";

// const ShopSettings = () => {
//   return (
//     <div className="flex flex-col items-center justify-center h-full rounded-md bg-gray-100 p-6">
//       <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">Shop Settings</h2>
//       <FaStore className="text-5xl text-indigo-900 mb-4" />
//       <button className="bg-[#2e265e] text-white px-6 py-2 rounded">Go to setting</button>
//     </div>
//   );
// };

// export default ShopSettings;


import React, { useState, useEffect } from "react";
import { FaStore } from "react-icons/fa";

const ShopSettings = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Skeleton for 1 second
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full rounded-md bg-gray-100 p-6">
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          </div>
          <div className="w-32 h-8 bg-gray-300 rounded"></div>
        </div>
      ) : (
        <>
          <h2 className="text-base font-[600] text-center text-[#2E294E] mb-4">Shop Settings</h2>
          <FaStore className="text-5xl text-indigo-900 mb-4" />
          <button className="bg-[#2e265e] text-base text-[#FFFFFF] px-6 py-2 rounded">Go to setting</button>
        </>
      )}
    </div>
  );
};

export default ShopSettings;
