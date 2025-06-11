import React, { useState, useRef, useEffect } from "react";
import { useCustomerContext } from "../../../context/customerContext";
import { notificationService } from "../../../services/notificationService";
import { ChevronDown, X, Send, Check } from "lucide-react";

const CustomNotification = () => {
  const { customers } = useCustomerContext();
  const [selectedCustomers, setSelectedCustomers] = useState([]); // Store selected customers
  const [isMultiSelect, setIsMultiSelect] = useState(false); // Toggle for multi-select mode
  const [notificationType, setNotificationType] = useState("");
  const [notificationContent, setNotificationContent] = useState("");
  const [link, setLink] = useState("");
  const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [searchCustomer, setSearchCustomer] = useState("");
  const [searchType, setSearchType] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });
  const customerDropdownRef = useRef(null);
  const typeDropdownRef = useRef(null);

  // Notification types - could also be fetched from API
  const notificationTypes = [
    { id: 29, name: "SALE" },
    { id: 30, name: "Coupon Sale" },
    { id: 31, name: "GIFT" },
    { id: 33, name: "follow up" },
    { id: 84, name: "admin" },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        customerDropdownRef.current &&
        !customerDropdownRef.current.contains(event.target)
      ) {
        setIsCustomerDropdownOpen(false);
      }
      if (
        typeDropdownRef.current &&
        !typeDropdownRef.current.contains(event.target)
      ) {
        setIsTypeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Reset status message after 5 seconds
  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => {
        setStatus({ type: null, message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const toggleDropdown = (type) => {
    if (type === "customer") {
      setIsCustomerDropdownOpen(!isCustomerDropdownOpen);
      setIsTypeDropdownOpen(false);
    } else {
      setIsTypeDropdownOpen(!isTypeDropdownOpen);
      setIsCustomerDropdownOpen(false);
    }
    setSearchCustomer("");
    setSearchType("");
  };

  // Add "Select All" and "Deselect All" functionality
  const handleSelectAll = () => {
    setSelectedCustomers(filteredCustomers); // Select all filtered customers
  };

  const handleDeselectAll = () => {
    setSelectedCustomers([]); // Clear all selected customers
  };

  // Handle customer selection
  const handleCustomerSelect = (customer) => {
    setSelectedCustomers((prev) => {
      const isSelected = prev.some((c) => c.id === customer.id);
      return isSelected
        ? prev.filter((c) => c.id !== customer.id) // Remove if already selected
        : [...prev, customer]; // Add if not selected
    });
  };

  // Remove a selected customer
  const removeSelectedCustomer = (customerId) => {
    setSelectedCustomers((prev) => prev.filter((c) => c.id !== customerId));
  };

  // Get label for selected customers
  const getSelectedCustomersLabel = () => {
    if (selectedCustomers.length === 0) return "Select a customer";
    if (!isMultiSelect) return selectedCustomers[0].name;
    return `${selectedCustomers.length} customer(s) selected`;
  };

  // Toggle multi-select mode
  const toggleMultiSelect = () => {
    setIsMultiSelect((prev) => !prev);
    setSelectedCustomers([]); // Reset selection when toggling mode
  };

  const handleNotificationTypeSelect = (typeId) => {
    setNotificationType(typeId);
    setIsTypeDropdownOpen(false);
    const selectedType = notificationTypes.find((t) => t.id === typeId);
    setNotificationContent(
      selectedType ? `This is a ${selectedType.name} notification` : ""
    );
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchCustomer.toLowerCase()) ||
      (customer.email &&
        customer.email.toLowerCase().includes(searchCustomer.toLowerCase())) ||
      (customer.phone &&
        customer.phone.toLowerCase().includes(searchCustomer.toLowerCase()))
  );

  const filteredTypes = notificationTypes.filter((type) =>
    type.name.toLowerCase().includes(searchType.toLowerCase())
  );

  const getSelectedTypeLabel = () => {
    if (!notificationType) return "Select notification type";
    const type = notificationTypes.find((t) => t.id === notificationType);
    return type ? type.name : "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!notificationType) {
      setStatus({ type: "error", message: "Please select a notification type" });
      return;
    }

    if (!notificationContent) {
      setStatus({ type: "error", message: "Please enter notification content" });
      return;
    }

    if (selectedCustomers.length === 0) {
      setStatus({ type: "error", message: "Please select a customer" });
      return;
    }

    setIsSending(true);
    setStatus({ type: null, message: "" });

    try {
      const payload = {
        type: notificationType,
        content: notificationContent,
        link: link || null,
        customers: selectedCustomers.map((customer) => ({
          id: customer.id,
          name: customer.name,
          email: customer.email || null,
          phone: customer.phone || null,
        })),
      };

      await notificationService.sendCustomNotification(payload);

      setStatus({
        type: "success",
        message: "Notification created and sending started!",
      });

      // Reset form
      setSelectedCustomers([]);
      setNotificationType("");
      setNotificationContent("");
      setLink("");
    } catch (error) {
      console.error("Error sending notification:", error);
      setStatus({
        type: "error",
        message: error || "Failed to send notification. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="px-4 lg:px-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 min-h-[460px]">
          <form onSubmit={handleSubmit}>
            <h3 className="text-sm font-bold text-gray-800 mb-4">
              Send Custom Notification
            </h3>

            {/* Status Message */}
            {status.message && (
              <div
                className={`mb-4 p-3 rounded-md ${
                  status.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {status.message}
              </div>
            )}

            {/* Customers Dropdown */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Customers
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="relative" ref={customerDropdownRef}>
                <button
                  type="button"
                  className="w-full flex justify-between items-center px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onClick={() => toggleDropdown("customer")}
                >
                  <span className="truncate">{getSelectedCustomersLabel()}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      isCustomerDropdownOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {isCustomerDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm max-h-60">
                    <div className="px-4 py-2 border-b">
                      <input
                        type="text"
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Search customers..."
                        value={searchCustomer}
                        onChange={(e) => setSearchCustomer(e.target.value)}
                        autoFocus
                      />
                      <div className="mt-2 flex justify-between">
                        <button
                          type="button"
                          className="text-sm text-blue-600 hover:underline"
                          onClick={handleSelectAll}
                        >
                          Select All
                        </button>
                        <button
                          type="button"
                          className="text-sm text-red-600 hover:underline"
                          onClick={handleDeselectAll}
                        >
                          Deselect All
                        </button>
                      </div>
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {filteredCustomers.length > 0 ? (
                        filteredCustomers.map((customer) => (
                          <div
                            key={customer.id}
                            className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                              selectedCustomers.some((c) => c.id === customer.id)
                                ? "bg-blue-100"
                                : ""
                            }`}
                          >
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedCustomers.some(
                                  (c) => c.id === customer.id
                                )}
                                onChange={() => handleCustomerSelect(customer)}
                                className="mr-2"
                              />
                              <div>
                                <p className="text-sm font-medium text-gray-700">
                                  {customer.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {customer.email || customer.phone}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">
                          No customers found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              </div>

              {/* Selected Customers Display */}
              <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                      Selected Recipients ({selectedCustomers.length})
                    </label>
              {selectedCustomers.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedCustomers.map((customer) => (
                      <div
                        key={customer.id}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center"
                      >
                        {customer.name}
                        <button
                          type="button"
                          className="ml-1 text-blue-600 hover:text-blue-800"
                          onClick={() => removeSelectedCustomer(customer.id)}
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

            {/* Notification Type Dropdown */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Select Type
              </label>
              <div className="relative" ref={typeDropdownRef}>
                <button
                  type="button"
                  className="w-full flex justify-between items-center px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onClick={() => toggleDropdown("type")}
                >
                  <span className="truncate">{getSelectedTypeLabel()}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      isTypeDropdownOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {isTypeDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm max-h-60">
                    <div className="px-4 py-2 border-b">
                      <input
                        type="text"
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Search types..."
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {filteredTypes.length > 0 ? (
                        filteredTypes.map((type) => (
                          <div
                            key={type.id}
                            className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                              notificationType === type.id ? "bg-blue-100" : ""
                            }`}
                            onClick={() => handleNotificationTypeSelect(type.id)}
                          >
                            <div className="flex items-center">
                              {notificationType === type.id ? (
                                <Check className="h-4 w-4 text-blue-600" />
                              ) : (
                                <div className="h-4 w-4" />
                              )}
                              <span
                                className={`${
                                  notificationType === type.id
                                    ? "ml-3 font-medium"
                                    : "ml-7"
                                }`}
                              >
                                {type.name}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">
                          No types found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Notification Content */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Content..
                <span className="block text-xs font-normal text-gray-500">
                  (Best within 80 characters)
                </span>
              </label>
              <textarea
                className="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Write what your notification will display..."
                value={notificationContent}
                onChange={(e) => setNotificationContent(e.target.value)}
                required
              />
            </div>

            {/* Link */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Link
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Paste your link here"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150 disabled:opacity-50"
                disabled={isSending}
              >
                {isSending ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Notifications
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

export default CustomNotification;