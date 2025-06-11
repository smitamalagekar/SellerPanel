import React, { useEffect } from "react";
import { Eye, Trash } from "lucide-react";
import "./Review.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import apiInstance from "../../utils/axios";
import axios from "axios";

export default function PreOrderReviews() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("https://e-commerce-backend-1-0.onrender.com/api/sellerproductreviews");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  // console.log('reviews:', reviews)

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/products/Addreview");
  };

  const handlereview = (e) => {
    e.preventDefault();
    navigate("/products/review-detail");
  };
  const handleDeleteClick = (roleId) => {
    setRoleToDelete(roleId);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async (prodId) => {
    try {
      await axios.delete(`https://e-commerce-backend-1-0.onrender.com/api/sellerproductreviews/delete/${prodId}`);
      setReviews((prev) => prev.filter((review) => review._id !== prodId));
    } catch (err) {
      console.error("Error deleting review:", err);
    }
    setShowDeleteConfirmation(false);
    setRoleToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setRoleToDelete(null);
  };

  const handleRowToggle = (id) => {
    setExpandedRows((prev = []) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold text-gray-800">Product Review</p>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + Add Custom Review
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <select className="px-3 py-2 border rounded text-sm text-gray-700">
          <option>All</option>
        </select>
        <select className="px-3 py-2 border rounded text-sm text-gray-700">
          <option>Filter by Rating</option>
        </select>
        <input
          type="text"
          placeholder="Type Product Name & Hit"
          className="px-3 py-2 border rounded w-full sm:w-auto text-sm text-gray-700"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">Product Name</th>
              <th className="px-3 py-2 hidden md:table-cell">Product Owner</th>
              <th className="px-3 py-2 hidden md:table-cell">Rating</th>
              <th className="px-3 py-2 hidden md:table-cell">Reviews</th>
              <th className="px-3 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <React.Fragment key={review._id}>
                <tr className="border-b">
                  <td
                    onClick={() => handleRowToggle(review._id)}
                    className="px-3 py-2 cursor-pointer font-bold"
                  >
                    {expandedRows.includes(review._id) ? "-" : "+"}
                  </td>
                  <td className="px-3 py-2">{review._id}</td>
                  <td className="px-3 py-2">{review.customReviewerName}</td>
                  <td className="px-3 py-2 hidden md:table-cell">
                    {review.rating}
                  </td>
                  <td className="px-3 py-2 hidden md:table-cell">
                    {review.comment}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-3">
                      <button onClick={handlereview}>
                        <Eye className="text-blue-600" size={18} />
                      </button>
                      <button onClick={() => handleDeleteClick(review._id)}>
                        <Trash className="text-red-600" size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedRows.includes(review._id) && (
                  <tr className="bg-gray-50">
                    <td colSpan="6" className="px-3 py-3">
                      <table className="w-full text-sm">
                        <tbody>
                          <tr>
                            <td className="font-medium w-1/4">Product Owner</td>
                            <td>{review.customReviewerName}</td>
                          </tr>
                          <tr>
                            <td className="font-medium">Rating</td>
                            <td>{review.rating}</td>
                          </tr>
                          <tr>
                            <td className="font-medium">Reviews</td>
                            <td>{review.comment}</td>
                          </tr>
                          <tr>
                            <td className="font-medium">Custom Reviews</td>
                            <td>0</td>
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Delete Confirmation</h2>
              <button
                onClick={cancelDelete}
                className="text-gray-500 hover:text-gray-700"
              >
                X
              </button>
            </div>
            <p className="mb-4">Are you sure you want to delete this?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                onClick={() => confirmDelete(roleToDelete)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
