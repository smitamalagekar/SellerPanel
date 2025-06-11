import React, { useState, useEffect } from "react";
import Switch from "../Switch"; // Custom toggle component
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import apiInstance from "../../utils/axios";

const ShippingConfig = () => {
  const [freeShipping, setFreeShipping] = useState(true);
  const [flatRate, setFlatRate] = useState(false);
  const [showEstimate, setShowEstimate] = useState(true);
  const [minDays, setMinDays] = useState("");
  const [maxDays, setMaxDays] = useState("");
  const [showNoteSection, setShowNoteSection] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching shipping configuration data
    setTimeout(() => {
      setFreeShipping(false);
      setFlatRate(true);
      setShowEstimate(true);
      setMinDays("2");
      setMaxDays("5");
      setShowNoteSection(false);
      setLoading(false);
    }, 1500); // Simulate a 1.5-second loading time
  }, []);

  const [expandedId, setExpandedId] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [attributeToDeleteId, setAttributeToDeleteId] = useState(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        const response = await apiInstance.get(`/wholesaleProduct/getall`);
        if (response.data.success) {
          const products = response.data.data.map((item, index) => ({
            id: index + 1,
            prodId: item._id,
            productName: item.productName,
            productOwner: "Admin", // Replace with actual owner if available
            info: {
              NumofSale: "0 times", // Default/fallback
              BasePrice: `$${item.unitPrice.toFixed(2)}`,
              Rating: "0", // Placeholder
            },
            totalstock:
              item.quantity < item.lowStockWarning ? "Low" : "In Stock",
            todaysdeal: item.flashDeal?.isActive || false,
            published: true, // Placeholder if API doesn’t provide it
            featured: false, // Placeholder
            freeShipping: item.freeShipping || false,
            flatRate: item.flatRate || false,
          }));
          setUserData(products);
        }
      } catch (err) {
        console.error("Failed to fetch wholesale products:", err);
      }
    };

    fetchData();
  }, []);

  const handleToggleChange = async (prodId, field) => {
    const product = userData.find((u) => u.prodId === prodId);
    if (!product) return;

    const newValue = !product[field];

    // Optimistically update UI
    setUserData((prevUser) =>
      prevUser.map((user) =>
        user.prodId === prodId ? { ...user, [field]: newValue } : user
      )
    );

    try {
      await apiInstance.put(`/wholesaleProduct/update/${prodId}`, {
        flashDealIsActive: newValue.toString(), // Ensure string "true"/"false"
      });
    } catch (err) {
      console.error("Failed to update flash deal status:", err);
    }
  };

  const handleEditChange = (field, value) => {
    if (!editingUser) return;
    if (field.startsWith("info.")) {
      const subField = field.split(".")[1];
      setEditingUser((prev) => ({
        ...prev,
        info: { ...prev.info, [subField]: value },
      }));
    } else {
      setEditingUser((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append editable fields from editingUser
      for (const key in editingUser) {
        formData.append(key, editingUser[key]);
      }

      const { data } = await apiInstance.put(
        `/wholesaleProduct/update/${editingUser.prodId}`, // <-- use prodId
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update local userData state with updated product
      setUserData((prev) =>
        prev.map((u) =>
          u.prodId === editingUser.prodId
            ? {
                ...u,
                ...editingUser,
                // Optional: update calculated fields like totalstock again
                totalstock:
                  editingUser.quantity < editingUser.lowStockWarning
                    ? "Low"
                    : "In Stock",
                todaysdeal: editingUser.flashDealIsActive || false,
              }
            : u
        )
      );

      setEditingUser(null);
    } catch (error) {
      console.error(
        "Failed to update product:",
        error.response?.data?.message || error.message
      );
    }
  };

  const toggleMobileView = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const openDeleteConfirmation = (prodId) => {
    setAttributeToDeleteId(prodId);
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setAttributeToDeleteId(null);
    setShowDeleteConfirmation(false);
  };

  const handleDelete = async (prodId) => {
    try {
      const { data } = await apiInstance.delete(
        `/wholesaleProduct/delete/${prodId}`
      );
      console.log(data.message);
      setUserData((prev) => prev.filter((item) => item.prodId !== prodId));
    } catch (error) {
      console.error(
        "Delete failed:",
        error.response?.data?.message || error.message
      );
    } finally {
      closeDeleteConfirmation();
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-lg shadow border">
      <h2 className="font-medium mb-2">
        {loading ? <Skeleton width={200} /> : "Shipping Configuration"}
      </h2>
      <div className="border-b border-gray-200 my-3"></div>

      <div className="flex items-center justify-between mb-2">
        <label className="font-medium">
          {loading ? <Skeleton width={100} /> : "Free Shipping"}
        </label>
        {loading ? (
          <div style={{ width: "40px", height: "20px" }}>
            <Skeleton width={40} height={20} />
          </div>
        ) : (
          <Switch
            value={userData.freeShipping}
            onChangeFunc={() =>
              handleToggleChange(userData.prodId, "freeShipping")
            }
          />
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <label className="font-medium">
          {loading ? <Skeleton width={80} /> : "Flat Rate"}
        </label>
        {loading ? (
          <div style={{ width: "40px", height: "20px" }}>
            <Skeleton width={40} height={20} />
          </div>
        ) : (
          <Switch
            value={userData.flatRate}
            onChangeFunc={() =>
              handleToggleChange(userData.prodId, "freeShipping")
            }
          />
        )}
      </div>

      {/* Checkbox: Show Estimated Shipping Time */}
      <div className="flex items-start gap-2 mb-4">
        {loading ? (
          <Skeleton width={24} height={24} style={{ marginTop: "4px" }} />
        ) : (
          <input
            type="checkbox"
            checked={showEstimate}
            onChange={() => setShowEstimate(!showEstimate)}
            className="mt-1 w-4 h-4"
          />
        )}
        <span className="text-sm font-semibold leading-snug">
          {loading ? (
            <Skeleton width={250} />
          ) : (
            "Show estimated shipping time in product description page"
          )}
        </span>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              <Skeleton width={150} />
            </label>
            <Skeleton height={36} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              <Skeleton width={180} />
            </label>
            <Skeleton height={36} />
          </div>
        </div>
      ) : (
        showEstimate && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Minimum Shipping Days
              </label>
              <input
                type="number"
                value={minDays}
                onChange={(e) => setMinDays(e.target.value)}
                placeholder="write in days"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Maximum Shipping Days
              </label>
              <input
                type="number"
                value={maxDays}
                onChange={(e) => setMaxDays(e.target.value)}
                placeholder="write in days"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
        )
      )}

      {/* Checkbox: Show notes in shipping time section */}
      <div className="flex items-start gap-2 mb-4">
        {loading ? (
          <Skeleton width={24} height={24} style={{ marginTop: "4px" }} />
        ) : (
          <input
            type="checkbox"
            checked={showNoteSection}
            onChange={() => setShowNoteSection(!showNoteSection)}
            className="mt-1 w-4 h-4"
          />
        )}
        <span className="text-sm font-semibold leading-snug">
          {loading ? (
            <Skeleton width={200} />
          ) : (
            "Show notes in shipping time section"
          )}
        </span>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium block mb-1">
          {loading ? <Skeleton width={180} /> : "Note (Add from preset)"}
        </label>
        {loading ? (
          <div className="w-full border border-dashed border-gray-400 rounded py-2 text-gray-600 text-sm hover:bg-gray-50 flex justify-center items-center">
            <Skeleton width={120} height={20} />
          </div>
        ) : (
          <button className="w-full border border-dashed border-gray-400 rounded py-2 text-gray-600 text-sm hover:bg-gray-50">
            + Select Shipping Note
          </button>
        )}
      </div>
    </div>
  );
};

export default ShippingConfig;
