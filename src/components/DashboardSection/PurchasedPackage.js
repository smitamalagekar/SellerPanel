// // import React from "react";

// // export default function PurchasedPackage() {
// //     return (
// //       <div className="bg-white p-4 rounded-lg shadow"  style={{ height: "300px" }}>
// //         <h3 className="font-semibold">Purchased Package</h3>
// //         <p className="mt-2 text-sm text-gray-700">
// //           <strong>Current Package:</strong> Platinum<br />
// //           Product Upload Limit: 5000 times<br />
// //           Preorder Product Upload Limit: 100 times<br />
// //           Package Expires at: 2030-03-01
// //         </p>
// //         <button className="mt-4 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-md text-sm">
// //           Upgrade Package
// //         </button>
// //       </div>
// //     );
// //   }
  

// // import React from "react";
// // import { FaAward } from "react-icons/fa"; // for award icon

// // export default function PurchasedPackage() {
// //   return (
// //     <div className="bg-white p-4 rounded-lg shadow mr-6"  style={{ height: "300px" }}>
// //       {/* Header with icon */}
// //       <h3 className="font-semibold text-lg text-gray-900">Purchased Package</h3>
// //       <div className="flex items-center gap-2 mb-2 flex">
// //         <FaAward className="text-yellow-400 text-xl bg-blue-100 rounded-full p-1" />
// //         <p className="text-sm text-gray-700 mt-7">
// //         <strong className="text-gray-900">Current Package:</strong> Platinum <br />
// //         Product Upload Limit: 5000 times <br />
// //         Preorder Product Upload Limit: 100 times <br />
// //         Package Expires at: 2030-03-01
// //       </p>
// //         {/* <h3 className="font-semibold text-lg text-gray-900">Purchased Package</h3> */}
// //       </div>

// //       {/* Package info */}
// //       {/* <p className="text-sm text-gray-700">
// //         <strong className="text-gray-900">Current Package:</strong> Platinum <br />
// //         Product Upload Limit: 5000 times <br />
// //         Preorder Product Upload Limit: 100 times <br />
// //         Package Expires at: 2030-03-01
// //       </p> */}

// //       {/* Button */}
// //       <button className="mt-6 w-full bg-indigo-100 text-indigo-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-200">
// //         Upgrade Package
// //       </button>
// //     </div>
// //   );
// // }


// import React from "react";
// import { FaAward } from "react-icons/fa";

// export default function PurchasedPackage() {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow mr-6 border" style={{ height: "300px" }}>
      
//       {/* Heading at the top */}
//       <h3 className="font-semibold text-lg text-gray-900 mb-3">Purchased Package</h3>
      
//       {/* Icon + Package Info */}
//       <div className="flex items-start gap-2 mb-4">
//       <FaAward className="text-yellow-400 text-4xl bg-blue-100 rounded-full p-2" />

//         <div className="text-sm text-gray-700 leading-relaxed">
//           <p className="mb-1 ml-4">
//             <span className="font-semibold text-gray-900">Current Package:</span><br />
//             <span className="text-base font-medium text-gray-900">Platinum</span>
//           </p>
//           <p className="ml-4">Product Upload Limit: 5000 times</p>
//           <p className="ml-4">Preorder Product Upload Limit: 100 times</p>
//           <p className="ml-4">Package Expires at: 2030-03-01</p>
//         </div>
//       </div>

//       {/* Button */}
//       <button className="mt-4 w-full bg-indigo-100 text-indigo-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-200">
//         Upgrade Package
//       </button>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import { FaAward } from "react-icons/fa";

export default function PurchasedPackage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow mr-6 border" style={{ height: "300px" }}>
      {loading ? (
        <div className="space-y-4 animate-pulse">
          <div className="w-40 h-5 bg-gray-300 rounded"></div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="space-y-2 w-full">
              <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
              <div className="w-full h-4 bg-gray-300 rounded"></div>
              <div className="w-5/6 h-4 bg-gray-300 rounded"></div>
              <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
          <div className="w-full h-10 bg-gray-300 rounded"></div>
        </div>
      ) : (
        <>
          <h3 className="font-[600] text-[#2E294E] mb-4 text-base ">Purchased Package</h3>

          <div className="flex items-start gap-2 mb-4">
            <FaAward className="text-yellow-400 text-4xl bg-blue-100 rounded-full p-2" />
            <div className="text-sm text-gray-700 leading-relaxed">
              <p className="mb-1 ml-4">
                <span className="font-semibold text-gray-900">Current Package:</span><br />
                <span className="text-base font-medium text-gray-900">Platinum</span>
              </p>
              <p className=" font-[400] text[13px]  text-[#2E294E] ml-4">Product Upload Limit: 5000 times</p>
              <p className="font-[400] text[13px]  text-[#2E294E] ml-4">Preorder Product Upload Limit: 100 times</p>
              <p className="font-[400] text[13px]  text-[#2E294E] ml-4">Package Expires at: 2030-03-01</p>
            </div>
          </div>

          <button className=" w-full bg-indigo-100 text-indigo-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-200">
            Upgrade Package
          </button>
        </>
      )}
    </div>
  );
}
