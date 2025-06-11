




// import React, { useState, useEffect } from 'react';
// import { Eye, Plus, Trash } from 'lucide-react';
// import Switch from './Switch';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

// const refundData = [
//   {
//     id: 1,
//     date: '19-04-2022',
//     orderId: '20220420-07073292',
//     product: 'COOP by SwimWays Hydro Lacrosse, Blue, Outdoor Games For Adults & Kids',
//     amount: 15000,
//     status: 'Rejected',
//     reason: 'Show',
//     approval: false,
//     rejected: true,
//     rejectReasonText: `"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"`,
//   },
//   {
//     id: 2,
//     date: '19-04-2022',
//     orderId: '20220420-07073292',
//     product: `Berne Men's Heritage Thermal-Lined Full-Zip Hooded Sweatshirt`,
//     amount: 12150,
//     status: 'Approved',
//     reason: 'Show',
//     approval: false,
//     rejected: true,
//   },
//   {
//     id: 3,
//     date: '19-04-2022',
//     orderId: '20220420-07224759',
//     product: `Berne Men's Heritage Thermal-Lined Full-Zip Hooded Sweatshirt`,
//     amount: 12150,
//     status: 'Approved',
//     reason: 'Show',
//     approval: true,
//     rejected: false,
//   },
//   {
//     id: 4,
//     date: '19-04-2022',
//     orderId: '20220420-07224759',
//     product: `Berne Men's Heritage Thermal-Lined Full-Zip Hooded Sweatshirt`,
//     amount: 12150,
//     status: 'Approved',
//     reason: 'Show',
//     approval: true,
//     rejected: false,
//   },
// ];

// export default function RefundRequests() {
//   const [expandedRows, setExpandedRows] = useState([]);
//   const [approvalStates, setApprovalStates] = useState(
//     refundData.map((item) => item.approval)
//   );
//   const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
//   const [selectedReason, setSelectedReason] = useState('');
//   const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
//   const [currentRejectItemId, setCurrentRejectItemId] = useState(null);
//   const [rejectReasonInput, setRejectReasonInput] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 1000);
//   }, []);

//   const toggleRow = (id) => {
//     setExpandedRows((prev) =>
//       prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
//     );
//   };

//   const handleApprovalChange = (id, newValue) => {
//     const index = refundData.findIndex((item) => item.id === id);
//     if (index !== -1) {
//       setApprovalStates((prev) => {
//         const newState = [...prev];
//         newState[index] = newValue;
//         return newState;
//       });
//     }
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//     }).format(amount);
//   };

//   const openReasonModal = (reasonText) => {
//     setSelectedReason(reasonText);
//     setIsReasonModalOpen(true);
//   };

//   const closeReasonModal = () => {
//     setIsReasonModalOpen(false);
//     setSelectedReason('');
//   };

//   const openRejectModal = (itemId, existingReason = '') => {
//     setCurrentRejectItemId(itemId);
//     setRejectReasonInput(existingReason);
//     setIsRejectModalOpen(true);
//   };

//   const closeRejectModal = () => {
//     setIsRejectModalOpen(false);
//     setCurrentRejectItemId(null);
//     setRejectReasonInput('');
//   };

//   const handleRejectReasonChange = (event) => {
//     setRejectReasonInput(event.target.value);
//   };

//   const handleRejectSubmit = () => {
//     console.log(`Rejecting item ${currentRejectItemId} with reason:`, rejectReasonInput);
//     closeRejectModal();
//   };

