import { Download, Eye, Trash } from "lucide-react";
import React, { useState, useEffect } from "react";
import Pagination from "../../Pagination";
import { useMediaQuery } from "react-responsive";
import { FaPlus, FaMinus } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import { Navigate, useNavigate } from "react-router-dom";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
// import apiInstance from "../../../utils/axios";

const PreordersTable = ({ customFilter, title = "All Preorders" }) => {
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line no-unused-vars
  const [preorders, setPreorders] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://e-commerce-backend-1-0.onrender.com/api/sallerall-preorders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const isMobile = useMediaQuery({ maxWidth: 1200 });
  const [expandedRows, setExpandedRows] = useState([]);
  const toggleRowExpansion = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const filteredPreorders = customFilter ? customFilter(preorders) : preorders;
  const totalPages = Math.ceil(filteredPreorders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

   // eslint-disable-next-line no-unused-vars
  // const currentPreorders = filteredPreorders.slice(
  //   indexOfFirstItem,
  //   indexOfLastItem
  // );

  const getStatusClassName = (status) => {
    switch (status) {
      case "Preorder Requested":
        return "bg-gray-200 text-gray-700";
      case "Delivered":
        return "bg-green-200 text-green-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getRefundClassName = (refund) => {
    switch (refund) {
      case "Refundable":
        return "bg-green-100 text-green-700";
      case "No Refund":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const navigate = useNavigate();

  const handleView = (preorder) => {
    // Navigate to the view page, you can pass the preorder data as state if needed
    navigate("/vieworder", { state: { preorder } });
  };

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`https://e-commerce-backend-1-0.onrender.com/api/delayed-orders/${id}`);
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-2xl text-gray-800">{title}</h2>
        <div className="flex flex-wrap gap-2 mt-3 text-sm">
          {[
            "All (6)",
            "Requests (1)",
            "Accepted Requests (0)",
            "Prepayment Requests (0)",
            "Confirmed Prepayments (0)",
            "Final Preorders (0)",
            "In Shipping (0)",
            "Delivered (5)",
            "Refund (1)",
          ].map((filter, idx) => (
            <span
              key={idx}
              className={`px-3 py-1 rounded-full ${
                idx === 0
                  ? "bg-blue-900 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {filter}
            </span>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-between gap-4">
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
          <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm">
            Filter
          </button>
        </div>
        <div className="flex items-center gap-2">
          <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
            <option>Bulk Action</option>
          </select>
          <button className="bg-blue-900 text-white px-3 py-3 rounded-md text-sm">
            Apply
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 rounded-lg">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              {isMobile && <th className="p-3 text-left"></th>}
              <th className="p-3 text-left">
                {loading ? <Skeleton width={20} /> : <input type="checkbox" />}
              </th>
              <th className="p-3 text-left">
                {loading ? <Skeleton width={120} /> : "Product"}
              </th>
              {!isMobile && (
                <th className="p-3 text-left">
                  {loading ? <Skeleton width={150} /> : "Order Code"}
                </th>
              )}
              {!isMobile && (
                <th className="p-3 text-left">
                  {loading ? <Skeleton width={130} /> : "Amount"}
                </th>
              )}
              {!isMobile && (
                <th className="p-3 text-left">
                  {loading ? <Skeleton width={100} /> : "Customer"}
                </th>
              )}
              {!isMobile && (
                <th className="p-3 text-left">
                  {loading ? <Skeleton width={90} /> : "Status"}
                </th>
              )}
              {!isMobile && (
                <th className="p-3 text-left">
                  {loading ? <Skeleton width={90} /> : "Refund"}
                </th>
              )}
              <th className="p-3 text-left">
                {loading ? <Skeleton width={80} /> : "Actions"}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? [...Array(5)].map((_, index) => (
                  <tr key={index} className="border-t border-gray-100">
                    {isMobile && (
                      <td className="p-3">
                        <Skeleton width={24} height={24} circle />
                      </td>
                    )}
                    <td className="p-3">
                      <Skeleton width={20} />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <Skeleton
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                        <div>
                          <Skeleton width={120} />
                          <Skeleton width={60} />
                        </div>
                      </div>
                    </td>
                    {!isMobile && (
                      <td className="p-3">
                        <Skeleton width={100} />{" "}
                        <div className="text-xs">
                          <Skeleton width={80} />
                        </div>
                      </td>
                    )}
                    {!isMobile && (
                      <td className="p-3">
                        <Skeleton width={80} />{" "}
                        <div className="text-xs">
                          <Skeleton width={70} />
                        </div>
                      </td>
                    )}
                    {!isMobile && (
                      <td className="p-3">
                        <Skeleton width={100} />{" "}
                        <div className="text-xs">
                          <Skeleton width={120} />
                        </div>
                      </td>
                    )}
                    {!isMobile && (
                      <td className="p-3">
                        <Skeleton
                          width={90}
                          height={20}
                          className="rounded-full"
                        />
                      </td>
                    )}
                    {!isMobile && (
                      <td className="p-3">
                        <Skeleton
                          width={90}
                          height={20}
                          className="rounded-full"
                        />
                      </td>
                    )}
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Skeleton width={24} height={24} circle />
                        <Skeleton width={24} height={24} circle />
                        <Skeleton width={24} height={24} circle />
                      </div>
                    </td>
                  </tr>
                ))
              : orders.map((preorder) => (
                  <React.Fragment key={preorder._id}>
                    <tr className="border-t border-gray-100 hover:bg-gray-50">
                      {isMobile && (
                        <td className="p-3">
                          <button
                            onClick={() => toggleRowExpansion(preorder._id)}
                          >
                            {expandedRows.includes(preorder._id) ? (
                              <FaMinus />
                            ) : (
                              <FaPlus />
                            )}
                          </button>
                        </td>
                      )}
                      <td className="p-3">
                        <input type="checkbox" />
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={preorder.image}
                            alt=""
                            className="w-10 h-10 rounded-md object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-800">
                              {preorder.product}
                            </p>
                            <p className="text-xs text-gray-500">
                              Qty: {preorder.quantity}
                            </p>
                          </div>
                        </div>
                      </td>
                      {!isMobile && (
                        <>
                          <td className="p-3 text-gray-600">
                            <div>{preorder.preorder_code}</div>
                            <div className="text-xs text-gray-500">
                              Created: {preorder.created}
                            </div>
                          </td>
                          <td className="p-3 text-gray-600">
                            <div>{preorder.price}</div>
                            <div className="text-xs text-gray-500">
                              {preorder.prepayment}
                            </div>
                          </td>
                          <td className="p-3 text-gray-600">
                            <div>{preorder.customer.name}</div>
                            <div className="text-xs text-gray-500">
                              {preorder.customer.email}
                            </div>
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClassName(
                                preorder.status
                              )}`}
                            >
                              {preorder.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${getRefundClassName(
                                preorder.refund
                              )}`}
                            >
                              {preorder.refund}
                            </span>
                          </td>
                        </>
                      )}
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            className="text-blue-500 bg-blue-100 p-1 rounded-full "
                            onClick={() => handleView(preorder)}
                          >
                            <Eye size={16} />
                          </button>
                          <button className="text-purple-500 bg-purple-100 p-1 rounded-full">
                            <Download size={16} />
                          </button>
                          <button className="text-red-500 bg-red-100 p-1 rounded-full" onClick={() => handleDeleteOrder(preorder._id)}>
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {isMobile && expandedRows.includes(preorder._id) && (
                      <tr>
                        <td colSpan="8" className="bg-gray-50 px-4 py-3">
                          <table className="w-full text-sm">
                            <tbody>
                              <tr>
                                <td className="font-semibold py-2 px-2">
                                  Order Code
                                </td>
                                <td className="py-2 px-2">{preorder.preorder_code}</td>
                              </tr>
                              <tr>
                                <td className="font-semibold py-2 px-2">
                                  Amount
                                </td>
                                <td className="py-2 px-2">
                                  <div>{preorder.price}</div>
                                  <div className="text-xs text-gray-500">
                                    {preorder.prepayment}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="font-semibold py-2 px-2">
                                  Status
                                </td>
                                <td className="py-2 px-2">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClassName(
                                      preorder.status
                                    )}`}
                                  >
                                    {preorder.status}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="font-semibold py-2 px-2">
                                  Refund
                                </td>
                                <td className="py-2 px-2">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getRefundClassName(
                                      preorder.refund
                                    )}`}
                                  >
                                    {preorder.refund}
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center text-sm text-gray-600 pt-4">
        <div>
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredPreorders.length)} of{" "}
          {filteredPreorders.length} entries
        </div>
        {loading ? (
          <Skeleton width={150} />
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default PreordersTable;
