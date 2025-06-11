import React, { useEffect, useState, useRef } from "react";
import { MoreHorizontal, FileText, Download, Link, Trash2 } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
// import apiInstance from '../../../utils/axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FileListPage = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("https://e-commerce-backend-1-0.onrender.com/api/selleruploads");
        const data = await response.json();
        const formattedFiles = data.map((file) => ({
          id: file._id,
          name: file.originalName || "Unknown File",
          size: file.size ? `${(file.size / 1024).toFixed(2)} KB` : "Unknown Size",
          img: file.path
            ? `${file.path.replace(/\\/g, "/")}`
            : "default-image-path.jpg", // Provide a default image path
        }));
        setFiles(formattedFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedFiles(!selectAll ? files.map((file) => file.id) : []);
  };

  const handleCheckboxChange = (id) => {
    setSelectedFiles((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((fileId) => fileId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDropdownToggle = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const hiddenFileInput = useRef(null);

  const handleUploadClick = () => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await fetch("https://e-commerce-backend-1-0.onrender.com/api/selleruploads/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        console.error("Upload failed:", result.error);
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      const response = await fetch(`https://e-commerce-backend-1-0.onrender.com/api/selleruploads/${id}`, {
        method: 'DELETE',
      });
       
      

      if (response.ok) {
        setFiles(prevFiles => prevFiles.filter(file => file.id !== id)); // Update UI
      } else {
        const error = await response.json();
        alert(error.message || "Error deleting file");
      }
    } catch (err) {
      alert("Server error: " + err.message);
    }
  };

  const [copying, setCopying] = useState(false);

  const copyFileLink = async (fileId) => {
    if (copying) return;

    setCopying(true);
    try {
      const response = await axios.get(`https://e-commerce-backend-1-0.onrender.com/api/selleruploads/${fileId}/url`);
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to get file URL');
      }

      await navigator.clipboard.writeText(response.data.url);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error(error.message || 'Failed to copy link');
      console.error('Copy error:', error);
    } finally {
      setCopying(false);
    }
  };

  // In your React component
  const downloadFile = async (fileId, fileName) => {
    try {
      const link = document.createElement('a');
      link.href = `https://e-commerce-backend-1-0.onrender.com/api/selleruploads/${fileId}/download`;
      link.setAttribute('download', fileName);

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);

      toast.success('Download started!');

    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file');
    }
  };

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedFileDetails, setSelectedFileDetails] = useState(null);

  const handleDetailInfo = async (fileId) => {
    try {
      const response = await axios.get(`https://e-commerce-backend-1-0.onrender.com/api/selleruploads/${fileId}/details`);

      if (response.data.success) {
        setSelectedFileDetails(response.data.file);
        setIsDetailModalOpen(true);
      } else {
        toast.error(response.data.error || 'Failed to get file details');
      }
    } catch (error) {
      console.error('Detail info error:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to get file details');
    }
  };

  const FileDetailModal = ({ file, onClose }) => {
    if (!file) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">File Details</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">File Name</h4>
              <p className="mt-1 text-sm text-gray-900 break-all">{file.originalName}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">File Size</h4>
              <p className="mt-1 text-sm text-gray-900">
                {file.size} bytes ({formatBytes(file.size)})
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Uploaded At</h4>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(file.uploadedAt).toLocaleString()}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">File Type</h4>
              <p className="mt-1 text-sm text-gray-900">{file.mimetype || 'Unknown'}</p>
            </div>

            {file.s3Metadata && (
              <>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Storage Location</h4>
                  <p className="mt-1 text-sm text-gray-900">AWS S3</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Last Modified</h4>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(file.s3Metadata.lastModified).toLocaleString()}
                  </p>
                </div>
              </>
            )}

            <div className="pt-4 border-t border-gray-200">
              <a
                href={file.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Full File
              </a>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Helper function to format bytes
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }


  return (
    <div className="p-4 max-w-full overflow-x-hidden mt-7">
      <ToastContainer position="bottom-right" autoClose={3000} />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <h2 className="text-xl font-semibold ">All uploaded files</h2>
        <button
          onClick={handleUploadClick}
          className="bg-[#2d254c] text-white px-4 py-2 text-sm rounded w-full md:w-auto"
        >
          Upload New File
        </button>

        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      <div className="border rounded p-4 md:p-6 bg-white overflow-x-auto">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 w-full">
          <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
            <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1 justify-between">
              <div className="flex items-center justify-between w-full md:w-auto">
                <h3 className="text-lg font-medium">All files</h3>
                <div className="flex items-center space-x-2 md:ml-6">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                    className="form-checkbox"
                  />
                  <span className="text-sm">Select All</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <select className="border px-3 py-2 rounded text-sm sm:w-32 hover:border-blue-500 w-full">
                  <option>Bulk Action</option>
                </select>
                <select className="border px-3 py-2 rounded text-sm sm:w-32 hover:border-blue-500 w-full">
                  <option>Sort by newest</option>
                </select>
                <div className="flex gap-2 w-full">
                  <input type="text" placeholder="Search your files" className="border px-3 py-2 rounded text-sm w-full" />
                  <button className="bg-[#2d254c] text-white px-4 py-2 text-sm rounded whitespace-nowrap">Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-8">
          {loading ? (
            Array.from({ length: 15 }).map((_, index) => (
              <div key={index} className="border rounded-lg shadow p-2 relative group">
                <div className="absolute top-2 left-2">
                  <Skeleton circle width={20} height={20} />
                </div>
                <div className="p-2 flex flex-col items-center text-center">
                  <Skeleton className="h-24 w-24 mb-2" />
                  <Skeleton width={100} />
                  <Skeleton width={60} />
                </div>
                <div className="absolute top-2 right-2">
                  <Skeleton circle width={20} height={20} />
                </div>
              </div>
            ))
          ) : (
            files.map((file) => (
              <div key={file.id} className="border rounded-lg shadow p-2 relative group">
                <input
                  type="checkbox"
                  checked={selectedFiles.includes(file.id)}
                  onChange={() => handleCheckboxChange(file.id)}
                  className="absolute top-2 left-2"
                />
                <div className="p-2 flex flex-col items-center text-center">
                  <img src={file.img} alt={file.name} className="h-24 object-contain mb-2 max-w-full" />
                  <p className="text-sm font-medium truncate w-full">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.size}</p>
                </div>
                <button className="absolute top-2 right-2 text-gray-500" onClick={() => handleDropdownToggle(file.id)}>
                  <MoreHorizontal className="w-5 h-5" />
                </button>
                {dropdownOpen === file.id && (
                  <div className="absolute top-8 right-2 bg-white border rounded shadow-md p-2 z-10 w-40 text-left">
                    <button
                      className="flex items-center space-x-2 py-1 hover:bg-gray-100 px-2 rounded w-full"
                      onClick={() => handleDetailInfo(file.id)}
                    >
                      <FileText className="w-4 h-4" />
                      <span>Detail info</span>
                    </button>
                    <button
                      className="flex items-center space-x-2 py-1 hover:bg-gray-100 px-2 rounded w-full"
                      onClick={() => downloadFile(file.id, file.originalName)}
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>

                    <button className={`flex items-center space-x-2 py-1 hover:bg-gray-100 px-2 rounded w-full ${copying ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => copyFileLink(file.id)}
                      disabled={copying}>
                      <Link className="w-4 h-4" />
                      <span>{copying ? 'Copying...' : 'Copy link'}</span>
                    </button>
                    <button onClick={() => handleDelete(file.id)} className="flex items-center space-x-2 py-1 hover:bg-gray-100 px-2 rounded w-full text-red-600">
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      {isDetailModalOpen && (
        <FileDetailModal
          file={selectedFileDetails}
          onClose={() => setIsDetailModalOpen(false)}
        />
      )}
    </div>
  );
};

export default FileListPage;