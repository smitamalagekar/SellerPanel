import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiInstance from '../../../utils/axios';

const NotificationTypeEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    defaultText: '',
    image: null,
    previewImage: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate=useNavigate()

  // Fetch notification type data from the API
  useEffect(() => {
    const fetchNotificationType = async () => {
      try {
        const response = await apiInstance.get(`/notification/${id}`);
        const data = response.data;
        setFormData({
          name: data.type,
          defaultText: data.defaultText,
          image: null,
          previewImage: data.imageUrl || ''
        });
      } catch (err) {
        setError('Failed to fetch notification type. Please try again.');
      }
    };

    fetchNotificationType();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        previewImage: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const formDataToSend = new FormData();
    formDataToSend.append('type', formData.name);
    formDataToSend.append('defaultText', formData.defaultText);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      await apiInstance.put(`/notification/${id}`, formDataToSend);
      setSuccess('Notification type updated successfully!');
      navigate('/notification/types')
    } catch (err) {
      setError('Failed to update notification type. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Notification Type</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image
            </label>
            <div className="flex items-center">
              <div className="mr-4">
                {formData.previewImage && (
                  <img
                    src={formData.previewImage}
                    alt="Preview"
                    className="h-16 w-16 object-cover rounded"
                  />
                )}
              </div>
              <div className="flex-1">
                <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span>Upload Image</span>
                  <input
                    type="file"
                    className="sr-only"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG, GIF up to 2MB
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="defaultText" className="block text-sm font-medium text-gray-700 mb-2">
              Default Text
            </label>
            <textarea
              id="defaultText"
              name="defaultText"
              rows={4}
              value={formData.defaultText}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationTypeEdit;