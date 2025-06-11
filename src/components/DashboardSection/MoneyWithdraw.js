// import React from "react";
// import { FaMoneyCheckAlt } from "react-icons/fa";

// const MoneyWithdraw = () => {
//   return (
//     <div className="flex flex-col items-center justify-center h-full rounded-md bg-gray-100 p-6">
//       <h2 className="text-lg font-semibold text-center text-gray-800  mb-8">Money Withdraw</h2>
//       <FaMoneyCheckAlt className="text-5xl text-indigo-900" />
//     </div>
//   );
// };

// export default MoneyWithdraw;



import React, { useState, useEffect } from "react";
import { FaMoneyCheckAlt } from "react-icons/fa";

const MoneyWithdraw = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // simulate loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full rounded-md bg-gray-100 p-6">
      {loading ? (
        <>
          <div className="w-40 h-6 bg-gray-300 rounded mb-8 animate-pulse"></div>
          <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse"></div>
        </>
      ) : (
        <>
          <h2 className="text-base font-[600] text-center text-[#2E294E]  mb-8">
            Money Withdraw
          </h2>
          <FaMoneyCheckAlt className="text-5xl text-indigo-900" />
        </>
      )}
    </div>
  );
};

export default MoneyWithdraw;
