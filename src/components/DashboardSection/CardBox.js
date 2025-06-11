


// import { Users } from 'lucide-react';
// import React from 'react';

// function CardBox({ title, value, icon, footer }) {
//   return (
    
//     <div className="bg-[#2e265e] text-white p-6 rounded-xl w-[350px] h-[170px] ml-6 mt-6">
//       <div className="flex flex-col justify-between h-full">
//         <div className="flex justify-between items-center">
//           <div>
//             <h3 className="text-lg font-semibold text-white mb-1 mt-3">{title}</h3>
//             <p className="text-3xl font-bold">{value}</p>
//           </div>
//           <div className="w-12 h-12">{icon}</div>
//         </div>
//         {footer && (
//           <div className="flex justify-between text-xs pt-2">
//             {footer.split('|').map((item, index) => (
//               <div key={index} className="flex items-center gap-1">
//                 <span><Users /></span>
//                 <span>{item.trim()}</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// export default CardBox


// import { Users } from 'lucide-react';
// import React, { useState, useEffect } from 'react';

// function CardBox({ title, value, icon, footer }) {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1000); // simulate loading
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div className="bg-[#2e265e] text-white p-6 rounded-xl w-[350px] h-[170px] ml-6 mt-6 animate-pulse">
//         <div className="flex flex-col justify-between h-full">
//           <div className="flex justify-between items-center">
//             <div>
//               <div className="h-4 bg-gray-400 rounded w-24 mb-2 mt-3"></div>
//               <div className="h-6 bg-gray-300 rounded w-32"></div>
//             </div>
//             <div className="w-12 h-12 bg-gray-500 rounded-full"></div>
//           </div>
//           <div className="flex justify-between text-xs pt-2">
//             {[1, 2].map((_, index) => (
//               <div key={index} className="flex items-center gap-1">
//                 <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
//                 <div className="w-16 h-3 bg-gray-400 rounded"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#2e265e] text-white p-6 rounded-xl w-[350px] h-[170px] ml-6 mt-6">
//       <div className="flex flex-col justify-between h-full  ">
//         <div className="flex justify-between items-center">
//           <div>
//             <h3 className="text-sm font-[400] text-[#F2F3F8] mb-1 mt-3">{title}</h3>
//             <p className="text-[30px] font-[500]">{value}</p>
//           </div>
//           <div className="w-12 h-12">{icon}</div>
//         </div>
//         {footer && (
//           <div className="flex justify-between text-xs font-[400] pt-2">
//             {footer.split('|').map((item, index) => (
//               <div key={index} className="flex items-center gap-1">
//                 <span><Users /></span>
//                 <span>{item.trim()}</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CardBox;




import { Users } from 'lucide-react';
import React, { useState, useEffect } from 'react';

function CardBox({ title, value, icon, footer }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="bg-[#2e265e] text-white p-6 rounded-xl w-full h-[170px] animate-pulse">
        <div className="flex flex-col justify-between h-full">
          <div className="flex justify-between items-center">
            <div>
              <div className="h-4 bg-gray-400 rounded w-24 mb-2 mt-3"></div>
              <div className="h-6 bg-gray-300 rounded w-32"></div>
            </div>
            <div className="w-12 h-12 bg-gray-500 rounded-full"></div>
          </div>
          <div className="flex justify-between text-xs pt-2">
            {[1, 2].map((_, index) => (
              <div key={index} className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <div className="w-16 h-3 bg-gray-400 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#2e265e] text-white p-6 rounded-xl w-full h-[170px] ">
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-[400] text-[#F2F3F8] mb-1 mt-3">{title}</h3>
            <p className="text-[30px] font-[500]">{value}</p>
          </div>
          <div className="w-12 h-12">{icon}</div>
        </div>
        {footer && (
          <div className="flex justify-between text-xs font-[400] pt-2">
            {footer.split('|').map((item, index) => (
              <div key={index} className="flex items-center gap-1">
                <span><Users /></span>
                <span>{item.trim()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CardBox;
