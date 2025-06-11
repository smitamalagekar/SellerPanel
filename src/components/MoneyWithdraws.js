import { Plus } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MoneyWithdraws = () => {
  // const [expandedRows, setExpandedRows] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMessage, setWithdrawMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [currentRequest, setCurrentRequest] = useState(null);

  // const [ setExpandedRows] = useState({});

  // Function to fetch withdrawal requests
  // const fetchWithdrawalRequests = async () => {
  //   try {
  //     const response = await axios.get('https://e-commerce-backend-1-0.onrender.com/api/money-withdraw/withdraw-requests');
  //     console.log(response.data);  // Log the response data for debugging
  //     if (Array.isArray(response.data)) {
  //       setWithdrawalRequests(response.data);
  //     } else {
  //       console.error('Invalid response data:', response.data);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching withdrawal requests:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const fetchWithdrawalRequests = async () => {
    try {
      const response = await axios.get('https://e-commerce-backend-1-0.onrender.com/api/money-withdraw/withdraw-requests');
      console.log('Response data:', response.data);
      if (Array.isArray(response.data)) {
        setWithdrawalRequests(response.data);
      } else if (Array.isArray(response.data.data)) {
        // Handle if data is wrapped in a 'data' key
        setWithdrawalRequests(response.data.data);
      } else {
        console.error('Invalid response data:', response.data);
      }
    } catch (error) {
      console.error('Error fetching withdrawal requests:', error);
    } finally {
      setLoading(false);
    }
  };


  // Call the fetch function when the component mounts
  useEffect(() => {
    fetchWithdrawalRequests();
  }, []);

  // const toggleRow = (id) => {
  //   setExpandedRows((prev) => ({
  //     ...prev,
  //     [id]: !prev[id],
  //   }));
  // };

  const openModal = (request = null) => {
    setCurrentRequest(request);
    setWithdrawAmount(request ? request.amount : '');
    setWithdrawMessage(request ? request.message : '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setWithdrawAmount('');
    setWithdrawMessage('');
    setCurrentRequest(null);
  };

//   const toggleRow = (id) => {
//   setExpandedRows((prev) => ({
//     ...prev,
//     [id]: !prev[id],
//   }));
// };


  const handleSendWithdrawRequest = async () => {
    if (currentRequest) {
      // Update existing request
      try {
        const response = await axios.put(`https://e-commerce-backend-1-0.onrender.com/api/money-withdraw/update/${currentRequest.id}`, {
          amount: withdrawAmount,
          message: withdrawMessage,
        });
        console.log('Withdraw Request Updated:', response.data);

        // Update the withdrawalRequests state with the updated request
        setWithdrawalRequests((prev) =>
          prev.map((request) =>
            request.id === currentRequest.id ? { ...request, amount: withdrawAmount, message: withdrawMessage } : request
          )
        );
        closeModal();
      } catch (error) {
        console.error('Error updating withdraw request:', error);
      }
    } else {
      // Create new request if no currentRequest
      try {
        const response = await axios.post('https://e-commerce-backend-1-0.onrender.com/api/money-withdraw/create', {
          amount: withdrawAmount,
          message: withdrawMessage,
        });
        console.log('Withdraw Request Sent:', response.data);

        // Prepend the new request to the list of requests
        setWithdrawalRequests((prev) => [response.data, ...prev]);
        closeModal();
      } catch (error) {
        console.error('Error sending withdraw request:', error);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="font-semibold text-lg mb-4 mt-3 ml-4">Money Withdraw</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 ml-4 mr-4">
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg p-6 flex flex-col items-center justify-center shadow-md">
          <div className="bg-white/20 p-3 rounded-full mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0l-4 4m4-4l4 4" />
            </svg>
          </div>
          <div className="text-4xl font-bold">275.540</div>
          <div className="text-sm mt-1">Pending Balance</div>
        </div>

        <div className="bg-white border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-md transition cursor-pointer" onClick={() => openModal()}>
          <button className="bg-gray-100 p-4 rounded-full text-gray-600">
            <Plus size={32} />
          </button>
          <div className="mt-2 text-sm font-medium text-gray-700">Send Withdraw Request</div>
        </div>
      </div>

      <div className="border rounded p-6 bg-white ml-3 mr-3 border">
        <h2 className="text-xl font-semibold mb-4">Withdraw request history</h2>
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700 uppercase font-semibold">#</th>
              <th className="px-4 py-2 text-left text-gray-700 uppercase font-semibold">Date</th>
              <th className="px-4 py-2 text-left text-gray-700 uppercase font-semibold">Amount</th>
              <th className="px-4 py-2 text-left text-gray-700 uppercase font-semibold hidden md:table-cell">Status</th>
              <th className="px-4 py-2 text-left text-gray-700 uppercase font-semibold hidden md:table-cell">Message</th>
              <th className="px-4 py-2 text-left text-gray-700 uppercase font-semibold hidden md:table-cell">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-4 py-2"><div className="h-4 w-6 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-2"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-2"><div className="h-4 w-24 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-2 hidden md:table-cell"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-2 hidden md:table-cell"><div className="h-4 w-64 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-2 hidden md:table-cell"><div className="h-4 w-16 bg-gray-200 rounded" /></td>
                </tr>
              ))
            ) : (
              withdrawalRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 text-[13px]">
                  <td className="px-4 py-2">{request._id}</td>
                  {/* <td className="px-4 py-2">{request.createdAt}</td> */}
                  <td className="px-4 py-2">
                    {new Date(request.createdAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-4 py-2">{request.amount ? request.amount.toLocaleString() : 'N/A'}</td>
                  <td className="px-4 py-2 hidden md:table-cell">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${request.status === 'Pending' ? 'bg-yellow-200 text-yellow-700' : request.status === 'Completed' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 hidden md:table-cell max-w-md">
                    <div className="overflow-auto whitespace-normal">{request.message}</div>
                  </td>
                  <td className="px-4 py-2 hidden md:table-cell">
                    <button className="text-blue-600 hover:text-blue-800" onClick={() => openModal(request)}>
                      Update
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-96 m-5">
            <div className="flex justify-between items-center bg-gray-100 py-3 px-4 rounded-t-lg">
              <h2 className="text-lg font-semibold mt-4">{currentRequest ? 'Update Withdraw Request' : 'Send A Withdraw Request'}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">&times;</button>
            </div>
            <div className="p-4">
              <label className="block text-sm font-medium text-gray-600">Amount</label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                required
              />
              <label className="block text-sm font-medium text-gray-600 mt-4">Message</label>
              <textarea
                value={withdrawMessage}
                onChange={(e) => setWithdrawMessage(e.target.value)}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                required
              />
              <div className="mt-4 flex justify-end">
                <button onClick={handleSendWithdrawRequest} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  {currentRequest ? 'Update' : 'Send'} Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoneyWithdraws;
