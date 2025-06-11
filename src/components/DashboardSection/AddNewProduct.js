// import React from "react";
// import { AiOutlinePlus } from "react-icons/ai";

// const AddNewProduct = () => {
//   return (
//     <div className="flex flex-col items-center justify-center bg-white h-full rounded-md border border-gray-200 p-6">
//       <h2 className="text-lg font-semibold text-center text-gray-800 mb-8">Add New product</h2>
//       <AiOutlinePlus className="text-5xl text-indigo-900" />
//     </div>
//   );
// };

// export default AddNewProduct;
import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const AddNewProduct = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Skeleton for 1 second
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-white h-full rounded-md border border-gray-200 p-6">
      <h1 className="text-base font-[600] text-center text-[#2E294E] mb-8">
        {loading ? (
          <div className="w-32 h-6 bg-gray-300 rounded-lg animate-pulse"></div>
        ) : (
          "Add New product"
        )}
      </h1>
      {loading ? (
        <div className="w-20 h-20 bg-gray-300 rounded-full animate-pulse"></div>
      ) : (
        <AiOutlinePlus className="text-5xl text-indigo-900" />
      )}
    </div>
  );
};

export default AddNewProduct;
