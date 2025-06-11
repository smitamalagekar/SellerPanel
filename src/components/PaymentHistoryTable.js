// import React from 'react';
// import { FaMoneyBillWave } from 'react-icons/fa';

// const PaymentHistoryTable = () => {
//   const payments = [
//     { date: '27-04-2022', amount: 20000, method: 'Cash' },
//     { date: '28-04-2022', amount: 20000, method: 'Cash' },
//     { date: '29-04-2022', amount: 20000, method: 'Cash' },
//     { date: '30-04-2022', amount: 20000, method: 'Cash' },
//     { date: '31-04-2022', amount: 20000, method: 'Cash' },
//   ];

//   // Format amount in INR
//   const formatINR = (amount) =>
//     new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0,
//     }).format(amount);

//   return (
//     <div className="p-4 sm:p-8">
//       <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Payment History</h1>

//       <div className="overflow-x-auto shadow-md rounded-lg bg-white">
//         <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-3 text-left font-semibold text-gray-600">#</th>
//               <th className="px-4 py-3 text-left font-semibold text-gray-600">Date</th>
//               <th className="px-4 py-3 text-left font-semibold text-gray-600">Amount</th>
//               <th className="px-4 py-3 text-left font-semibold text-gray-600">Payment Method</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {payments.map((payment, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="px-4 py-3 text-gray-700">{index + 1}</td>
//                 <td className="px-4 py-3 text-gray-700">{payment.date}</td>
//                 <td className="px-4 py-3 text-gray-700">{formatINR(payment.amount)}</td>
//                 <td className="px-4 py-3 text-gray-700 flex items-center gap-2">
//                   {payment.method}
//                   <FaMoneyBillWave className="text-green-500" />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PaymentHistoryTable;


import React, { useState, useEffect } from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';
// import apiInstance from "../utils/axios";
import axios from 'axios';

const PaymentHistoryTable = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // const payments = [
  //   { date: '27-04-2022', amount: 20000, method: 'Cash' },
  //   { date: '28-04-2022', amount: 20000, method: 'Cash' },
  //   { date: '29-04-2022', amount: 20000, method: 'Cash' },
  //   { date: '30-04-2022', amount: 20000, method: 'Cash' },
  //   { date: '31-04-2022', amount: 20000, method: 'Cash' },
  // ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://e-commerce-backend-1-0.onrender.com/api/payouts");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  console.log("PyamentHistory:", data);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const formatINR = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="p-4 sm:p-8">
      <h1 className="font-[500] text-base mb-6 text-center text-gray-800 ">Payment History</h1>

      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base border">
          <thead className="bg-gray-100 text-sm text-[#1B1B28] font-[600]">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">#</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Date</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Amount</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Payment Method</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse ">
                  <td className="px-4 py-3 ">
                    <div className="h-4 bg-gray-200 rounded w-6"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4  bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                </tr>
              ))
              : data.map((payment, index) => (
                <tr key={index} className="hover:bg-gray-50 text-[13px]">
                  <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                  <td className="px-4 py-3 text-gray-700">{payment.date}</td>
                  <td className="px-4 py-3 text-gray-700">{formatINR(payment.amount)}</td>
                  <td className="px-4 py-3 text-gray-700 flex items-center gap-2">
                    {payment.paymentDetails}
                    <FaMoneyBillWave className="text-green-500" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistoryTable;
