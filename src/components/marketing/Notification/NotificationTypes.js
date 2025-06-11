import { useState, useEffect } from 'react';
import apiInstance from '../../../utils/axios';
import {  Edit2, Trash2, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotificationTypes = () => {
  const [activeTab, setActiveTab] = useState('customer');
  const [notificationTypes, setNotificationTypes] = useState([]);
  const [newNotification, setNewNotification] = useState({
    type: '',
    defaultText: '',
    image: null,
    status: true
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await apiInstance.get("/notification");
        console.log(response.data)
        setNotificationTypes(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotification(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setNewNotification(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleAddNotification = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('type', newNotification.type);
    formData.append('defaultText', newNotification.defaultText);
    formData.append('status', newNotification.status ? 'active' : 'inactive');
    if (newNotification.image) formData.append('image', newNotification.image);

    try {
      const response = await apiInstance.post('/notification', formData);
      setNotificationTypes([...notificationTypes, response.data.notification]);
      setNewNotification({
        type: '',
        defaultText: '',
        image: null,
        status: true
      });
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };

  const toggleStatus = async (id) => {
    const notification = notificationTypes.find(item => item.id === id);
    const updatedStatus = notification.status === 'active' ? 'inactive' : 'active';

    try {
      const response = await apiInstance.put(`/notification/${id}`, { status: updatedStatus });
      setNotificationTypes(notificationTypes.map(item =>
        item.id === id ? response.data.notification : item
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      console.log('Deleting notification with id:', id); // Debugging log
      
      const response=await apiInstance.delete(`/notification/${id}`);
      setNotificationTypes(notificationTypes.filter(item => item._id !== id));
      return response.data;

    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  };
  const filteredNotifications = notificationTypes.filter(item =>
    item.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar (Top) */}
      <div className="lg:hidden bg-white shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Notification Types</h2>
        <p className="text-sm text-gray-500 mb-6">Default notification types can not be deleted.</p>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Type & Enter"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          <button
            className={`px-3 py-2 rounded-md whitespace-nowrap ${activeTab === 'customer' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => handleTabChange('customer')}
          >
            Customer
          </button>
          <button
            className={`px-3 py-2 rounded-md whitespace-nowrap ${activeTab === 'seller' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => handleTabChange('seller')}
          >
            Seller
          </button>
          <button
            className={`px-3 py-2 rounded-md whitespace-nowrap ${activeTab === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => handleTabChange('admin')}
          >
            Admin
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="lg:flex">
        {/* Desktop Sidebar (Left) */}
        <div className="hidden lg:block w-64 bg-white shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Notification Types</h2>
          <p className="text-sm text-gray-500 mb-6">Default notification types can not be deleted.</p>
          
          <div className="mb-6">
            <input
              type="text"
              placeholder="Type & Enter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${activeTab === 'customer' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              onClick={() => handleTabChange('customer')}
            >
              Customer Notifications
            </button>
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${activeTab === 'seller' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              onClick={() => handleTabChange('seller')}
            >
              Seller Notifications
            </button>
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${activeTab === 'admin' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              onClick={() => handleTabChange('admin')}
            >
              Admin Notifications
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6">
          {/* Notification List */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 lg:mb-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">Image</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">Default Text</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredNotifications.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                        {item.image ? (
                          <img src={item.image} alt={item.type} className="h-10 w-10 rounded-full" />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <ImageIcon className="text-gray-400 h-5 w-5" />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sm:px-6">{item.type}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 sm:px-6">{item.defaultText}</td>
                      <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                        <button
                          onClick={() => toggleStatus(item.id)}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                        >
                          {item.status === 'active' ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium sm:px-6">
                       <Link to={`/marketing/notification/edit/${item._id}`}>
                       <button className="text-blue-600 hover:text-blue-900 mr-4">
                          <Edit2 className="h-4 w-4" />
                        </button>
                       </Link>
                        {!item.isDefault && (
                          <button 
                            onClick={() => deleteNotification(item._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Add Notification Form (Bottom) */}
          <div className="lg:hidden bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">Add New Notification Type</h2>
            <form onSubmit={handleAddNotification}>
              <div className="space-y-4">
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
                  <select
                    name="userType"
                    value={newNotification.userType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="customer">Customer</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                  </select>
                </div> */}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <input
                    type="text"
                    name="type"
                    value={newNotification.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image (36x36)</label>
                  <div className="flex items-center">
                    <label className="flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                      Browse
                      <input
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </label>
                    <span className="ml-3 text-sm text-gray-500 truncate max-w-[120px]">
                      {newNotification.image ? newNotification.image.name : 'No file chosen'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default Text *</label>
                  <textarea
                    name="defaultText"
                    value={newNotification.defaultText}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    required
                    placeholder="(Best within 80 characters)"
                  />
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Add Notification Type
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Desktop Add Notification Form (Right) */}
        <div className="hidden lg:block w-80 bg-white rounded-lg shadow-md p-6 h-fit sticky top-6 ml-6">
          <h2 className="text-lg font-semibold mb-4">Add New Notification Type</h2>
          <form onSubmit={handleAddNotification}>
            <div className="space-y-4">
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
                <select
                  name="userType"
                  value={newNotification.userType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="customer">Customer</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
              </div> */}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                <input
                  type="text"
                  name="type"
                  value={newNotification.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image (36x36)</label>
                <div className="flex items-center">
                  <label className="flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                    Browse
                    <input
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                  <span className="ml-3 text-sm text-gray-500 truncate">
                    {newNotification.image ? newNotification.image.name : 'No file chosen'}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Text *</label>
                <textarea
                  name="defaultText"
                  value={newNotification.defaultText}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                  placeholder="(Best within 80 characters)"
                />
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add Notification Type
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NotificationTypes;