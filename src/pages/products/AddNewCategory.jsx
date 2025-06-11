import { useState } from 'react';
import api from "../../utils/axios"
import { useCategoryContext } from '../../categoryContext';

const AddNewCategory = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    parentCategory: '',
    orderingNumber: '',
    banner: null,
    icon: null,
    coverImage: null,
    metaTitle: '',
    metaDescription: '',
    filteringAttributes: []
  });

  const { setFetchData } = useCategoryContext();

  const [preview, setPreview] = useState({
    banner: null,
    icon: null,
    coverImage: null
  });

  const categoryTypes = ['Main Category', 'Sub Category'];
  const parentCategories = ['Electronics', 'Clothing', 'Home & Garden', 'None'];
  const attributeOptions = ['Size', 'Fabric', 'Sleeve', 'Wheel', 'Liter'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      setFormData({
        ...formData,
        [name]: file
      });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview({
          ...preview,
          [name]: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAttributeChange = (e) => {
    const { options } = e.target;
    const selectedOptions = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    setFormData({
      ...formData,
      filteringAttributes: selectedOptions
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/categories/Create-new-category', formData)
      setFetchData(true)
    }
    catch (err) {
      console.log(err)
    }
    alert("Category added")
    console.log(
      formData
    )

  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Category Information</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Type */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Type <span className="text-red-500">*</span>
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Type</option>
            {categoryTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Parent Category */}
        <div>
          <label htmlFor="parentCategory" className="block text-sm font-medium text-gray-700 mb-1">
            Parent Category
          </label>
          <select
            id="parentCategory"
            name="parentCategory"
            value={formData.parentCategory}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Parent Category</option>
            {parentCategories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Ordering Number */}
        <div>
          <label htmlFor="orderingNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Ordering Number
          </label>
          <input
            type="number"
            id="orderingNumber"
            name="orderingNumber"
            value={formData.orderingNumber}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Banner */}
        <div>
          <label htmlFor="banner" className="block text-sm font-medium text-gray-700 mb-1">
            Banner <span className="text-xs text-gray-500">(Minimum dimensions: 150px × 150px)</span>
          </label>
          <input
            type="file"
            id="banner"
            name="banner"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {preview.banner && (
            <div className="mt-2">
              <img src={preview.banner} alt="Banner preview" className="h-32 object-contain border rounded" />
            </div>
          )}
        </div>

        {/* Icon */}
        <div>
          <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
            Icon <span className="text-xs text-gray-500">(Minimum dimensions: 16px × 16px)</span>
          </label>
          <input
            type="file"
            id="icon"
            name="icon"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {preview.icon && (
            <div className="mt-2">
              <img src={preview.icon} alt="Icon preview" className="h-16 object-contain border rounded" />
            </div>
          )}
        </div>

        {/* Cover Image */}
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
            Cover Image <span className="text-xs text-gray-500">(Minimum dimensions: 260px × 260px)</span>
          </label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {preview.coverImage && (
            <div className="mt-2">
              <img src={preview.coverImage} alt="Cover preview" className="h-40 object-contain border rounded" />
            </div>
          )}
        </div>

        {/* Meta Title */}
        <div>
          <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Meta Title
          </label>
          <input
            type="text"
            id="metaTitle"
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Meta Description */}
        <div>
          <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Meta Description
          </label>
          <textarea
            id="metaDescription"
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filtering Attributes */}
        <div>
          <label htmlFor="filteringAttributes" className="block text-sm font-medium text-gray-700 mb-1">
            Filtering Attributes
          </label>
          <select
            multiple
            id="filteringAttributes"
            name="filteringAttributes"
            value={formData.filteringAttributes}
            onChange={handleAttributeChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-auto"
          >
            {attributeOptions.map((attr) => (
              <option key={attr} value={attr}>{attr}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple options</p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewCategory;