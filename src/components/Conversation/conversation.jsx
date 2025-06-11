



// import React, { useEffect, useState } from "react";
// import { Plus, Minus } from "lucide-react";
// // import classNames from "classnames";
// import { useMediaQuery } from "react-responsive";



// const conversations = [
//   {
//     id: 1,
//     name: "Paul K. Jensen",
//     time: "09:29:01 05-01-2025",
//     title: "Sunburst Guitar, 30 Inch – Musical Instruments",
//     message: "welcome",
//     avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//   },
//   {
//     id: 2,
//     name: "Paul K. Jensen",
//     time: "09:15:01 05-01-2025",
//     title: "BMW 520d M Sport – Luxury Sedan",
//     message: "ok",
//     avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//   },
//   {
//     id: 3,
//     name: "Paul K. Jensen",
//     time: "10:33:07 25-07-2022",
//     title: "HP Stream 14 inches HD Display",
//     message: "Will audio play chromi, html, or line-in only?",
//     avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//   },
//   {
//     id: 4,
//     name: "Paul K. Jensen",
//     time: "10:34:07 25-07-2022",
//     title: "Jacket Blue Plain Washington",
//     message: "The monitor has the vesa mount... I'm very happy with it.",
//     avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//   },
//   {
//     id: 5,
//     name: "Paul K. Jensen",
//     time: "02:38:02 02-02-2025",
//     title: "Redragon S101 RGB Gaming Keyboard",
//     message: "hu",
//     avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//   },
// ];

// const Conversations = () => {
//   const [loading, setLoading] = useState(true);
//   const [expandedRows, setExpandedRows] = useState({});
//   const isMobile = useMediaQuery({ maxWidth: 768 });

//   const latestTime = conversations
//     .map((c) => new Date(c.time.split(" ").reverse().join(" ")))
//     .sort((a, b) => b - a)[0]
//     .getTime();

//   useEffect(() => {
//     const timeout = setTimeout(() => setLoading(false), 1200);
//     return () => clearTimeout(timeout);
//   }, []);

//   const toggleRow = (id) => {
//     setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-6">
//       <h2 className="text-2xl md:text-2xl mb-8">Conversations</h2>

//       {!isMobile ? (
//         <div className=" bg-white rounded-xl shadow-md">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-100 text-gray-600 text-left text-sm font-semibold">
//               <tr>
//                 <th className="px-6 py-4">User</th>
//                 <th className="px-6 py-4">Title</th>
//                 <th className="px-6 py-4">Time</th>
//                 <th className="px-6 py-4">Message</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100 text-sm">
//               {loading
//                 ? Array.from({ length: 5 }).map((_, i) => (
//                     <tr key={i} className="animate-pulse">
//                       <td className="px-6 py-4 flex items-center gap-3">
//                         <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
//                         <div className="h-4 bg-gray-300 rounded w-24"></div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="h-4 bg-gray-300 rounded w-48"></div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="h-4 bg-gray-300 rounded w-32"></div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="h-4 bg-gray-300 rounded w-24"></div>
//                       </td>
//                     </tr>
//                   ))
//                 : conversations.map((item) => {
//                     const isLatest =
//                       new Date(item.time.split(" ").reverse().join(" ")).getTime() ===
//                       latestTime;

//                     return (
//                       <tr
//                         key={item.id}
//                         className="hover:bg-gray-50 transition duration-200"
//                       >
//                         <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
//                           <img
//                             src={item.avatar}
//                             alt={item.name}
//                             className="w-10 h-10 rounded-full object-cover"
//                           />
//                           <span className="text-gray-800 font-medium">
//                             {item.name}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 max-w-sm">
//                           <div className="text-gray-900 font-medium line-clamp-2">
//                             {item.title}
//                             {isLatest && (
//                             <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded-full">
//                               NEW
//                             </span>
//                           )}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
//                           {item.time}
//                         </td>
//                         <td className="px-6 py-4 text-gray-700">
//                           {item.message}
                          
//                         </td>
//                       </tr>
//                     );
//                   })}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {(loading ? Array.from({ length: 5 }) : conversations).map((item, i) => {
//             const id = item?.id || i;
//             const isLatest =
//               !loading &&
//               new Date(item.time.split(" ").reverse().join(" ")).getTime() ===
//                 latestTime;

