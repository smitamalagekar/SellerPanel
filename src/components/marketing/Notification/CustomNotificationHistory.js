import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Eye, Search } from 'lucide-react';
import { DataTable } from '../EmailTemplate/MainPageComponents/DataTable';
import { notificationService } from '../../../services/notificationService';
import NotificationDetailsModal from './NotificationDetailsModal';

const CustomNotificationHistory = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notificationDetails, setNotificationDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const itemsPerPage = 10;

  const notificationTypes = [
    { id: 'all', name: 'All Types' },
    { id: 29, name: 'SALE' },
    { id: 30, name: 'Coupon Sale' },
    { id: 31, name: 'GIFT' },
    { id: 33, name: 'follow up' },
    { id: 84, name: 'admin' },
  ];

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await notificationService.getCustomNotification();
        setNotifications(response);
        setTotalItems(response.length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleViewDetails = async (notification) => {
    try {
      setDetailsLoading(true);
      setSelectedNotification(notification);
      const details = await notificationService.getCustomNotificationById(notification.id);
      setNotificationDetails(details);
    } catch (error) {
      console.error('Error fetching notification details:', error);
      setNotificationDetails(notification);
    } finally {
      setDetailsLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedNotification(null);
    setNotificationDetails(null);
  };

  const columns = [
    {
      key: 'createdAt',
      title: 'Date',
      render: (notification) => format(new Date(notification.createdAt), 'dd MMM yyyy HH:mm'),
    },
    {
      key: 'type',
      title: 'Type',
      render: (notification) => {
        const type = notificationTypes.find((t) => t.id.toString() === notification.type.toString());
        return type ? type.name : 'Unknown';
      },
    },
    {
      key: 'content',
      title: 'Content',
      render: (notification) => (
        <div className="truncate max-w-xs">{notification.content}</div>
      ),
    },
    {
      key: 'recipients',
      title: 'Recipients',
      render: (notification) => notification.customers.length,
    },
    {
      key: 'status',
      title: 'Status',
      render: (notification) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            notification.status === 'sent'
              ? 'bg-green-100 text-green-800'
              : notification.status === 'failed'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {notification.status}
        </span>
      ),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (notification) => (
        <button
          onClick={() => handleViewDetails(notification)}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <Eye className="w-4 h-4 mr-1" /> View
        </button>
      ),
    },
  ];

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || notification.type.toString() === filterType.toString();
    return matchesSearch && matchesType;
  });

  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="px-4 lg:px-6 mx-auto">
      {selectedNotification && (
        <NotificationDetailsModal 
          notification={notificationDetails} 
          onClose={closeModal}
        />
      )}
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">Notification History</h1>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="w-full md:w-auto">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setCurrentPage(1);
                }}
              >
                {notificationTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={paginatedNotifications}
            loading={loading}
            emptyMessage="No notifications found"
          />

          {filteredNotifications.length > itemsPerPage && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-700">
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredNotifications.length)} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredNotifications.length)} of {filteredNotifications.length} notifications
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === 1
                      ? 'bg-gray-200 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage * itemsPerPage >= filteredNotifications.length}
                  className={`px-3 py-1 rounded-md ${
                    currentPage * itemsPerPage >= filteredNotifications.length
                      ? 'bg-gray-200 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomNotificationHistory;