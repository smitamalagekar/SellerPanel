import { useState } from "react";
import { ChevronLeft, Mail, Send, Users, UserCheck, X, ChevronDown } from "lucide-react";
import { TextEditor } from "../EmailTemplate/EditorComponents/TextEditor";
import { newsletterService } from "../../../services/newsLetterService";
import { useNavigate } from "react-router-dom";
import { useCustomerContext } from "../../../context/customerContext";


const NewsLetter = () => {
  const navigate = useNavigate();
  const { customers } = useCustomerContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Mock data - in a real app, this would come from your API
  const userGroups = {
    allUsers: customers,
    subscribers: customers.filter(user => user.isSubscribed),
  };

  const [formData, setFormData] = useState({
    subject: "",
    content: "",
    selectedUsers: [],
    specificEmails: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState({
    allUsers: false,
    subscribers: false,
    sellers: false,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      content: value,
    }));
  };

  const toggleDropdown = (type) => {
    setDropdownOpen((prev) => ({
      ...allClosed(),
      [type]: !prev[type],
    }));
    setSearchTerm("");
  };

  const allClosed = () => ({
    allUsers: false,
    subscribers: false,
    sellers: false,
  });

  const handleUserSelect = (user) => {
    setFormData((prev) => {
      const isSelected = prev.selectedUsers.some((u) => u._id === user._id);
      return {
        ...prev,
        selectedUsers: isSelected
          ? prev.selectedUsers.filter((u) => u._id !== user._id)
          : [...prev.selectedUsers, user],
      };
    });
  };

  const removeUser = (userId) => {
    setFormData((prev) => ({
      ...prev,
      selectedUsers: prev.selectedUsers.filter((u) => u._id !== userId),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const newsletterData = {
        emails: formData.selectedUsers.map(user => user.email),
        subject: formData.subject,
        content: formData.content
      };
      const response = await newsletterService.saveNewsletter(newsletterData);
      
      setSuccess("Newsletter saved successfully!");
      alert("NewsLetter Sent")
      console.log("Newsletter saved:", response);
 
      resetForm();
    } catch (error) {
      console.error("Error saving newsletter:", error);
      setError(error.message || "Failed to save newsletter");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      subject: "",
      content: "",
      selectedUsers: [],
      specificEmails: "",
    });
  };

  const filteredUsers = (type) => {
    return userGroups[type].filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/marketing/all-news-letters")}
              className="mr-4 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold flex items-center">
              <Mail className="w-6 h-6 mr-2" />
              Send Newsletter
            </h1>
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        {/* Newsletter Form */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 mb-6">
                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Recipient Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Recipients
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {/* All Users Dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        className={`w-full flex items-center justify-between px-3 py-2 border rounded-md ${
                          formData.recipientType === "allUsers"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-gray-400"
                        } transition-colors duration-200`}
                        onClick={() => toggleDropdown("allUsers")}
                      >
                        <div className="flex items-center truncate">
                          <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="truncate">All Users</span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 flex-shrink-0 transition-transform ${
                            dropdownOpen.allUsers ? "transform rotate-180" : ""
                          }`}
                        />
                      </button>
                      {dropdownOpen.allUsers && (
                        <div className="absolute z-20 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-300 max-h-60 overflow-auto">
                          <div className="sticky top-0 p-2 border-b bg-white">
                            <input
                              type="text"
                              placeholder="Search users..."
                              className="w-full px-3 py-2 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              autoFocus
                            />
                          </div>
                          {/* Select All checkbox */}
                          <div className="border-b border-gray-200 px-3 py-2 flex items-center hover:bg-gray-50">
                            <input
                              type="checkbox"
                              checked={
                                filteredUsers("allUsers").length > 0 &&
                                filteredUsers("allUsers").every(user => 
                                  formData.selectedUsers.some(u => u._id === user._id)
                                )
                              }
                              onChange={(e) => {
                                if (e.target.checked) {
                                  const newUsers = filteredUsers("allUsers").filter(
                                    user => !formData.selectedUsers.some(u => u._id === user._id)
                                  );
                                  setFormData(prev => ({
                                    ...prev,
                                    selectedUsers: [...prev.selectedUsers, ...newUsers]
                                  }));
                                } else {
                                  setFormData(prev => ({
                                    ...prev,
                                    selectedUsers: prev.selectedUsers.filter(
                                      u => !filteredUsers("allUsers").some(user => user._id === u._id)
                                    )
                                  }));
                                }
                              }}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                            />
                            <span className="text-sm font-medium text-gray-900">Select All</span>
                          </div>
                          <ul className="divide-y divide-gray-200">
                            {filteredUsers("allUsers").length > 0 ? (
                              filteredUsers("allUsers").map((user) => (
                                <li key={user._id} className="hover:bg-gray-50">
                                  <button
                                    type="button"
                                    className={`w-full text-left px-3 py-3 flex items-center ${
                                      formData.selectedUsers.some(u => u._id === user._id)
                                        ? "bg-blue-50"
                                        : ""
                                    }`}
                                    onClick={() => handleUserSelect(user)}
                                  >
                                    <div className={`flex items-center h-5 mr-3 ${
                                      formData.selectedUsers.some(u => u._id === user._id)
                                        ? "text-blue-600"
                                        : "text-gray-400"
                                    }`}>
                                      <input
                                        type="checkbox"
                                        checked={formData.selectedUsers.some(u => u._id === user._id)}
                                        readOnly
                                        className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
                                      />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-sm font-medium text-gray-900 truncate">
                                        {user.name}
                                      </p>
                                      <p className="text-xs text-gray-500 truncate">
                                        {user.email}
                                      </p>
                                    </div>
                                  </button>
                                </li>
                              ))
                              
                            ) : (
                              <li className="px-3 py-3 text-sm text-gray-500 text-center">
                                No users found
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Subscribers Dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        className={`w-full flex items-center justify-between px-3 py-2 border rounded-md ${
                          formData.recipientType === "subscribers"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-gray-400"
                        } transition-colors duration-200`}
                        onClick={() => toggleDropdown("subscribers")}
                      >
                        <div className="flex items-center truncate">
                          <UserCheck className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="truncate">Subscribers</span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 flex-shrink-0 transition-transform ${
                            dropdownOpen.subscribers
                              ? "transform rotate-180"
                              : ""
                          }`}
                        />
                      </button>
                      {dropdownOpen.subscribers && (
                        <div className="absolute z-20 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-300 max-h-60 overflow-auto">
                          <div className="sticky top-0 p-2 border-b bg-white">
                            <input
                              type="text"
                              placeholder="Search subscribers..."
                              className="w-full px-3 py-2 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              autoFocus
                            />
                          </div>
                          {/* Select All checkbox */}
                          <div className="border-b border-gray-200 px-3 py-2 flex items-center hover:bg-gray-50">
                            <input
                              type="checkbox"
                              checked={
                                filteredUsers("subscribers").length > 0 &&
                                filteredUsers("subscribers").every(user => 
                                  formData.selectedUsers.some(u => u.id === user.id)
                                )
                              }
                              onChange={(e) => {
                                if (e.target.checked) {
                                  const newSubscribers = filteredUsers("subscribers").filter(
                                    user => !formData.selectedUsers.some(u => u.id === user.id)
                                  );
                                  setFormData(prev => ({
                                    ...prev,
                                    selectedUsers: [...prev.selectedUsers, ...newSubscribers]
                                  }));
                                } else {
                                  setFormData(prev => ({
                                    ...prev,
                                    selectedUsers: prev.selectedUsers.filter(
                                      u => !filteredUsers("subscribers").some(user => user.id === u.id)
                                    )
                                  }));
                                }
                              }}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                            />
                            <span className="text-sm font-medium text-gray-900">Select All</span>
                          </div>
                          <ul className="divide-y divide-gray-200">
                            {filteredUsers("subscribers").length > 0 ? (
                              filteredUsers("subscribers").map((user) => (
                                <li key={user._id} className="hover:bg-gray-50">
                                  <button
                                    type="button"
                                    className={`w-full text-left px-3 py-3 flex items-center ${
                                      formData.selectedUsers.some(
                                        (u) => u._id === user._id
                                      )
                                        ? "bg-blue-50"
                                        : ""
                                    }`}
                                    onClick={() => handleUserSelect(user)}
                                  >
                                    <div
                                      className={`flex items-center h-5 mr-3 ${
                                        formData.selectedUsers.some(
                                          (u) => u._id === user._id
                                        )
                                          ? "text-blue-600"
                                          : "text-gray-400"
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={formData.selectedUsers.some(
                                          (u) => u._id === user._id
                                        )}
                                        readOnly
                                        className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
                                      />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-sm font-medium text-gray-900 truncate">
                                        {user.name}
                                      </p>
                                      <p className="text-xs text-gray-500 truncate">
                                        {user.email}
                                      </p>
                                    </div>
                                  </button>
                                </li>
                              ))
                            ) : (
                              <li className="px-3 py-3 text-sm text-gray-500 text-center">
                                No subscribers found
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Selected Recipients Display */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Selected Recipients ({formData.selectedUsers.length})
                    </label>
                    <div className="border rounded-md p-2 min-h-12">
                      {formData.selectedUsers.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {formData.selectedUsers.map((user) => (
                            <div
                              key={user._id}
                              className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center"
                            >
                              {user.email}
                              <button
                                type="button"
                                className="ml-2 text-blue-600 hover:text-blue-800"
                                onClick={() => removeUser(user._id)}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500">
                          No recipients selected yet
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rich Text Editor */}
                <TextEditor
                  content={formData.content}
                  onChange={handleContentChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mb-6 mr-5">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Newsletter
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;