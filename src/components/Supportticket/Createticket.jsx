import axios from "axios";
import { X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import apiInstance from "../../utils/axios";

const CreateTicketForm = ({ onClose, onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: "",
    user: "",
  });
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

   const [setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("https://e-commerce-backend-1-0.onrender.com/api/sellertickets/create", formData);

      if (response.data.success) {
        navigate("/support-ticket");
        alert("Ticket created successfully!");
      } else {
        setError(response.data.message || "Failed to create ticket");
      }
    } catch (err) {
      console.error("Ticket creation error:", err);
      setError(
        err.response?.data?.message ||
          "An error occurred while creating the ticket"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="relative bg-white rounded-xl shadow-lg w-10/12 md:w-2/3 lg:w-1/2 p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <X size={20} />
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Create a New Support Ticket
        </h2>
        <div className="mb-4">
          <div className="flex items-center">
            <label
              htmlFor="subject"
              className="block text-gray-700 text-sm font-bold w-1/4 pr-4 text-left"
            >
              Subject:
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="user"
            className="block text-gray-700 font-medium mb-2"
          >
            Your Email *
          </label>
          <input
            type="email"
            id="user"
            name="user"
            value={formData.user}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* <div className="mb-6">
          <div className="flex items-start">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold w-1/4 pr-4 text-left mt-1"
            >
              Description:
            </label>
            <textarea
              id="description"
              className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Provide a detailed description of your issue"
              rows="5"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
        </div> */}
        {/* <div>
          <div className="flex items-center">
            <label
              htmlFor="photo"
              className="block text-gray-700 text-sm font-bold w-1/4 pr-4 text-left"
            >
              Photo:
            </label>
            <div className="w-3/4">
              <input
                type="file"
                id="photo"
                className="hidden"
                onChange={handlePhotoChange}
              />
              <div className="flex items-center border rounded shadow-sm py-2 px-3 bg-white">
                <button
                  type="button"
                  className="inline-block py-2 px-4 border border-indigo-500 rounded-md text-sm text-indigo-600 hover:bg-indigo-50 focus:outline-none"
                  onClick={() => document.getElementById("photo").click()}
                >
                  Browse
                </button>
                <span className="ml-2 text-gray-500 text-sm truncate">
                  {photoName}
                </span>
              </div>
            </div>
          </div>
        </div> */}
        <div className="flex justify-end mt-8 space-x-3">
          <button
            type="button"
            onClick={() => navigate("/Supportticket/supportticket")}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <>
                <span className="inline-block animate-spin mr-2">↻</span>
                Creating...
              </>
            ) : (
              "Create Ticket"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTicketForm;
