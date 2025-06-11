import React from 'react';
import { format } from 'date-fns';
import { X } from 'lucide-react';

const NotificationDetailsModal = ({ notification, onClose }) => {
  if (!notification) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-bold">Notification Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Date</p>
              <p className="mt-1">{format(new Date(notification.createdAt), 'dd MMM yyyy HH:mm')}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Type</p>
              <p className="mt-1">{notification.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p className="mt-1">
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
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Recipients</p>
              <p className="mt-1">{notification.customers.length}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500">Content</p>
            <div className="mt-1 p-3 bg-gray-50 rounded-md">
              <p className="whitespace-pre-wrap">{notification.content}</p>
            </div>
          </div>
          
          {notification.customers.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-500">Recipient Details</p>
              <div className="mt-2 border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {notification.customers.map((customer, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{customer.name}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{customer.email}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{customer.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <div className="border-t p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetailsModal;