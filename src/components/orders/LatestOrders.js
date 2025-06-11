import { Download, Eye, Trash } from "lucide-react";
import React, { useState, useEffect } from "react";
import OrderHeader from "./OrderHeader";
import Pagination from "../Pagination";
import { useMediaQuery } from "react-responsive";
import { FaPlus, FaMinus } from "react-icons/fa";

const LatestOrders = ({ customFilter, title = "Latest Orders" }) => {

    // eslint-disable-next-line no-unused-vars
  const [orders, setOrders] = useState([
    { id: 1, code: "ORD001", products: 2, customer: "John Doe", seller: "InHouse Order", amount: "$100.00", deliveryStatus: "Pending", paymentMethod: "Credit Card", paymentStatus: "Paid", refund: "No" },
    { id: 2, code: "ORD002", products: 3, customer: "Jane Smith", seller: "Seller", amount: "$150.00", deliveryStatus: "Shipping", paymentMethod: "PayPal", paymentStatus: "Paid", refund: "No" },
    { id: 3, code: "ORD003", products: 1, customer: "Alice Johnson", seller: "Seller", amount: "$50.00", deliveryStatus: "Completed", paymentMethod: "Credit Card", paymentStatus: "Paid", refund: "Yes" },
    { id: 4, code: "ORD004", products: 4, customer: "Bob Brown", seller: "Seller", amount: "$200.00", deliveryStatus: "Pending", paymentMethod: "Credit Card", paymentStatus: "Unpaid", refund: "No" },
    { id: 5, code: "ORD005", products: 2, customer: "Charlie Davis", seller: "InHouse Order", amount: "$120.00", deliveryStatus: "Shipping", paymentMethod: "PayPal", paymentStatus: "Paid", refund: "No" },
    { id: 6, code: "ORD006", products: 1, customer: "Eve White", seller: "Seller", amount: "$80.00", deliveryStatus: "Completed", paymentMethod: "Credit Card", paymentStatus: "Paid", refund: "Yes" },
  ]);

  const isBelow1400 = useMediaQuery({ maxWidth: 1400 });
  const [expandedOrders, setExpandedOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const filteredOrders = customFilter ? customFilter(orders) : orders;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-orange-500";
      case "Shipping":
        return "text-blue-500";
      case "Completed":
        return "text-green-500";
      case "Refund":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

return (
    <div className="bg-white rounded-lg shadow-lg p-6 mx-auto">
        <OrderHeader />
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    <tr className="border-b border-gray-200">
                        {isBelow1400 && <th className="py-3 px-4"></th>}
                        <th className="py-3 px-4">
                            <input type="checkbox" />
                        </th>
                        <th className="py-3 px-4 text-xs font-medium text-gray-500">Order Code</th>
                        {!isBelow1400 && (
                            <>
                                <th className="py-3 px-4 text-xs font-medium text-gray-500">Num. of Products</th>
                                <th className="py-3 px-4 text-xs font-medium text-gray-500">Customer</th>
                                <th className="py-3 px-4 text-xs font-medium text-gray-500">Amount</th>
                                <th className="py-3 px-4 text-xs font-medium text-gray-500">Delivery Status</th>
                                <th className="py-3 px-4 text-xs font-medium text-gray-500">Payment Status</th>
                            </>
                        )}
                        <th className="py-3 px-4 text-xs font-medium text-gray-500">Refund</th>
                        <th className="py-3 px-4 text-xs font-medium text-gray-500">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading
                        ? [...Array(6)].map((_, index) => (
                                <tr key={index} className="border-b border-gray-100">
                                    {isBelow1400 && <td className="py-3 px-4"><div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse" /></td>}
                                    <td className="py-3 px-4"><div className="h-4 w-4 bg-gray-200 rounded-sm animate-pulse" /></td>
                                    <td className="py-3 px-4"><div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse" /></td>
                                    {!isBelow1400 && (
                                        <>
                                            <td className="py-3 px-4"><div className="h-4 w-10 bg-gray-200 rounded-md animate-pulse" /></td>
                                            <td className="py-3 px-4"><div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse" /></td>
                                            <td className="py-3 px-4"><div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse" /></td>
                                            <td className="py-3 px-4"><div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse" /></td>
                                            <td className="py-3 px-4"><div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse" /></td>
                                        </>
                                    )}
                                    <td className="py-3 px-4"><div className="h-4 w-10 bg-gray-200 rounded-md animate-pulse" /></td>
                                    <td className="py-3 px-4 flex gap-2">
                                        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse" />
                                        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse" />
                                        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse" />
                                    </td>
                                </tr>
                            ))
                        : currentOrders.map((order) => (
                                <React.Fragment key={order.id}>
                                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                                        {isBelow1400 && (
                                            <td className="py-3 px-4 text-xs">
                                                <button onClick={() => toggleOrderExpansion(order.id)}>
                                                    {expandedOrders.includes(order.id) ? <FaMinus /> : <FaPlus />}
                                                </button>
                                            </td>
                                        )}
                                        <td className="py-3 px-4">
                                            <input type="checkbox" />
                                        </td>
                                        <td className="py-3 px-4 text-xs text-gray-700">{order.code}</td>
                                        {!isBelow1400 && (
                                            <>
                                                <td className="py-3 px-4 text-xs text-gray-500">{order.products}</td>
                                                <td className="py-3 px-4 text-xs text-gray-700">{order.customer}</td>
                                                <td className="py-3 px-4 text-xs text-gray-700">{order.amount}</td>
                                                <td className="py-3 px-4 text-xs font-medium">
                                                    <span className={getStatusColor(order.deliveryStatus)}>
                                                        {order.deliveryStatus}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-xs text-gray-700">{order.paymentStatus}</td>
                                            </>
                                        )}
                                        <td className="py-1 px-2 text-xs">
                                            <span
                                                className={`px-3 py-0.5 rounded-full text-xs font-medium ${
                                                    order.refund === "Yes" ? "text-green-500" : "text-red-500"
                                                }`}
                                            >
                                                {order.refund}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <div className="p-2 bg-blue-100 rounded-full cursor-pointer">
                                                    <Eye size={15} color="blue" />
                                                </div>
                                                <div className="p-2 bg-[#e8d8ff] rounded-full cursor-pointer">
                                                    <Download size={15} color="blueviolet" />
                                                </div>
                                                <div className="p-2 bg-red-100 rounded-full cursor-pointer">
                                                    <Trash size={15} color="red" />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    {expandedOrders.includes(order.id) && isBelow1400 && (
                                        <tr>
                                            <td colSpan="10">
                                                <table className="w-full bg-gray-100 p-4 text-sm">
                                                    <tbody>
                                                        <tr>
                                                            <td className="py-2 px-4 font-semibold">Num. of Products</td>
                                                            <td className="py-2 px-4">{order.products}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-2 px-4 font-semibold">Customer</td>
                                                            <td className="py-2 px-4">{order.customer}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-2 px-4 font-semibold">Amount</td>
                                                            <td className="py-2 px-4">{order.amount}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-2 px-4 font-semibold">Delivery Status</td>
                                                            <td className={`py-2 px-4 ${getStatusColor(order.deliveryStatus)}`}>
                                                                {order.deliveryStatus}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-2 px-4 font-semibold">Payment Status</td>
                                                            <td className="py-2 px-4">{order.paymentStatus}</td>
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
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
    </div>
);
};

export default LatestOrders;