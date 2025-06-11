import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon, Plus, X, Clock, Star, Link as LinkIcon } from 'lucide-react';
import apiInstance from '../../../utils/axios';

const FlashDealCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    banner: null,
    startDate: '',
    endDate: '',
    products: ["aaa"],
    status: true,
    featured: false,
    pageLink: ''
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

    // Fetch products for dropdown (you'll need to implement this API)
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await apiInstance.get('/products');
  //       setProducts(response.data);
  //     } catch (err) {
  //       console.error('Error fetching products:', err);
  //     }
  //   };
  //   fetchProducts();
  // }, []);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, banner: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleProductSelect = (e) => {
    const selectedProductId = e.target.value;
    if (selectedProductId && !formData.products.includes(selectedProductId)) {
      setFormData({
        ...formData,
        products: [...formData.products, selectedProductId]
      });
    }
  };

  const removeProduct = (productId) => {
    setFormData({
      ...formData,
      products: formData.products.filter(id => id !== productId)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('title', formData.title);
      if (formData.banner) data.append('banner', formData.banner);
      data.append('startDate', new Date(formData.startDate).toISOString());
      data.append('endDate', new Date(formData.endDate).toISOString());
      data.append('status', formData.status);
      data.append('featured', formData.featured);
      data.append('pageLink', formData.pageLink);
      formData.products.forEach(product => data.append('products[]', product));

       const response=await apiInstance.post('/flash-deals', data);

      if (response.status === 201) {
        navigate('marketing/flash-deal');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create flash deal');
      console.error('Error creating flash deal:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/marketing/flash-deal')}
              className="mr-4 p-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold">Create New Flash Deal</h2>
              <p className="text-blue-100">Set up a time-limited promotional offer</p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-6 p-4 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Flash Deal Information Section */}
          <div className="mb-8">
          </div>
            <div className="flex items-center mb-6">
              <div className="w-1.5 h-8 bg-blue-600 rounded-full mr-3"></div>
              <h3 className="text-xl font-semibold text-gray-800">Flash Deal Information</h3>
            </div>
            
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="e.g. End of Season Sale"
                  required
                />
              </div>

              {/* Banner Image */}
              <div>
                <label htmlFor="banner" className="block text-sm font-medium text-gray-700 mb-2">
                  Banner <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {previewImage ? (
                    <div className="relative group">
                      <img 
                        src={previewImage} 
                        alt="Banner preview" 
                        className="h-48 w-full object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(null);
                          setFormData({ ...formData, banner: null });
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md text-gray-600 hover:text-red-500 hover:bg-gray-50 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg"></div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                        <ImageIcon className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-1 text-sm text-gray-500">
                          <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-400">
                          PNG, JPG, GIF (Minimum 436px × 443px)
                        </p>
                      </div>
                      <input
                        id="banner"
                        name="banner"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        required
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Clock className="w-5 h-5" />
                    </div>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Clock className="w-5 h-5" />
                    </div>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      min={formData.startDate}
                      className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Products */}
              <div>
                <label htmlFor="products" className="block text-sm font-medium text-gray-700 mb-2">
                  Products
                </label>
                <div className="flex gap-3">
                  <select
                    id="products"
                    name="products"
                    onChange={handleProductSelect}
                    className="flex-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select products to include</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name} (${product.price})
                      </option>
                    ))}
                  </select>
                  
                </div>
                
                {/* Selected Products */}
                {formData.products.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Products ({formData.products.length}):</h4>
                    <ul className="space-y-2">
                      {formData.products.map(productId => {
                        const product = products.find(p => p.id === productId);
                        return (
                          <li key={productId} className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                            <span className="text-gray-800">
                              {product?.name || `Product ID: ${productId}`}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeProduct(productId)}
                              className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                <p className="mt-2 text-xs text-gray-500">
                  <span className="font-medium">Note:</span> Existing product discounts will be replaced by this flash deal.
                </p>
              </div>

              {/* Status and Featured */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <div className="flex items-center h-5">
                    <input
                      id="status"
                      name="status"
                      type="checkbox"
                      checked={formData.status}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <label htmlFor="status" className="ml-3 text-sm text-gray-700">
                    <span className="font-medium">Active Status</span>
                    <p className="text-xs text-gray-500">Make this deal visible to customers</p>
                  </label>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center h-5">
                    <input
                      id="featured"
                      name="featured"
                      type="checkbox"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <label htmlFor="featured" className="ml-3 text-sm text-gray-700">
                    <span className="font-medium">Featured Deal</span>
                    <p className="text-xs text-gray-500">Highlight this deal on homepage</p>
                  </label>
                </div>
              </div>

              {/* Page Link */}
              <div>
                <label htmlFor="pageLink" className="block text-sm font-medium text-gray-700 mb-2">
                  Page Link
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <LinkIcon className="w-5 h-5" />
                  </div>
                  <input
                    type="url"
                    id="pageLink"
                    name="pageLink"
                    value={formData.pageLink}
                    onChange={handleChange}
                    placeholder="https://example.com/flash-sale"
                    className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/flash-deals')}
              className="px-6 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                'Create Flash Deal'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlashDealCreate;