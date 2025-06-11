import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { FaPlus, FaMinus } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
// import apiInstance from "../../utils/axios";

export default function ProductQuery() {
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState([]);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [expanded, setExpanded] = useState(null);

  
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // const response = await apiInstance.get("/sellerproductquery");
        
        const response = await axios.get("https://e-commerce-backend-1-0.onrender.com/api/productquery");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  console.log("Query:", data);

  const handleViewQuery = (userId) => {
    navigate("/product-queries");
  };
  // const handleViewQuery = (userId) => {
  //   navigate("/preorder/query");
  // };

  const toggleRow = (userId) => {
    setExpandedRows((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const renderSkeletonRow = () => (
    <tr className="border-t animate-pulse">
      <td className="px-4 py-3"></td>
      <td className="px-4 py-3">
        <Skeleton width={20} />
      </td>
      <td className="px-4 py-3">
        <Skeleton width={80} />
      </td>
      <td className="px-4 py-3">
        <Skeleton width={160} />
      </td>
      <td className="px-4 py-3">
        <Skeleton width={200} />
      </td>
      <td className="px-4 py-3">
        <Skeleton width={180} />
      </td>
      <td className="px-4 py-3">
        <Skeleton width={100} />
      </td>
      <td className="px-4 py-3">
        <Skeleton circle width={32} height={32} />
      </td>
    </tr>
  );

  const renderMobileSkeleton = () =>
    Array(3)
      .fill(0)
      .map((_, index) => (
        <div
          key={index}
          className="animate-pulse px-4 py-3 border-b border-gray-200"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-gray-200 rounded-full" />
              <Skeleton width={100} />
            </div>
            <Skeleton circle width={32} height={32} />
          </div>
          <div className="space-y-2">
            <Skeleton width="80%" />
            <Skeleton width="60%" />
            <Skeleton width="70%" />
          </div>
        </div>
      ));

  return (
    <div className="p-4">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 animate-pulse">
            {loading ? <Skeleton width={200} /> : "Preorder Queries"}
          </h2>
        </div>

        {!isMobile ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-xs text-gray-700 uppercase font-semibold">
                <tr>
                  <th className="px-4 py-3 w-8"></th>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Product Name</th>
                  <th className="px-4 py-3">Question</th>
                  <th className="px-4 py-3">Reply</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Options</th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array(3)
                      .fill(null)
                      .map((_, index) => (
                        <React.Fragment key={index}>
                          {renderSkeletonRow()}
                        </React.Fragment>
                      ))
                  : data.map((user) => (
                      <tr
                        className="border-t transition-all hover:bg-gray-50"
                        key={user._id}
                      >
                        <td className="px-4 py-3">
                          {/* Remove the toggle button for desktop view */}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-800">
                          {user._id}
                        </td>
                        <td className="px-4 py-3">{user.userName}</td>
                        <td className="px-4 py-3 max-w-xs truncate">
                          {user.productName}
                        </td>
                        <td className="px-4 py-3 max-w-xs truncate">
                          {user.question}
                        </td>
                        <td className="px-4 py-3 max-w-xs truncate text-gray-600">
                          {user.reply}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${
                              user.status === "Replied"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleViewQuery(user._id)}
                            className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <div className="px-4 py-2 bg-gray-100 border-b text-xs font-semibold text-gray-600 uppercase">
              <div className="flex items-center justify-between">
                <span className="ml-12">Name</span>
                <span>Action</span>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {loading
                ? renderMobileSkeleton()
                : data.map((user) => (
                    <div
                      key={user._id}
                      className="bg-white shadow-sm rounded-md my-2"
                    >
                      <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3">
                          <button
                            className="text-blue-600 focus:outline-none"
                            onClick={() => toggleRow(user._id)}
                          >
                            {expandedRows.includes(user._id) ? (
                              <FaMinus />
                            ) : (
                              <FaPlus />
                            )}
                          </button>
                          <span className="font-medium text-gray-800">
                            {user._id}. {user.userName}
                          </span>
                        </div>
                        <button
                          onClick={() => handleViewQuery(user._id)}
                          className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                      {expandedRows.includes(user._id) && (
                        <div className="bg-gray-50 px-4 py-3 space-y-2 text-sm text-gray-700 rounded-b-md">
                          <div className="flex gap-2">
                            <span className="min-w-[90px] font-medium text-gray-600">
                              Product:
                            </span>
                            <span className="flex-1 ">{user.productName}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="min-w-[90px] font-medium text-gray-600">
                              Question:
                            </span>
                            <span className="flex-1">{user.question}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="min-w-[90px] font-medium text-gray-600">
                              Reply:
                            </span>
                            <span className="flex-1 text-gray-600">
                              {user.reply}
                            </span>
                          </div>
                          <div className="flex gap-2 items-center">
                            <span className="min-w-[90px] font-medium text-gray-600">
                              Status:
                            </span>
                            <span
                              className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${
                                user.status === "Replied"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {user.status}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
