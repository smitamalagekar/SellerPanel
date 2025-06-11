import React, { useState, useEffect } from 'react';
import { newsletterService } from '../../../services/newsLetterService';
import { TrashIcon, PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../EmailTemplate/MainPageComponents/DataTable';
// import { StatusToggle } from './EmailTemplate/MainPageComponents/StatusToggle';

const AllNewslettersPage = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all newsletters
  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        setLoading(true);
        const data = await newsletterService.getAllNewsletters();
        setNewsletters(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch newsletters');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

//   const toggleStatus = async (id, currentStatus) => {
//     const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
//     try {
//       await newsletterService.updateNewsletter();
//       setNewsletters((prev) =>
//         prev.map((newsletter) =>
//           newsletter._id === id ? { ...newsletter, status: newStatus } : newsletter
//         )
//       );
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

  // Handle newsletter deletion
  const handleDelete = async (id) => {
    try {
      await newsletterService.deleteNewsletter(id);
      setNewsletters(newsletters.filter(newsletter => newsletter._id !== id));
    } catch (err) {
      console.error('Failed to delete newsletter:', err);
    }
  };

  // Table columns configuration
  const columns = [
    {
      key: 'subject',
      title: 'Subject',
      render: (newsletter) => (
        <span className="font-medium text-gray-900">{newsletter.subject}</span>
      )
    },
    {
      key: 'createdAt',
      title: 'Created At',
      render: (newsletter) => new Date(newsletter.createdAt).toLocaleDateString()
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (newsletter) => (
        <div className="flex space-x-2">
          
          <button
            onClick={() => handleDelete(newsletter._id)}
            className="p-1 text-red-600 hover:text-red-800 transition-colors duration-200"
            title="Delete"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="mx-10 px-4 py-8 ">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Newsletters</h1>
        <button
          onClick={() => navigate('/marketing/news-letter')}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-md transition-all duration-200"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Newsletter
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded-md shadow-sm">
          {error}
        </div>
      )}

      {/* Data Table */}
        <DataTable
          columns={columns}
          data={newsletters}
          loading={loading}
          emptyMessage="No newsletters found. Create one to get started!"
        />
    </div>
  );
};

export default AllNewslettersPage;