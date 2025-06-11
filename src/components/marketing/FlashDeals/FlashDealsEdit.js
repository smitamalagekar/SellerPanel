import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Save, Upload, X } from 'lucide-react';
import apiInstance from '../../../utils/axios';

const FlashDealEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    start_date: '',
    end_date: '',
    status: 1,
    featured: 0,
    background_color: '#FFFFFF',
    text_color: '#000000',
    banner: null,
    banner_preview: '',
    products: [],
  });

  // Fetch flash deal data
  useEffect(() => {
    const fetchFlashDeal = async () => {
      try {
        const response = await apiInstance.get(`flash-deals/${id}`);
        const deal = response.data;
        
        setFormData({
          title: deal.title,
          start_date: deal.startDate.split('T')[0],
          end_date: deal.endDate.split('T')[0],
          status: deal.status ? 1 : 0,
          featured: deal.featured ? 1 : 0,
          background_color: deal.backgroundColor || '#FFFFFF',
          text_color: deal.textColor || '#000000',
          banner_preview: deal.banner || '',
          products: deal.products.map(p => ({
            id: p.productId,
            name: p.name,
            discount: p.discount,
            discount_type: p.discountType || 'percent'
          }))
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching flash deal:', error);
        setLoading(false);
      }
    };

    fetchFlashDeal();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        banner: file,
        banner_preview: URL.createObjectURL(file)
      }));
    }
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index][field] = value;
    setFormData(prev => ({
      ...prev,
      products: updatedProducts
    }));
  };

  const addProduct = () => {
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, { id: '', name: '', discount: 0, discount_type: 'percent' }]
    }));
  };

  const removeProduct = (index) => {
    const updatedProducts = [...formData.products];
    updatedProducts.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      products: updatedProducts
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formattedData = {
        title: formData.title,
        banner: formData.banner_preview, // Existing URL or will be replaced by new upload
        startDate: new Date(formData.start_date).toISOString(),
        endDate: new Date(formData.end_date).toISOString(),
        status: formData.status === 1,
        featured: formData.featured === 1,
        backgroundColor: formData.background_color,
        textColor: formData.text_color,
        products: formData.products.map(p => ({
          productId: p.id,
          name: p.name,
          discount: parseFloat(p.discount),
          discountType: p.discount_type
        }))
      };

      // Create FormData if we have a new banner file
      let requestData;
      if (formData.banner) {
        const formDataObj = new FormData();
        formDataObj.append('banner', formData.banner);
        Object.keys(formattedData).forEach(key => {
          if (key !== 'banner') {
            formDataObj.append(key, JSON.stringify(formattedData[key]));
          }
        });
        requestData = formDataObj;
      } else {
        requestData = formattedData;
      }

      await apiInstance.put(`flash-deals/${id}`, requestData);

      alert('Flash deal updated successfully!');
      navigate('/marketing/flash-deal');
    } catch (error) {
      console.error('Error updating flash deal:', error);
      alert('Failed to update flash deal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="container px-4 py-6 flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 w-full max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">Basic Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

          </div>

          {/* Banner Image */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">Banner Image (2000x500)</h2>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
              {formData.banner_preview ? (
                <div className="relative">
                  <img
                    src={formData.banner_preview}
                    alt="Banner Preview"
                    className="max-h-48 mx-auto"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, banner: null, banner_preview: '' }))}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <Upload size={48} className="text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-3">Drag & drop your image here</p>
                  <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    Choose File
                  </label>
                  <p className="text-xs text-gray-500 mt-2">File Format: jpg, jpeg, png</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-2 mb-4">Add Products</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formData.products.map((product, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={product.id}
                        onChange={(e) => handleProductChange(index, 'id', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Product</option>
                        <option value="1">Wireless Headphones</option>
                        <option value="2">Smart Watch</option>
                        <option value="3">Bluetooth Speaker</option>
                        <option value="4">Fitness Tracker</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={product.discount}
                        onChange={(e) => handleProductChange(index, 'discount', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={product.discount_type}
                        onChange={(e) => handleProductChange(index, 'discount_type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="percent">Percent (%)</option>
                        <option value="amount">Amount (Fixed)</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => removeProduct(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={addProduct}
            className="mt-4 flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <Plus size={18} className="mr-2" />
            Add Product
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            <Save size={18} className="mr-2" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlashDealEdit;