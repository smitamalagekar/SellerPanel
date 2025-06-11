// import React from "react";

// export default function CategoryCount() {
//   const categories = [
//     { name: "Men Clothing & Fashion", count: 9 },
//     { name: "Computer & Accessories", count: 33 },
//     { name: "Sports & outdoor", count: 2 },
//     { name: "Software", count: 3 },
//   ];

//   return (
//     // <div className="bg-white p-6 rounded-lg shadow-md">
//     <div className="bg-white p-6 rounded-lg shadow-md" style={{ height: "540px" }}> {/* Add height here */}
//       <h3 className="font-semibold text-lg text-gray-800 mb-6 tracking-wide  border-b">
//         Category wise product count
//       </h3>
//       <ul className="text-sm text-gray-700">
//         {categories.map((cat, idx) => (
//           <li
//             key={idx}
//             className="flex justify-between items-center py-2  border-gray-200 last:border-b-0"
//           >
//             <span className="font-medium text-gray-800">{cat.name}</span>
//             <span className="text-gray-900">{cat.count}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";

export default function CategoryCount() {
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: "Men Clothing & Fashion", count: 9 },
    { name: "Computer & Accessories", count: 33 },
    { name: "Sports & outdoor", count: 2 },
    { name: "Software", count: 3 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // simulate loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md" style={{ height: "540px" }}>
      <h3 className="font-[600] text-[#2E294E] text-base text-gray-800 mb-6 tracking-wide border-b">
        Category wise product count
      </h3>

      {loading ? (
        <ul className="space-y-4">
          {[1, 2, 3, 4].map((_, index) => (
            <li key={index} className="flex justify-between items-center py-2 animate-pulse">
              <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
              <div className="w-8 h-4 bg-gray-300 rounded"></div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="text-[13px] text-[#2E294E] ">
          {categories.map((cat, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center py-2 border-gray-200 last:border-b-0"
            >
              <span className="font-medium text-gray-800">{cat.name}</span>
              <span className="text-gray-900">{cat.count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
