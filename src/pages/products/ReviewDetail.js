import React, { useState, useEffect } from 'react';
import { Switch } from "@headlessui/react";
import './ReviewDetail.css';
import { useNavigate } from "react-router-dom";
import apiInstance from "../../utils/axios";

function ReviewDetail() {

  // const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  // const [roleToDelete, setRoleToDelete] = useState(null);

  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();


  // const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await apiInstance.get("/sellerproductreviews");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/products/Addreview");
  };

  // const handlereview = (e) => {
  //   e.preventDefault();
  //   navigate("/products/review-detail");
  // };
  // const handleDeleteClick = (roleId) => {
  //   setRoleToDelete(roleId);
  //   setShowDeleteConfirmation(true);
  // };

  // const confirmDelete = () => {
  //   // Implement your delete logic here
  //   console.log(`Deleting role with ID: ${roleToDelete}`);
  //   setShowDeleteConfirmation(false);
  //   setRoleToDelete(null);
  // };

  // const cancelDelete = () => {
  //   setShowDeleteConfirmation(false);
  //   setRoleToDelete(null);
  // };

  // const handleRowToggle = (id) => {
  //   setExpandedRows((prev) =>
  //     prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
  //   );
  // };


  const [activeTab, setActiveTab] = useState('reviews');


  // const [isPublished, setIsPublished] = useState(true); // Switch state

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Toggle Switch Handler
  const togglePublished = async (reviewId) => {
    try {
      const review = reviews.find((r) => r._id === reviewId);
      const newPublishedStatus = !review.published;

      // Update in database via API
       await apiInstance.put(`/sellerproductreviews/update/${reviewId}`, {
        published: newPublishedStatus,
      });

      // Update local state on success
      setReviews((prevReviews) =>
        prevReviews.map((r) =>
          r._id === reviewId ? { ...r, published: newPublishedStatus } : r
        )
      );
    } catch (err) {
      console.error('Error updating published status:', err);
    }
  };
  


  return (
    <div className="review-detail-container rounded-md border-2">
      <div className="review-header">
        <h2>Detail Reviews</h2>
        <button className="add-review-button submit-btn text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleSubmit}>Add Custom Reviews</button>
      </div>

      <div className="product-review">
        <div className="product-info">
          <img
            src={reviews[0]?.reviewImages[0]}
            alt={reviews[0]?.product}
            className="product-image"
          />
          <div className="product-name ml-2 mb-2">
            {reviews[0]?.product}
          </div>
        </div>
        <div className="rating">
          <span className="rating-label">RATING</span>
          <span className='fiv'>{reviews[0]?.rating}</span>
          <div className="star-rating">
            ★★★★★
          </div>
        </div>
      </div>

      <div className="review-tabs">
        <button
          className={`tab text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ${activeTab === 'reviews' ? 'active text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2' : ''}`}
          onClick={() => handleTabClick('reviews')}
        >
          reviews ({reviews.length})
        </button>
        <button
          className={`tab text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ${activeTab === 'customReviews' ? 'active text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2' : ''}`}
          onClick={() => handleTabClick('customReviews')}
        >
          Custom Reviews ({reviews.length})
        </button>

        <select className="filter-dropdown block w-full max-w-xs px-4 py-2.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ml-auto">
          <option value="">Filter by state</option>
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>

      </div>

      {activeTab === 'reviews' && (
        <div className="review-table-container relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="review-table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">#</th>
                <th scope="col" class="px-6 py-3">CUSTOMER</th>
                <th scope="col" class="px-6 py-3">RATING</th>
                <th scope="col" className="ml-4 px-6 py-3" >COMMENT</th>
                <th scope="col" class="px-6 py-3">PUBLISHED</th>
                <th scope="col" class="px-6 py-3">OPTIONS</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, index) => (
                <tr key={review._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">

                  <td>{index + 1}</td>

                  {/* CUSTOMER */}
                  <td class="px-6 py-4">
                    <div className="review-customer">
                      <img
                        src={review.customReviewerImage
                          || 'https://via.placeholder.com/40'}
                        alt={review.customReviewerName}
                        className="reviewer-image"
                      />
                      <span className="reviewer-name">{review.customReviewerName}</span>
                    </div>
                  </td>

                  {/* RATING */}
                  <td class="px-6 py-4">{review.rating}</td>

                  {/* COMMENT */}
                  <td class="px-6 py-4">{review.comment}</td>

                  {/* PUBLISHED */}
                  <td class="px-6 py-4">
                    <Switch
                      checked={review.published}
                      onChange={() => togglePublished(review._id)}
                      className={`${review.published ? 'bg-green-600' : 'bg-gray-300'
                        } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                    >
                      <span
                        className={`${review.published ? 'translate-x-6' : 'translate-x-1'
                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </Switch>
                  </td>

                  {/* OPTIONS (You can add Edit/Delete buttons here) */}
                  <td class="px-6 py-4">
                    {/* Example option buttons (customize as needed) */}
                    <button className="btn-view text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">View</button>
                    <button className="btn-delete text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


      {activeTab === 'customReviews' && (
        <div className="review-table-container relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="review-table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">#</th>
                <th scope="col" class="px-6 py-3">CUSTOMER</th>
                <th scope="col" class="px-6 py-3">RATING</th>
                <th scope="col" className="ml-4 px-6 py-3" >COMMENT</th>
                <th scope="col" class="px-6 py-3">PUBLISHED</th>
                <th scope="col" class="px-6 py-3">OPTIONS</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, index) => (
                <tr key={review._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">

                  <td>{index + 1}</td>

                  {/* CUSTOMER */}
                  <td class="px-6 py-4">
                    <div className="review-customer">
                      <img
                        src={review.customReviewerImage || 'https://via.placeholder.com/40'}
                        alt={review.customReviewerName}
                        className="reviewer-image"
                      />
                      <span className="reviewer-name">{review.customReviewerName}</span>
                    </div>
                  </td>

                  {/* RATING */}
                  <td class="px-6 py-4">{review.rating}</td>

                  {/* COMMENT */}
                  <td class="px-6 py-4">{review.comment}</td>

                  {/* PUBLISHED */}
                  <td class="px-6 py-4">
                    <Switch
                      checked={review.published}
                      onChange={() => togglePublished(review._id)}
                      className={`${review.published ? 'bg-green-600' : 'bg-gray-300'
                        } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                    >
                      <span
                        className={`${review.published ? 'translate-x-6' : 'translate-x-1'
                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </Switch>
                  </td>

                  {/* OPTIONS (You can add Edit/Delete buttons here) */}
                  <td class="px-6 py-4">
                    {/* Example option buttons (customize as needed) */}
                    <button className="btn-view text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">View</button>
                    <button className="btn-delete text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      )}
    </div>
  );
}

export default ReviewDetail;