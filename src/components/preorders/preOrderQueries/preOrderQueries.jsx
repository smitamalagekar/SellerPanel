import { Eye } from "lucide-react";
// import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
// import { FaPlus, FaMinus } from "react-icons/fa";
import axios from "axios";
// import apiInstance from '../../../utils/axios'
import "./preOrderQueries.scss";

export default function PreOrderQueries() {
 
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  // const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // eslint-disable-next-line no-unused-vars
  const [expandedRows, setExpandedRows] = useState([]);

  const [queries, setQueries] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const res = await axios.get(
          "https://e-commerce-backend-1-0.onrender.com/api/sellerpreorder-queries"
        );
        // const res = await apiInstance.get(
        //   "/sellerpreorder-queries"
        // );
        console.log("Fetched queries:", res.data); // ✅ Confirm it's an array

        // Check if the response is an array or object
        if (Array.isArray(res.data)) {
          setQueries(res.data);
        } else if (Array.isArray(res.data.data)) {
          setQueries(res.data.data);
        } else {
          console.error("Unexpected API format:", res.data);
        }
      } catch (err) {
        console.error("Error fetching preorder queries:", err);
      }
    };

    fetchQueries();
  }, []);

  const handleReplySubmit = async (id) => {
    if (!replyText.trim()) return;

    try {
      await axios.put(
        `https://e-commerce-backend-1-0.onrender.com/api/sellerpreorder-queries/${id}/reply`,
        {
          reply: replyText,
          status: "Replied",
        }
      );

      // Update state
      setQueries((prev) =>
        prev.map((q) =>
          q._id === id ? { ...q, reply: replyText, status: "Replied" } : q
        )
      );

      setReplyText("");
      setEditingId(null);
    } catch (err) {
      console.error("Failed to submit reply:", err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  // eslint-disable-next-line no-unused-vars
  const users = [
    {
      id: 1,
      name: "Ketaki",
      prodName: "Hummer EV 2025 | Experience unmatched power and innovation...",
      question: "Suitable for entrepreneurs launching a new store...",
      reply: "You will get official warranty from Apple.",
      status: "Not Replied",
    },
    // ... more sample data
  ];

  // const handleViewQuery = (userId) => {
  //   navigate("/preorder/query");
  // };

  // const toggleRow = (userId) => {
  //   setExpandedRows((prev) =>
  //     prev.includes(userId)
  //       ? prev.filter((id) => id !== userId)
  //       : [...prev, userId]
  //   );
  // };

   // eslint-disable-next-line no-unused-vars
  const SkeletonRow = () => (
    <tr className="skeleton-row">
      <td>{isMobile && <div className="skeleton skeleton-icon" />}</td>
      <td>
        <div className="skeleton skeleton-id" />
      </td>
      <td>
        <div className="skeleton skeleton-text short" />
      </td>
      {!isMobile && (
        <td>
          <div className="skeleton skeleton-text long" />
        </td>
      )}
      {!isMobile && (
        <td>
          <div className="skeleton skeleton-text long" />
        </td>
      )}
      {!isMobile && (
        <td>
          <div className="skeleton skeleton-text long" />
        </td>
      )}
      {!isMobile && (
        <td>
          <div className="skeleton skeleton-badge" />
        </td>
      )}
      <td>
        <div className="skeleton skeleton-icon" />
      </td>
    </tr>
  );

  return (
    <div className="productQueriesBox ma10">
      <div className="allCustomersLowerBox productQueries">
        <div className="allCustomersLowerHeader">
          <p className="customersText">Preorder Queries</p>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Product Name</th>
                <th>Question</th>
                <th>Reply</th>
                <th>Status</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(queries) && queries.length > 0 ? (
                queries.map((query, index) => (
                  <tr key={query._id}>
                    <td>{index + 1}</td>
                    <td>{query.userName}</td>
                    <td className="prodNameQuery">{query.productName}</td>
                    <td className="prodNameQuery">{query.question}</td>

                    <td className="prodNameQuery">
                      {editingId === query._id ? (
                        <div>
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="replyTextArea"
                          />
                          <button
                            className="saveReplyBtn"
                            onClick={() => handleReplySubmit(query._id)}
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        query.reply || "Not replied yet"
                      )}
                    </td>

                    <td>
                      <span
                        className={
                          query.reply ? "badge badgeVerified" : "badge"
                        }
                      >
                        {query.reply ? "Replied" : "Not Replied"}
                      </span>
                    </td>

                    <td>
                      <div
                        className="action"
                        onClick={() => {
                          setEditingId(query._id);
                          setReplyText(query.reply || "");
                        }}
                        title="Reply"
                      >
                        <Eye color="blue" size={18} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No queries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
