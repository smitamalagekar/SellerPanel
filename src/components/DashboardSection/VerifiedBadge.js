


// import React from "react";
// import verified from "../verified.png";

// export default function VerifiedBadge() {
//   return (
//     <div
//       className="bg-[#f4f4fb] p-2 rounded-lg shadow mr-7 flex items-center justify-center"
//       style={{ height: "224px" }}
//     >
//       <img
//         src={verified}
//         alt="Verified Badge"
//         className="w-60 h-auto object-contain"
//       />
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import verified from "../verified.png";

export default function VerifiedBadge() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Skeleton for 1 second
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="bg-[#f4f4fb] p-2 rounded-lg shadow mr-7 flex items-center justify-center"
      style={{ height: "224px" }}
    >
      {loading ? (
        <div className="animate-pulse w-60 h-16 bg-gray-300 rounded-lg"></div>
      ) : (
        <img
          src={verified}
          alt="Verified Badge"
          className="w-60 h-auto object-contain"
        />
      )}
    </div>
  );
}
