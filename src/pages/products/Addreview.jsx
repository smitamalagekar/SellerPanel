import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import "./Addreview.css";
import apiInstance from "../../utils/axios";

import { DataTable } from "../../components/marketing/EmailTemplate/MainPageComponents/DataTable";

const CustomReviewForm = () => {
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [rating, setRating] = useState(0);
  const [dateType, setDateType] = useState("system");
  const [customDate, setCustomDate] = useState("");
  const [fileName, setFileName] = useState("Choose file");
  const [comment, setComment] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState();
  const [reviews, setReviews] = useState([]);
  // const Navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiInstance.get(
          "/sellercategories/Get-all-categories"
        );
        // console.log("Categories API Response:", response.data);
        if (response.data && Array.isArray(response.data)) {
          setCategories(response.data); // Ensure the response is an array
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await apiInstance.get("/sellerproductreviews");
        // console.log("Products API Response:", response.data);
        setProducts(response.data); // Assuming the API returns products in `data.data`
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((prod) => {
    // If the category is empty, include all products
    if (!category) return true;
    // Check if the product's category matches the selected category
    return (
      Array.isArray(prod.category) &&
      prod.category.some((cat) => cat._id === category)
    );
  });

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setFileName(file.name);
      setImage(URL.createObjectURL(file)); // For preview
      // Store the File object in your review data
      setImageFile(file);
    } else {
      setFileName("Choose file");
      setImage(null);
      setImageFile(null);
    }
  };

  console.log(imageFile);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      reviewerName,
      category,
      product,
      rating,
      date:
        dateType === "system"
          ? new Date().toISOString().split("T")[0]
          : customDate,
      comment,
      image: image, // URL for preview
      imageFile: imageFile, // Actual File object for upload
    };

    setReviews([...reviews, newReview]);

    // Reset form
    setReviewerName("");
    setCategory("");
    setProduct("");
    setRating(0);
    setDateType("system");
    setCustomDate("");
    setComment("");
    setFileName("Choose file");
    setImage(null); // Reset the image
  };

  const handleSendReviews = async () => {
    try {
      const formData = new FormData();

      // Add each review with proper array indexing
      reviews.forEach((review, index) => {
        formData.append(`customReviewerName[${index}]`, review.reviewerName);
        formData.append(`category[${index}]`, review.category);
        formData.append(`product[${index}]`, review.product);
        formData.append(`rating[${index}]`, review.rating.toString());
        formData.append(`date[${index}]`, review.date);
        formData.append(`comment[${index}]`, review.comment);

        // If you have an actual File object (not just URL)
        if (review.imageFile) {
          formData.append(`customReviewerImage[${index}]`, review.imageFile);
        }
      });

      const response = await apiInstance.post(
        "sellerproductreviews/create-bulk",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(`${response.data.message}`);
      setReviews([]);
    } catch (error) {
      console.error("Error sending reviews:", error);
      alert("Failed to send reviews. Please try again.");
    }
  };

  console.log("products:", products);

  const columns = [
    { key: "reviewerName", title: "Reviewer Name" },
    { key: "category", title: "Category" },
    { key: "product", title: "Product" },
    { key: "rating", title: "Rating" },
    { key: "date", title: "Date" },
    { key: "comment", title: "Comment" },
    {
      key: "image",
      title: "image",
      render: (review) =>
        review.image ? (
          <img
            src={review.image}
            alt="Review"
            className="h-10 w-10 object-cover rounded"
          />
        ) : (
          "No image"
        ),
    },
  ];

  return (
    <div className="custom-review-container">
      <h2 className="form-title">Add New Custom Review</h2>

      <form
        className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto"
        onSubmit={handleSubmit}
      >
        {/* Reviewer Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Custom Reviewer Name *
          </label>
          <input
            type="text"
            placeholder="Enter reviewer name"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Reviewer Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Custom Reviewer Image
          </label>
          <div className="flex items-center space-x-4">
            <label className="relative cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
              Browse
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>
            <span className="text-sm text-gray-500">{fileName}</span>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Product */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product *
          </label>
          <select
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Product</option>
            {filteredProducts.map((prod) => (
              <option key={prod._id} value={prod._id}>
                {prod.name}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div className="flex items-center">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating *
          </label>
          <div className="flex space-x-2 text-xl">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer ${
                  star <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Date Type Selection */}
        <div className="flex items-center mb-3">
          <div className="flex items-center mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-0">
              Date *
            </label>
            {/* System Date */}
            <input
              id="default-radio-1"
              type="radio"
              name="default-radio"
              value="system"
              checked={dateType === "system"}
              onChange={() => {
                setDateType("system");
                setCustomDate("");
              }}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-radio-1"
              className="ms-2 mb-0 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              System Date
            </label>
          </div>
          <div class="flex items-center mb-4">
            {/* Custom Date */}
            <input
              id="bordered-radio-2"
              type="radio"
              name="bordered-radio"
              value="custom"
              checked={dateType === "custom"}
              onChange={() => setDateType("custom")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="bordered-radio-2"
              className="ms-2 mb-0 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Select
            </label>
          </div>
        </div>

        {/* Custom Date Input */}
        {dateType === "custom" && (
          <div>
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Comment *
          </label>
          <textarea
            rows="4"
            placeholder="Your review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Add Review
          </button>
        </div>
      </form>

      <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800">
        Review Table
      </h3>

      <div className="bg-white shadow rounded-lg p-4">
        <DataTable columns={columns} data={reviews} loading={false} />
      </div>

      <button
        onClick={handleSendReviews}
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300"
      >
        Send Reviews
      </button>
    </div>
  );
};

export default CustomReviewForm;
