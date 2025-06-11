// import Switch from "./Switch";
import { Switch } from "@headlessui/react";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineSettings } from "react-icons/md";
import DeleteConfirmation from "./DeleteConfirmation";
import ViewExpandData from "./ViewExpandData";
// import apiInstance from "../utils/axios";
import axios from "axios";

const Wholesale = () => {

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/wholesale/create");
  };

  const [expandedId, setExpandedId] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [attributeToDeleteId, setAttributeToDeleteId] = useState(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://e-commerce-backend-1-0.onrender.com/api/sellerWholesaleProduct/getall`);
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
            published: item.published,
            featured: item.featured,
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

    const updatedProduct = {
      ...product,
      [field]: newValue
    };

    // Optimistically update UI
    setUserData((prevUser) =>
      prevUser.map((user) =>
        user.prodId === prodId ? { ...user, [field]: newValue } : user
      )
    );

    try {
      await axios.put(`https://e-commerce-backend-1-0.onrender.com/api/sellerWholesaleProduct/update/${prodId}`, {
        flashDeal: updatedProduct.todaysdeal,
        published: updatedProduct.published,
        featured: updatedProduct.featured,
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

      // const { data } = await apiInstance.put(
      //   `/sellerWholesaleProduct/update/${editingUser.prodId}`, // <-- use prodId
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );

       await axios.put(
        `https://e-commerce-backend-1-0.onrender.com/api/sellerWholesaleProduct/update/${editingUser.prodId}`, // <-- use prodId
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
      const { data } = await axios.delete(
        `https://e-commerce-backend-1-0.onrender.com/api/sellerWholesaleProduct/delete/${prodId}`
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
    <div className="productQueriesBox ma10">
      <div className="product-table">
        <p className="customersText">All wholesale products</p>
        <button type="button" onClick={handleSubmit} className="submit-btn">
          +Add new wholesale product
        </button>
      </div>

      <div className="overflow-x-auto">
        {/* Desktop Table */}
        <table className="hidden md:table w-full min-w-max bg-white rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Added By</th>
              <th className="py-3 px-4 text-left">Info</th>
              <th className="py-3 px-4 text-left">Total Stock</th>
              <th className="py-3 px-4 text-left">Todays Deal</th>
              <th className="py-3 px-4 text-left">Published</th>
              <th className="py-3 px-4 text-left">Featured</th>
              <th className="py-3 px-4 text-left">Options</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm divide-y divide-gray-200">
            {userData.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="py-3 px-4">{user.id}</td>
                <td className="py-3 px-4 prodNameQuery font-medium">{user.productName}</td>
                <td className="py-3 px-4">{user.productOwner}</td>
                <td className="py-3 px-4 space-y-1">
                  <p className="text-gray-600">Num of Sale: {user.info.NumofSale}</p>
                  <p className="text-gray-600">Base Price: {user.info.BasePrice}</p>
                  <p className="text-gray-600">Rating: {user.info.Rating}</p>
                </td>
                <td className="py-3 px-4">{user.totalstock}</td>
                <td className="py-3 px-4">
                  <label className="flex items-center">
                    <Switch
                      checked={user.todaysdeal}
                      onChange={() => handleToggleChange(user.prodId, 'todaysdeal')}
                      className={`
                                  ${user.todaysdeal ? "bg-green-500" : "bg-gray-300"}
                                  relative inline-flex h-5 w-10 items-center rounded-full transition-colors
                                `}                            >
                      <span
                        className={`
                                    ${user.todaysdeal
                            ? "translate-x-5"
                            : "translate-x-1"}
                                    inline-block h-4 w-4 transform bg-white rounded-full transition-transform
                                  `} />
                    </Switch>
                  </label>
                </td>
                <td className="py-3 px-4">
                  <label className="flex items-center">
                    <Switch
                      checked={user.published}
                      onChange={() => handleToggleChange(user.prodId, 'published')}
                      className={`
                                  ${user.published ? "bg-green-500" : "bg-gray-300"}
                                  relative inline-flex h-5 w-10 items-center rounded-full transition-colors
                                `}                            >
                      <span
                        className={`
                                    ${user.published
                            ? "translate-x-5"
                            : "translate-x-1"}
                                    inline-block h-4 w-4 transform bg-white rounded-full transition-transform
                                  `} />
                    </Switch>
                  </label>
                </td>
                <td className="py-3 px-4">
                  <label className="flex items-center">
                    <Switch
                      checked={user.featured}
                      onChange={() => handleToggleChange(user.prodId, 'featured')}
                      className={`
                        ${user.featured ? "bg-green-500" : "bg-gray-300"}
                        relative inline-flex h-5 w-10 items-center rounded-full transition-colors
                        `}>
                      <span
                        className={`
                            ${user.featured
                            ? "translate-x-5"
                            : "translate-x-1"}
                              inline-block h-4 w-4 transform bg-white rounded-full transition-transform
                            `} />
                    </Switch>
                  </label>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <button className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50">
                      <MdOutlineSettings size={18} />
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50"
                      onClick={() => setEditingUser(user)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50"
                      onClick={() => openDeleteConfirmation(user.prodId)}
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile View Header */}
        <div className="block md:hidden w-full px-4 py-3 font-semibold text-sm bg-gray-200 text-gray-600 rounded-t-lg">
          <div className="flex gap-4 items-center">
            <span className="w-8"></span>
            <span className="w-10">#</span>
            <span>Name</span>
          </div>
        </div>

        {/* Mobile View Cards */}
        <div className="block md:hidden w-full space-y-3">
          {userData.map((user) => (
            <div key={user.id} className="border border-gray-200 rounded-lg shadow-sm bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ViewExpandData
                    isExpanded={expandedId === user.id}
                    toggleExpanded={() => toggleMobileView(user.id)}
                  />
                  <span className="text-sm text-gray-500 w-10">{user.id}</span>
                  <span className="font-medium text-gray-800 text-sm truncate flex-1">
                    {user.productName}
                  </span>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedId === user.id && (
                <div className="mt-4 space-y-3 text-sm w-full">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Added By:</span>
                    <span>{user.productOwner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Num of Sale:</span>
                    <span>{user.info.NumofSale}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Base Price:</span>
                    <span>{user.info.BasePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Rating:</span>
                    <span>{user.info.Rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Total Stock:</span>
                    <span>{user.totalstock}</span>
                  </div>

                  {/* Toggle Switches */}
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-medium text-gray-600">Today's Deal:</span>
                    <Switch
                      checked={user.todaysdeal}
                      onChange={() => handleToggleChange(user.prodId, 'todaysdeal')}
                      className={`
                                  ${user.published ? "bg-green-500" : "bg-gray-300"}
                                  relative inline-flex h-5 w-10 items-center rounded-full transition-colors
                                `}                            >
                      <span
                        className={`
                                    ${user.todaysdeal
                            ? "translate-x-5"
                            : "translate-x-1"}
                                    inline-block h-4 w-4 transform bg-white rounded-full transition-transform
                                  `} />
                    </Switch>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-600">Published:</span>
                    <Switch
                      checked={user.published}
                      onChange={() => handleToggleChange(user.prodId, 'published')}
                      className={`
                                  ${user.published ? "bg-green-500" : "bg-gray-300"}
                                  relative inline-flex h-5 w-10 items-center rounded-full transition-colors
                                `}                            >
                      <span
                        className={`
                                    ${user.published
                            ? "translate-x-5"
                            : "translate-x-1"}
                                    inline-block h-4 w-4 transform bg-white rounded-full transition-transform
                                  `} />
                    </Switch>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-600">Featured:</span>
                    <div className="flex items-center gap-2 mt-3">
                      <strong>Featured:</strong>
                      <Switch
                        checked={user.featured}
                        onChange={() => handleToggleChange(user.prodId, 'featured')}
                        className={`
                        ${user.featured ? "bg-green-500" : "bg-gray-300"}
                        relative inline-flex h-5 w-10 items-center rounded-full transition-colors
                        `}>
                        <span
                          className={`
                            ${user.featured
                              ? "translate-x-5"
                              : "translate-x-1"}
                              inline-block h-4 w-4 transform bg-white rounded-full transition-transform
                            `} />
                      </Switch>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 pt-3 border-t border-gray-100 mt-3">
                    <button className="text-blue-500 hover:text-blue-700 p-1">
                      <MdOutlineSettings size={18} />
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-700 p-1"
                      onClick={() => setEditingUser(user)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-700 p-1"
                      onClick={() => openDeleteConfirmation(user.prodId)}
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="edit-modal">
          <form className="edit-form" onSubmit={handleEditSubmit}>
            <h2>Edit Product</h2>
            <input
              type="text"
              value={editingUser.productName}
              onChange={(e) => handleEditChange("productName", e.target.value)}
              placeholder="Product Name"
            />
            <input
              type="text"
              value={editingUser.productOwner}
              onChange={(e) => handleEditChange("productOwner", e.target.value)}
              placeholder="Product Owner"
            />
            <input
              type="text"
              value={editingUser.info.BasePrice}
              onChange={(e) =>
                handleEditChange("info.BasePrice", e.target.value)
              }
              placeholder="Base Price"
            />
            <input
              type="text"
              value={editingUser.totalstock}
              onChange={(e) => handleEditChange("totalstock", e.target.value)}
              placeholder="Total Stock"
            />
            <div className="form-buttons">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditingUser(null)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Delete Confirmation */}
      {showDeleteConfirmation && (
        <DeleteConfirmation
          isOpen={showDeleteConfirmation}
          onConfirm={() => handleDelete(attributeToDeleteId)}
          onCancel={closeDeleteConfirmation}
        />
      )}
    </div>
  );
};

export default Wholesale;