//             return (
//               <div
//                 key={id}
//                 className="bg-white shadow-md rounded-lg px-4 py-3 border border-gray-200"
//               >
//                 {loading ? (
//                   <div className="animate-pulse flex items-center justify-between">
//                     <div className="flex gap-3 items-center">
//                       <div className="w-10 h-10 bg-gray-300 rounded-full" />
//                       <div className="w-24 h-4 bg-gray-300 rounded" />
//                     </div>
//                     <div className="w-8 h-8 bg-gray-300 rounded-full" />
//                   </div>
//                 ) : (
//                   <>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <img
//                           src={item.avatar}
//                           className="w-10 h-10 rounded-full"
//                           alt={item.name}
//                         />
//                         <span className="font-medium text-gray-800">
//                           {item.name}
//                         </span>
//                       </div>
//                       <button onClick={() => toggleRow(id)}>
//                         {expandedRows[id] ? <Minus size={18} /> : <Plus size={18} />}
//                       </button>
//                     </div>

//                     {expandedRows[id] && (
//                       <div className="mt-4 text-sm text-gray-700 space-y-2">
//                         <div className="flex justify-between">
//                           <span className="font-medium text-gray-500">Title:</span>
//                           <span className="text-right max-w-[60%]">{item.title}
//                           {isLatest && (
//                               <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded-full">
//                                 NEW
//                               </span>
//                             )}
//                           </span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="font-medium text-gray-500">Time:</span>
//                           <span className="text-right">{item.time}

//                           </span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="font-medium text-gray-500">Message:</span>
//                           <span>
//                             {item.message}
                            
//                           </span>
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Conversations;





import React, { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

const Conversations = () => {
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState({});
  const [conversations, setConversations] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          "https://e-commerce-backend-1-0.onrender.com/api/sellerconversations"
        );
        console.log("API Response:", response.data);
        setConversations(response.data); // response is a direct array
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const latestTime =
    conversations.length > 0
      ? new Date(Math.max(...conversations.map((c) => new Date(c.time))))
      : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl md:text-2xl mb-8">Conversations</h2>

      {!isMobile ? (
        <div className="bg-white rounded-xl shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-600 text-left text-sm font-semibold">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <div className="h-4 bg-gray-300 rounded w-24"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-300 rounded w-48"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-300 rounded w-32"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-300 rounded w-24"></div>
                      </td>
                    </tr>
                  ))
                : conversations.map((item) => {
                    const isLatest =
                      new Date(item.time).getTime() === latestTime?.getTime();

                    return (
                      <tr
                        key={item._id}
                        className="hover:bg-gray-50 transition duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                          <img
                            src={
                              item.avatar ||
                              "https://via.placeholder.com/40?text=User"
                            }
                            alt={item.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <span className="text-gray-800 font-medium">
                            {item.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 max-w-sm">
                          <div className="text-gray-900 font-medium line-clamp-2">
                            {item.title}
                            {isLatest && (
                              <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded-full">
                                NEW
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                          {new Date(item.time).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {item.message}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-4">
          {(loading ? Array.from({ length: 5 }) : conversations).map(
            (item, i) => {
              const id = item?._id || i;
              const isLatest =
                !loading &&
                new Date(item.time).getTime() === latestTime?.getTime();

              return (
                <div
                  key={id}
                  className="bg-white shadow-md rounded-lg px-4 py-3 border border-gray-200"
                >
                  {loading ? (
                    <div className="animate-pulse flex items-center justify-between">
                      <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full" />
                        <div className="w-24 h-4 bg-gray-300 rounded" />
                      </div>
                      <div className="w-8 h-8 bg-gray-300 rounded-full" />
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              item.avatar ||
                              "https://via.placeholder.com/40?text=User"
                            }
                            className="w-10 h-10 rounded-full"
                            alt={item.name}
                          />
                          <span className="font-medium text-gray-800">
                            {item.name}
                          </span>
                        </div>
                        <button onClick={() => toggleRow(id)}>
                          {expandedRows[id] ? (
                            <Minus size={18} />
                          ) : (
                            <Plus size={18} />
                          )}
                        </button>
                      </div>

                      {expandedRows[id] && (
                        <div className="mt-4 text-sm text-gray-700 space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-500">
                              Title:
                            </span>
                            <span className="text-right max-w-[60%]">
                              {item.title}
                              {isLatest && (
                                <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded-full">
                                  NEW
                                </span>
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-500">
                              Time:
                            </span>
                            <span className="text-right">
                              {new Date(item.time).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-500">
                              Message:
                            </span>
                            <span>{item.message}</span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default Conversations;
