import { BellIcon, Download, Eye, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import apiInstance from "../../../utils/axios";
import axios from "axios";

export default function DelayedPrepaymentPreOrders() {

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  // const [showNotificationConfirmation, setShowNotificationConfirmation] =
  //   useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://e-commerce-backend-1-0.onrender.com/api/sellerdelayed-final-orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  console.log('prepayment:',orders);

  const handleViewQuery = (order) => {
    navigate("/viewfinal", { state: { order } });
  };

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`https://e-commerce-backend-1-0.onrender.com/api/sellerdelayed-final-orders/${id}`);
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate 2s loading
    return () => clearTimeout(timer);
  }, []);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const SkeletonRow = () => (
    <tr className="animate-pulse border-b">
      <td className="hidden max-[1400px]:table-cell px-2">
        <div className="w-6 h-6 bg-gray-300 rounded" />
      </td>
      <td className="px-2">
        <div className="w-4 h-4 bg-gray-300 rounded" />
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="w-14 h-14 bg-gray-300 rounded" />
          <div className="space-y-2">
            <div className="w-32 h-4 bg-gray-300 rounded" />
            <div className="w-20 h-3 bg-gray-200 rounded" />
          </div>
        </div>
      </td>
      {[...Array(7)].map((_, idx) => (
        <td key={idx} className="max-[1400px]:hidden px-4 py-4">
          <div className="w-24 h-4 bg-gray-200 rounded" />
        </td>
      ))}
    </tr>
  );

  return (
    <div className="p-6">
      <div className="border border-gray rounded-xl">
        <p className="px-6 pt-4 text-2xl md:text-2xl font-inter">
          All Delayed Final Orders
        </p>

        <div className="flex flex-wrap justify-between mt-4 mx-4 gap-4">
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="Filter by date"
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            />
            <input
              type="text"
              placeholder="Search Orders"
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            />
            <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm font-inter">
              Filter
            </button>
          </div>
          <div className="flex items-center gap-2">
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
              <option>Bulk Action</option>
            </select>
            <button className="bg-blue-900 text-white px-3 py-2 rounded-md text-sm">
              Apply
            </button>
          </div>
        </div>

        <table className="w-full border-t border-gray-200 mt-6">
          <thead>
            <tr>
              <th className="hidden max-[1400px]:table-cell w-8"></th>
              <th>
                <input type="checkbox" />
              </th>
              <th>Product/Quantity</th>
              <th className="max-[1400px]:hidden">Preorder Code/Created</th>
              <th className="max-[1400px]:hidden">Price/Prepayment</th>

              <th className="max-[1400px]:hidden">Customer</th>
              <th className="max-[1400px]:hidden">Status</th>
              <th className="max-[1400px]:hidden">Refund</th>
              <th className="max-[1400px]:hidden">Options</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            ) : (
              <>
                {orders.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr className="border-b">
                      <td className="hidden max-[1400px]:table-cell text-center">
                        <button
                          onClick={() => toggleRow(index)}
                          className="bg-gray-200 px-2 py-1 rounded font-bold text-sm"
                        >
                          {expandedRow === index ? "-" : "+"}
                        </button>
                      </td>

                      <td>
                        <input type="checkbox" />
                      </td>

                      <td>
                        <div className="flex items-center gap-2">
                          <img
                            src={item.image}
                            alt=""
                            className="w-14 h-14 object-cover rounded"
                          />
                          <div className="text-sm">
                            <p className="font-semibold truncate w-28">
                              {item.product}
                            </p>
                            <p className="text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="max-[1400px]:hidden">
                        <p className="text-blue-600 font-medium">
                          {item.preorder_code}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Created: {item.created}
                        </p>
                      </td>

                      <td className="max-[1400px]:hidden text-sm">
                        {item.price} / {item.prepayment}
                      </td>

                      <td className="max-[1400px]:hidden text-sm">
                        <p>{item.customer.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.customer.email}
                        </p>
                      </td>

                      <td className="max-[1400px]:hidden">
                        <span className="text-xs text-white px-3 py-1 rounded-full bg-gray-600">
                          {item.status}
                        </span>
                      </td>

                      <td className="max-[1400px]:hidden">
                        <span className="text-xs text-white px-3 py-1 rounded-full bg-green-600">
                          {item.refund}
                        </span>
                      </td>

                      <td className="max-[1400px]:hidden">
                        <div className="flex items-center gap-2">
                          <div
                            onClick={() => handleViewQuery(item)}
                            className="p-2 bg-blue-100 rounded-full cursor-pointer"
                          >
                            <Eye size={16} color="blue" />
                          </div>
                          <div className="p-2 bg-[#e8d8ff] rounded-full cursor-pointer">
                            <Download size={16} color="blueviolet" />
                          </div>
                          <div className="p-2 bg-[#fff4e0] rounded-full cursor-pointer">
                            <BellIcon size={16} color="orange" />
                          </div>
                          <div className="p-2 bg-red-100 rounded-full cursor-pointer" onClick={() => handleDeleteOrder(item._id)}>
                            <Trash size={16} color="red" />
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Mobile Detail Row */}
                    {expandedRow === index && (
                      <tr className="max-[1400px]:table-row hidden bg-gray-50">
                        <td colSpan="9" className="p-4">
                          <div className="grid grid-cols-1 gap-3 text-sm">
                            <div className="flex justify-between">
                              <span className="font-semibold text-gray-700">
                                Preorder Code:
                              </span>
                              <span className="text-blue-600">
                                {item.preorder_code}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold text-gray-700">
                                Created:
                              </span>
                              <span>{item.created}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold text-gray-700">
                                Price / Prepayment:
                              </span>
                              <span>
                                {item.price} / {item.prepayment}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold text-gray-700">
                                Customer:
                              </span>
                              <span>{item.customer.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold text-gray-700">
                                Email:
                              </span>
                              <span>{item.customer.email}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold text-gray-700">
                                Status:
                              </span>
                              <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">
                                {item.status}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold text-gray-700">
                                Refund:
                              </span>
                              <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                                {item.refund}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold text-gray-700">
                                Actions:
                              </span>
                              <div className="flex items-center gap-2">
                                <div
                                  onClick={() => handleViewQuery(item)}
                                  className="p-2 bg-blue-100 rounded-full cursor-pointer"
                                >
                                  <Eye size={16} color="blue" />
                                </div>
                                <div className="p-2 bg-[#e8d8ff] rounded-full cursor-pointer">
                                  <Download size={16} color="blueviolet" />
                                </div>
                                <div className="p-2 bg-[#fff4e0] rounded-full cursor-pointer">
                                  <BellIcon size={16} color="orange" />
                                </div>
                                <div className="p-2 bg-red-100 rounded-full cursor-pointer" onClick={() => handleDeleteOrder(item._id)}>
                                  <Trash size={16} color="red" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