//   return (
//     <div className="m-7 ">
//       {/* <h2 className="text-1xl font-semibold mb-4">{loading ? <Skeleton width={200} /> : 'Refund Requests'}</h2>
//       <div className="overflow-x-auto border border-gray-300 p-5 bg-white">
//         <h3 className="text-lg font-medium mb-5">{loading ? <Skeleton width={100} /> : 'All files'}</h3> */}
//         <h2 className="text-2xl font-semibold mb-4">Refund Requests</h2>
//        <div className="overflow-x-auto border border-gray-300 p-5 bg-white">
//          <h3 className="text-lg font-medium mb-5">All files</h3>
//         <table className="w-full table-auto border p-8">
//           <thead>
//             <tr className="bg-gray-100 text-xs text-[#1B1B28] font-[600]">
//               <th className="p-2 lg:hidden text-left"></th>
//               <th className="p-2 text-left">{loading ? <Skeleton width={20} /> : '#'}</th>
//               <th className="hidden xl:table-cell text-left">{loading ? <Skeleton width={80} /> : 'Date'}</th>
//               <th className="p-2 text-left">{loading ? <Skeleton width={80} /> : 'Order ID'}</th>
//               <th className="p-2 hidden xl:table-cell text-left">{loading ? <Skeleton width={150} /> : 'Product'}</th>
//               <th className="p-2 hidden xl:table-cell text-left">{loading ? <Skeleton width={80} /> : 'Amount'}</th>
//               <th className="p-2 hidden xl:table-cell text-left">{loading ? <Skeleton width={80} /> : 'Status'}</th>
//               <th className="p-2 hidden xl:table-cell text-left">{loading ? <Skeleton width={80} /> : 'Reason'}</th>
//               <th className="p-2 text-left">{loading ? <Skeleton width={80} /> : 'Approval'}</th>
//               <th className="p-2 hidden xl:table-cell text-left">{loading ? <Skeleton width={80} /> : 'Reject'}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               Array.from({ length: 5 }).map((_, index) => (
//                 <tr key={index} className="border-t text-xs ">
//                   <td className="p-2 xl:hidden">
//                     <Skeleton circle width={18} height={18} />
//                   </td>
//                   <td className="p-2 text-xs"><Skeleton width={20} /></td>
//                   <td className="p-2 text-xs hidden xl:table-cell"><Skeleton width={80} /></td>
//                   <td className="p-2 text-xs"><Skeleton width={80} /></td>
//                   <td className="p-2 text-xs hidden xl:table-cell"><Skeleton width={150} /></td>
//                   <td className="p-2 text-xs hidden xl:table-cell"><Skeleton width={80} /></td>
//                   <td className="p-2 text-xs hidden xl:table-cell"><Skeleton width={80} /></td>
//                   <td className="p-2 text-xs hidden xl:table-cell"><Skeleton width={80} /></td>
//                   <td className="p-2 text-xs"><Skeleton width={60} /></td>
//                   <td className="p-2 text-xs hidden xl:table-cell"><Skeleton width={60} /></td>
//                 </tr>
//               ))
//             ) : (
//               refundData.map((item) => (
//                 <React.Fragment key={item.id}>
//                   <tr className="border-t  text-xs">
//                     <td className="p-2 xl:hidden">
//                       <button onClick={() => toggleRow(item.id)}>
//                         <Plus size={18} />
//                       </button>
//                     </td>
//                     <td className="p-2">{item.id}</td>
//                     <td className="p-2 hidden xl:table-cell">{item.date}</td>
//                     <td className="p-2">{item.orderId}</td>
//                     <td className="p-2 hidden xl:table-cell">{item.product}</td>
//                     <td className="p-2 hidden xl:table-cell">{formatCurrency(item.amount)}</td>
//                     <td className="p-2 hidden xl:table-cell">
//                       <span
//                         className={`px-2 py-1 rounded text-white text-xs ${
//                           item.status === 'Approved'
//                             ? 'bg-green-500'
//                             : item.status === 'Rejected'
//                             ? 'bg-red-500'
//                             : 'bg-yellow-500'
//                         }`}
//                       >
//                         {item.status}
//                       </span>
//                     </td>
//                     <td className="p-2 hidden xl:table-cell">
//                       <button className="bg-green-500 text-white text-xs px-2 py-1 rounded" onClick={() => openReasonModal(item.rejectReasonText)}>
//                         Show
//                       </button>
//                     </td>
//                     <td className="p-2">
//                       <Switch
//                         value={approvalStates[refundData.findIndex((r) => r.id === item.id)]}
//                         onChangeFunc={(e) =>
//                           handleApprovalChange(item.id, e.target.checked)
//                         }
//                       />
//                     </td>
//                     <td className="p-2 hidden xl:table-cell">
//                       {item.rejected && (
//                         <>
//                           <div
//                             className="p-[.2cm] bg-blue-100 w-fit rounded-full cursor-pointer inline-flex items-center justify-center mr-2"
//                             onClick={() => openReasonModal(item.rejectReasonText)}
//                           >
//                             <Eye size={15} color="blue" />
//                           </div>
//                           <div
//                             className="p-[.2cm] bg-red-100 w-fit rounded-full cursor-pointer inline-flex items-center justify-center"
//                             onClick={() => openRejectModal(item.id, '')}
//                           >
//                             <Trash size={15} color="red" />
//                           </div>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                   {expandedRows.includes(item.id) && (
//                     <tr className="xl:hidden p-4">
//                       <td colSpan={10} className="p-4 bg-gray-50">
//                         <div className="grid gap-2 text-sm">
//                           <div>
//                             <strong>Date:</strong> {loading ? <Skeleton width={80} /> : item.date}
//                           </div>
//                           <div>
//                             <strong>Product:</strong> {loading ? <Skeleton width={150} /> : item.product}
//                           </div>
//                           <div>
//                             <strong>Amount:</strong> {loading ? <Skeleton width={80} /> : formatCurrency(item.amount)}
//                           </div>
//                           <div>
//                             <strong>Status:</strong>
//                             {loading ? (
//                               <Skeleton width={80} className="ml-3" />
//                             ) : (
//                               <span
//                                 className={`px-2 py-1 ml-3 rounded text-white text-xs ${
//                                   item.status === 'Approved'
//                                     ? 'bg-green-500'
//                                     : item.status === 'Rejected'
//                                     ? 'bg-red-500'
//                                     : 'bg-yellow-500'
//                                 }`}
//                               >
//                                 {item.status}
//                               </span>
//                             )}
//                           </div>
//                           <div>
//                             <strong>Reason:</strong>
//                             {loading ? (
//                               <Skeleton width={60} className="ml-3" />
//                             ) : (
//                               <button className="bg-green-500 text-white text-xs px-2 py-1 rounded ml-3" onClick={() => openReasonModal(item.rejectReasonText)}>
//                                 Show
//                               </button>
//                             )}
//                           </div>
//                           <div>
//                             <strong>Reject:</strong>{' '}
//                             {loading ? (
//                               <Skeleton width={40} className="ml-3 inline-block" />
//                             ) : (
//                               item.rejected && (
//                                 <>
//                                   <div
//                                     className="w-8 h-8 rounded-full bg-red-100 inline-flex ml-3 items-center justify-center"
//                                     onClick={() => openReasonModal(item.rejectReasonText)}
//                                   >
//                                     <Eye className="w-5 h-5 text-red-600" />
//                                   </div>
//                                   <div
//                                     className="w-8 h-8 rounded-full bg-red-100 inline-flex ml-2 items-center justify-center"
//                                     onClick={() => openRejectModal(item.id, '')}
//                                   >
//                                     <Trash className="w-5 h-5 text-red-600" />
//                                   </div>
//                                 </>
//                               )
//                             )}
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {isReasonModalOpen && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-md shadow-lg relative w-[80%] max-w-[600px] max-h-[80%] overflow-y-auto">
//             <div className="p-6">
//               <button
//                 onClick={closeReasonModal}
//                 className="absolute top-2 right-3 text-gray-600 hover:text-gray-800"
//               >
//                 ×
//               </button>
//               <h3 className="text-lg font-semibold mb-2">Reject Reason</h3>
//               <p className="text-gray-700 whitespace-pre-wrap">{selectedReason}</p>
//             </div>
//             <div className="flex justify-end p-6 border-t">
//               <button
//                 onClick={closeReasonModal}
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {isRejectModalOpen && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-md shadow-lg relative w-[80%] max-w-[600px] max-h-[80%] overflow-y-auto">
//             <div className="p-6">
//               <h3 className="text-lg font-semibold mb-4">Reject Refund Request</h3>
//               <div className="mb-4">
//                 <label
//                   htmlFor="rejectReason"
//                   className="block text-gray-700 text-md font-semibold mb-2"
//                 >
//                   Reject Reason
//                 </label>
//                 <textarea
//                   id="rejectReason"
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//                   rows="4"
//                   value={rejectReasonInput}
//                   onChange={handleRejectReasonChange}
//                 />
//               </div>
//             </div>
//             <div className="flex justify-end p-6 border-t">
//               <button
//                 onClick={closeRejectModal}
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleRejectSubmit}
//                 className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded ml-2"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import { Eye, Plus, Trash } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import Switch from './Switch'; // Assume your Switch component works with `value` and `onChangeFunc`

export default function RefundRequests() {
  const [refundData, setRefundData] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [approvalStates, setApprovalStates] = useState([]);
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [currentRejectItemId, setCurrentRejectItemId] = useState(null);
  const [rejectReasonInput, setRejectReasonInput] = useState('');
  const [loading, setLoading] = useState(true);

  // const [ setVisibleReason] = useState({});


  const fetchRefundData = async () => {
    try {
      const response = await axios.get('https://e-commerce-backend-1-0.onrender.com/api/sellerrefund-requests');
      console.log("API Response:", response.data);

      const data = Array.isArray(response.data) ? response.data : response.data.data;
      setRefundData(data);
      setApprovalStates(data.map(() => false)); // Default toggle state
    } catch (error) {
      console.error('Error fetching refund data:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchRefundData();
  }, []);

  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleApprovalChange = (id, newValue) => {
    const index = refundData.findIndex((item) => item._id === id);
    if (index !== -1) {
      const updatedApprovalStates = [...approvalStates];
      updatedApprovalStates[index] = newValue;
      setApprovalStates(updatedApprovalStates);
    }
  };

  // const toggleReason = (id) => {
  //   setVisibleReason((prev) => ({
  //     ...prev,
  //     [id]: !prev[id],
  //   }));
  // };


  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const openReasonModal = (reasonText) => {
    setSelectedReason(reasonText);
    setIsReasonModalOpen(true);
  };

  const closeReasonModal = () => {
    setIsReasonModalOpen(false);
    setSelectedReason('');
  };

  const openRejectModal = (itemId, existingReason = '') => {
    setCurrentRejectItemId(itemId);
    setRejectReasonInput(existingReason);
    setIsRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
    setCurrentRejectItemId(null);
    setRejectReasonInput('');
  };

  const handleRejectReasonChange = (event) => {
    setRejectReasonInput(event.target.value);
  };

  const handleRejectSubmit = () => {
    console.log(`Rejecting item ${currentRejectItemId} with reason:`, rejectReasonInput);
    closeRejectModal();
  };

  return (
    <div className="m-7">
      <h2 className="text-2xl font-semibold mb-4">Refund Requests</h2>
      <div className="overflow-x-auto border border-gray-300 p-5 bg-white">
        <h3 className="text-lg font-medium mb-5">All files</h3>
        <table className="w-full table-auto border p-8">
          <thead>
            <tr className="bg-gray-100 text-xs text-[#1B1B28] font-[600]">
              <th className="p-2   xl:hidden lg:hidden text-left"></th>
              {/* <th className="p-2 md:hidden  lg:hidden text-left"></th> */}
              <th className="p-2  hidden xl:table-cell text-left">#</th>
              <th className="p-2 hidden xl:table-cell text-left">Date</th>
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 hidden xl:table-cell text-left">Product</th>
              <th className="p-2 hidden xl:table-cell text-left">Amount</th>
              <th className="p-2 hidden xl:table-cell text-left">Status</th>
              <th className="p-2 hidden xl:table-cell text-left">Reason</th>
              <th className="p-2 text-left">Approval</th>
              <th className="p-2 hidden xl:table-cell text-left">Reject</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="border-t text-xs">
                  <td className="p-2 xl:hidden">
                    <Skeleton circle width={18} height={18} />
                  </td>
                  <td className="p-2"><Skeleton width={20} /></td>
                  <td className="p-2 hidden xl:table-cell"><Skeleton width={80} /></td>
                  <td className="p-2"><Skeleton width={80} /></td>
                  <td className="p-2 hidden xl:table-cell"><Skeleton width={150} /></td>
                  <td className="p-2 hidden xl:table-cell"><Skeleton width={80} /></td>
                  <td className="p-2 hidden xl:table-cell"><Skeleton width={80} /></td>
                  <td className="p-2 hidden xl:table-cell"><Skeleton width={80} /></td>
                  <td className="p-2"><Skeleton width={60} /></td>
                  <td className="p-2 hidden xl:table-cell"><Skeleton width={60} /></td>
                  <td className="p-2 hidden xl:table-cell"><Skeleton width={60} /></td>
                </tr>
              ))
            ) : (
              refundData.map((item, index) => (
                <React.Fragment key={item._id}>
                  <tr className="border-t text-xs">
                    <td className="p-2 xl:hidden">
                      <button onClick={() => toggleRow(item._id)}>
                        <Plus size={18} />
                      </button>
                    </td>
                    <td className="p-2 hidden xl:table-cell">{item._id}</td>
                    {/* <td className="p-2 hidden xl:table-cell">{item.date}</td> */}
                    <td className="px-4 py-2">
                      {new Date(item.date).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="p-2">{item.orderId}</td>
                    <td className="p-2 hidden xl:table-cell">{item.product}</td>
                    <td className="p-2 hidden xl:table-cell">{formatCurrency(item.amount)}</td>
                    <td className="p-2 hidden xl:table-cell">
                      <span className={`px-2 py-1 rounded text-white text-xs ${item.status === 'Approved'
                        ? 'bg-green-500'
                        : item.status === 'Rejected'
                          ? 'bg-red-500'
                          : 'bg-yellow-500'
                        }`}>
                        {item.status}
                      </span>
                    </td>
                    {/* <td className="p-2 hidden xl:table-cell">
                      <button
                        className="bg-green-500 text-white text-xs px-2 py-1 rounded"
                        onClick={() => openReasonModal(item.rejectReasonText)}
                      >
                        Show
                      </button>
                    </td> */}
                    <td className="p-2 hidden xl:table-cell">
                      <button
                        className="text-blue-600 underline text-xs"
                        onClick={() => openReasonModal(item.reason)} // 👈 this is the fix!
                      >
                        Show
                      </button>
                    </td>


                    <td className="p-2 hidden xl:table-cell">
                      <Switch
                        value={approvalStates[index]}
                        onChangeFunc={(e) => handleApprovalChange(item._id, e.target.checked)}
                      />
                    </td>
                    <td className="p-2 hidden xl:table-cell">
                      {item.rejected && (
                        <>
                          <div
                            className="p-[.2cm] bg-blue-100 w-fit rounded-full cursor-pointer inline-flex items-center justify-center mr-2"
                            onClick={() => openReasonModal(item.rejectReasonText)}
                          >
                            <Eye size={15} color="blue" />
                          </div>
                          <div
                            className="p-[.2cm] bg-red-100 w-fit rounded-full cursor-pointer inline-flex items-center justify-center"
                            onClick={() => openRejectModal(item._id, '')}
                          >
                            <Trash size={15} color="red" />
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                  {expandedRows.includes(item._id) && (
                    <tr className="xl:hidden">
                      <td colSpan={10} className="p-4 bg-gray-50">
                        <div className="grid gap-2 text-sm">

                          <div><strong>#: </strong> {item._id}</div>
                          <div><strong>Date: </strong><td className="px-4 py-2">
                            {new Date(item.date).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })}
                          </td></div>
                          <div><strong>Product: </strong> {item.product}</div>
                          <div><strong>Amount: </strong> {formatCurrency(item.amount)}</div>
                          <div>
                            <strong>Status: </strong>{' '}
                            <span className={`px-2 py-1 ml-3 rounded text-white text-xs ${item.status === 'Approved'
                              ? 'bg-green-500'
                              : item.status === 'Rejected'
                                ? 'bg-red-500'
                                : 'bg-yellow-500'
                              }`}>
                              {item.status}
                            </span>
                          </div>
                          

                           <td className="p-2 hidden xl:table-cell">
                      <Switch
                        value={approvalStates[index]}
                        onChangeFunc={(e) => handleApprovalChange(item._id, e.target.checked)}
                      />
                    </td>
                          {/* <div>
                            <strong>Reason:</strong>
                            <button
                              className="bg-green-500 text-white text-xs px-2 py-1 rounded ml-3"
                              onClick={() => openReasonModal(item.rejectReasonText)}
                            >
                              Show
                            </button>
                          </div> */}
                          <div>
                            <strong>Reason:</strong>
                            <button
                              className="bg-green-500 text-white text-xs px-2 py-1 rounded ml-3"
                              onClick={() => openReasonModal(item.reason)} // 👈 Fix here too!
                            >
                              Show
                            </button>
                          </div>

                          <div>
                            <strong>Reject:</strong>
                            {item.rejected && (
                              <>
                                <div
                                  className="w-8 h-8 rounded-full bg-red-100 inline-flex ml-3 items-center justify-center"
                                  onClick={() => openReasonModal(item.rejectReasonText)}
                                >
                                  <Eye className="w-5 h-5 text-red-600" />
                                </div>
                                <div
                                  className="w-8 h-8 rounded-full bg-red-100 inline-flex ml-2 items-center justify-center"
                                  onClick={() => openRejectModal(item._id, '')}
                                >
                                  <Trash className="w-5 h-5 text-red-600" />
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isReasonModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-md shadow-lg relative w-[80%] max-w-[600px] max-h-[80%] overflow-y-auto">
            <div className="p-6">
              <button
                onClick={closeReasonModal}
                className="absolute top-2 right-3 text-gray-600 hover:text-gray-800"
              >
                ×
              </button>
              <h3 className="text-lg font-semibold mb-2">Reject Reason</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{selectedReason}</p>
            </div>
            <div className="flex justify-end p-6 border-t">
              <button
                onClick={closeReasonModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isRejectModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-md shadow-lg relative w-[80%] max-w-[600px] max-h-[80%] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Reject Refund Request</h3>
              <div className="mb-4">
                <label htmlFor="rejectReason" className="block text-gray-700 text-md font-semibold mb-2">
                  Reject Reason
                </label>
                <textarea
                  id="rejectReason"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  rows="4"
                  value={rejectReasonInput}
                  onChange={handleRejectReasonChange}
                />
              </div>
            </div>
            <div className="flex justify-end p-6 border-t">
              <button
                onClick={closeRejectModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectSubmit}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded ml-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
