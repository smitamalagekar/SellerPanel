import React, { useState, useEffect } from "react";
import Switch from "../Switch"; // Assuming Switch handles 'checked' and 'onChange' props
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useProductContext } from "../../productContex";
import apiInstance from "../../utils/axios";

const ProductSettings = () => {
  const [isPublished, setIsPublished] = useState(false);
  const [availableNow, setAvailableNow] = useState(false);
  const [availableFrom, setAvailableFrom] = useState("");
  const [loading, setLoading] = useState(true);
  const { productData, setProductData } = useProductContext();

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
            availableNow: item.availableNow || false,
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

  useEffect(() => {
    // Simulate fetching product settings data
    setTimeout(() => {
      setIsPublished(true);
      setAvailableNow(false);
      setAvailableFrom("2025-04-20");
      setLoading(false);
    }, 1200); // Simulate a 1.2-second loading time
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 rounded-lg border mt-4 mb-4">
      <h2 className="text-lg font-semibold mb-4">
        {loading ? <Skeleton width={150} /> : "Product Settings"}
      </h2>
      <div className="border-b border-gray-200 my-3"></div>

      {/* Published Toggle */}
      <div className="flex items-center justify-between mb-2">
        <label className="font-medium">
          {loading ? <Skeleton width={80} /> : "Published"}
        </label>
        {loading ? (
          <div style={{ width: "40px", height: "20px" }}>
            <Skeleton width={40} height={20} />
          </div>
        ) : (
          <Switch
            value={userData.published}
            onChangeFunc={() => handleToggleChange(userData.prodId, "published")}
          />
        )}
      </div>
      <p className="text-sm text-gray-500 mb-4">
        {loading ? (
          <Skeleton count={2} />
        ) : (
          "Upload an image that represents the product in search engines. [e.g. A high-resolution image of the product.]"
        )}
      </p>

      {/* Available Now Toggle */}
      <div className="flex items-center justify-between mb-2">
        <label className="font-medium">
          {loading ? <Skeleton width={100} /> : "Available Now"}
        </label>
        {loading ? (
          <div style={{ width: "40px", height: "20px" }}>
            <Skeleton width={40} height={20} />
          </div>
        ) : (
          <Switch
          value={userData.availableNow}
          onChangeFunc={() => handleToggleChange(userData.prodId, "availableNow")}
          />
        )}
      </div>
      <p className="text-sm text-gray-500 mb-4">
        {loading ? (
          <Skeleton width={200} />
        ) : (
          "Indicate if the product is in stock and ready to ship."
        )}
      </p>

      {/* Conditionally Show Date Picker */}
      {!loading ? (
        !availableNow && (
          <>
            <div className="mb-2">
              <label className="font-medium block mb-1">Available From</label>
              <input
                type="date"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <p className="text-sm text-gray-500">
              Set a date when the product will become available. Example:
              "01/20/2024"
            </p>
          </>
        )
      ) : (
        <>
          <div className="mb-2">
            <label className="font-medium block mb-1">
              <Skeleton width={100} />
            </label>
            <Skeleton height={36} />
          </div>
          <p className="text-sm text-gray-500">
            <Skeleton width={250} />
          </p>
        </>
      )}
    </div>
  );
};

export default ProductSettings;
