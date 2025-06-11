import React, { useState, useEffect } from "react";
import apiInstance from "../../../utils/axios";
import { Clock, Plus, Edit2, Trash2, X, Image } from "lucide-react";
import ProductTable from "../../reports/ProductTable";
import { Link } from "react-router-dom";

const FlashDeals = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [flashDeals, setFlashDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchFlashDeals = async () => {
      try {
        const response = await apiInstance.get("/flash-deals");
        setFlashDeals(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flash deals:", error);
        setLoading(false);
      }
    };

    fetchFlashDeals();
  }, []);

  const filteredDeals = flashDeals.filter((deal) => {
    const matchesSearch = deal.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "all" || deal.status.toLowerCase() === activeTab;
    return matchesSearch && matchesTab;
  });

  const featuredBadge = (featured) => {
    return featured ? (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        Featured
      </span>
    ) : null;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const columns = [
    {
      header: "Banner",
      accessor: (item) => (
        <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
          {item.banner ? (
            <img
              src={item.banner}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <Image className="w-6 h-6 text-gray-400" />
          )}
        </div>
      ),
    },
    {
      header: "Title",
      accessor: (item) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{item.title}</span>
          <div className="mt-1">{featuredBadge(item.featured)}</div>
        </div>
      ),
    },
    {
      header: "Start Date",
      accessor: (item) => (
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1 text-gray-400" />
          {formatDate(item.startDate)}
        </div>
      ),
    },
    {
      header: "End Date",
      accessor: (item) => (
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1 text-gray-400" />
          {formatDate(item.endDate)}
        </div>
      ),
    },
    {
      header: "Status",
      accessor: (item) => (
        <div className="flex flex-row space-x-2">
          <div className="toggle-item flex items-center">
            <label className="switch">
              <input
                type="checkbox"
                defaultChecked={item.status === "Active"}
                onChange={(e) => {
                  // Handle the toggle logic for "Publish"
                  console.log(
                    `Publish toggled for ${item.title}:`,
                    e.target.checked
                  );
                }}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      ),
    },
    {
      header: "Feature",
      accessor: (item) => (
        <div className="flex flex-row space-x-2">
          <div className="toggle-item flex items-center">
            <label className="switch">
              <input
                type="checkbox"
                defaultChecked={item.featured}
                onChange={(e) => {
                  // Handle the toggle logic for "Feature"
                  console.log(
                    `Feature toggled for ${item.title}:`,
                    e.target.checked
                  );
                }}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      ),
    },

    {
      header: "Page Link",
      accessor: (item) => (
        <a
          href={`/flash-deals/${item.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View Deal
        </a>
      ),
    },
    {
      header: "Actions",
      accessor: (item) => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-900">
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="text-red-600 hover:text-red-900"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Flash Deals</h2>
          <p className="text-sm text-gray-500">
            Create and manage limited-time offers
          </p>
        </div>
        <Link
          to="create"
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Flash Deal
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <button
            onClick={() => {
              setActiveTab("all");
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "all"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            All Deals
          </button>
          <button
            onClick={() => {
              setActiveTab("active");
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => {
              setActiveTab("upcoming");
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "upcoming"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => {
              setActiveTab("expired");
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "expired"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            Expired
          </button>
        </div>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search deals..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Product Table */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ProductTable
          columns={columns}
          data={filteredDeals}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Add Deal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Add New Flash Deal
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* ... (rest of the modal content remains the same) ... */}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Delete Flash Deal
                </h3>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete this flash deal? This action
                cannot be undone.
              </p>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashDeals;
