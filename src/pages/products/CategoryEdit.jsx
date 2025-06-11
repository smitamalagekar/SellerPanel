import { useState, useEffect } from "react";
import { useCategoryContext } from "../../categoryContext";
import api from "../../utils/axios";
import mongoose from "mongoose";
import { useParams, useNavigate } from "react-router-dom";

const CategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categoryData, setCategoryData, setFetchData } = useCategoryContext();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    parentCategory: "",
    orderingNumber: "",
    metaTitle: "",
    metaDescription: "",
    filteringAttributes: [],
    banner: null,
    icon: null,
    coverImage: null
  });
  const [error, setError] = useState(null);

  const categoryTypes = ['Main Category', 'Sub Category'];
  const parentCategories = ['Electronics', 'Clothing', 'Home & Garden', 'None'];
  const attributeOptions = ['Size', 'Fabric', 'Sleeve', 'Wheel', 'Liter'];

  useEffect(() => {
    console.log(id)
    if (id) {
      const currentCategory = categoryData.find(c => c._id === id);
      if (currentCategory) {
        setFormData({
          name: currentCategory.name || "",
          type: currentCategory.type || "",
          parentCategory: currentCategory.parentCategory || "",
          orderingNumber: currentCategory.orderingNumber || "",
          metaTitle: currentCategory.metaTitle || "",
          metaDescription: currentCategory.metaDescription || "",
          filteringAttributes: currentCategory.filteringAttributes || [],
          banner: currentCategory.banner || null,
          icon: currentCategory.icon || null,
          coverImage: currentCategory.coverImage || null
        });
      }
    }
  }, [id, categoryData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0] || prev[name]
    }));
  };

  const handleMultiSelect = (e) => {
    const options = Array.from(e.target.selectedOptions).map(option => option.value);
    setFormData(prev => ({
      ...prev,
      filteringAttributes: options
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {

      console.log(formData)



      await api.put(`categories/Update-category/${id}`, formData);


      alert("Category updated successfully!");
      setFetchData(true)
      navigate("/products/category");
    } catch (err) {
      console.error("Error updating category:", err);
      setError(err.response?.data?.error || "Failed to update category");
    }
  };



  return (
    <div className="max-w-4xl mx-auto m-6 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Edit Category
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type <span className="text-red-500">*</span>
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Type</option>
            {categoryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Parent Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Parent Category
          </label>
          <select
            id="parentCategory"
            name="parentCategory"
            value={formData.parentCategory}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Parent Category</option>
            {parentCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Ordering Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ordering Number
          </label>
          <input
            type="number"
            id="orderingNumber"
            name="orderingNumber"
            value={formData.orderingNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Banner */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Banner{" "}
            <span className="text-xs text-gray-500">
              (Minimum dimensions: 150px × 150px)
            </span>
          </label>
          <input
            type="file"
            id="banner"
            name="banner"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formData.banner && !(formData.banner instanceof File) && (
            <p className="text-sm text-gray-500 mt-1">Current: {formData.banner}</p>
          )}
        </div>

        {/* Icon */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Icon{" "}
            <span className="text-xs text-gray-500">
              (Minimum dimensions: 16px × 16px)
            </span>
          </label>
          <input
            type="file"
            id="icon"
            name="icon"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formData.icon && !(formData.icon instanceof File) && (
            <p className="text-sm text-gray-500 mt-1">Current: {formData.icon}</p>
          )}
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cover Image{" "}
            <span className="text-xs text-gray-500">
              (Minimum dimensions: 260px × 260px)
            </span>
          </label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formData.coverImage && !(formData.coverImage instanceof File) && (
            <p className="text-sm text-gray-500 mt-1">Current: {formData.coverImage}</p>
          )}
        </div>

        {/* Meta Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meta Title
          </label>
          <input
            type="text"
            id="metaTitle"
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Meta Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meta Description
          </label>
          <textarea
            id="metaDescription"
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filtering Attributes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filtering Attributes
          </label>
          <select
            multiple
            id="filteringAttributes"
            name="filteringAttributes"
            value={formData.filteringAttributes}
            onChange={handleMultiSelect}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-auto"
          >
            {attributeOptions.map((attr) => (
              <option key={attr} value={attr}>
                {attr}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Hold Ctrl/Cmd to select multiple options
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryEdit;