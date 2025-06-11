import React, { useState, useEffect } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
// import apiInstance from "../../../utils/axios";
import axios from "axios";

const Conversations = () => {
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [expandedConversationId, setExpandedConversationId] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get("https://e-commerce-backend-1-0.onrender.com/api/sellerconversations");
        setConversations(res.data);
        // console.log("Conversations:", res.data);
      } catch (err) {
        console.error("Error fetching conversations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const handleExpand = (id) => {
    setExpandedConversationId(expandedConversationId === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl md:text-2xl mb-6">PreOrder Conversations</h2>

      <div className="overflow-x-auto bg-white shadow-sm rounded-lg border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 md:hidden"></th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3 hidden md:table-cell">Title</th>
              <th className="px-4 py-3 hidden md:table-cell">Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="px-4 py-4 md:hidden"></td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="w-24 h-4 bg-gray-200 rounded"></div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="w-20 h-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <div className="w-48 h-4 bg-gray-200 rounded mb-1"></div>
                    <div className="w-32 h-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <div className="w-16 h-4 bg-gray-200 rounded"></div>
                  </td>
                </tr>
              ))
            ) : (
              conversations.map((item) => (
                <React.Fragment key={item._id}>
                  <tr
                    className="md:hover:bg-gray-50 md:transition md:cursor-pointer"
                    onClick={() => handleExpand(item._id)}
                  >
                    <td className="px-4 py-4 md:hidden w-6 text-gray-500">
                      {expandedConversationId === item._id ? (
                        <FiMinus className="h-5 w-5" />
                      ) : (
                        <FiPlus className="h-5 w-5" />
                      )}
                    </td>
                    <td className="px-4 py-4 flex items-center gap-4 whitespace-nowrap">
                      <img
                        src={item.avatar || "https://via.placeholder.com/40"}
                        alt={item.name || "User"}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <span className="font-medium text-gray-800">
                        {item.name || "Anonymous"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                      {new Date(item.time).toLocaleString()}
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell text-gray-900 font-semibold max-w-xs truncate">
                      {item.title}
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell text-gray-600">
                      {item.message}
                    </td>
                  </tr>
                  {expandedConversationId === item._id && (
                    <tr className="md:hidden bg-gray-50">
                      <td colSpan="3" className="py-4 px-6 space-y-3">
                        <div className="flex justify-between items-start gap-4">
                          <span className="font-semibold text-gray-700 w-24 shrink-0">
                            Title:
                          </span>
                          <span className="text-gray-900 break-all">
                            {item.title}
                          </span>
                        </div>
                        <div className="flex justify-between items-start gap-4">
                          <span className="font-semibold text-gray-700 w-24 shrink-0">
                            Description:
                          </span>
                          <span className="text-gray-600 break-words">
                            {item.message}
                          </span>
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
    </div>
  );
};

export default Conversations;
