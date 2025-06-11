// import React from "react";
// import { FaCreditCard } from "react-icons/fa";

// const PaymentSettings = () => {
//   return (
//     <div className="flex flex-col items-center justify-center h-full rounded-md bg-gray-100 p-6">
//       <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">Payment Settings</h2>
//       <FaCreditCard className="text-5xl text-indigo-900 mb-4" />
//       <button className="bg-[#2e265e] text-white px-6 py-2 rounded">Configure Now</button>
//     </div>
//   );
// };

// export default PaymentSettings;




import React, { useState, useEffect } from "react";
import { FaCreditCard } from "react-icons/fa";

const PaymentSettings = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full rounded-md bg-gray-100 p-6">
      {loading ? (
        <>
          <div className="w-40 h-6 bg-gray-300 rounded mb-4 animate-pulse"></div>
          <div className="w-16 h-16 bg-gray-300 rounded-full mb-4 animate-pulse"></div>
          <div className="w-32 h-10 bg-gray-300 rounded animate-pulse"></div>
        </>
      ) : (
        <>
          <h2 className="text-base font-[600] text-center text-[#2E294E] mb-4">Payment Settings</h2>
          <FaCreditCard className="text-5xl text-indigo-900 mb-4" />
          <button className="bg-[#2e265e] text-base text-[#FFFFFF] px-6 py-2 rounded">Configure Now</button>
        </>
      )}
    </div>
  );
};

export default PaymentSettings;
