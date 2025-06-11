import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { Pencil, Eye, Trash2, Plus, Minus } from "lucide-react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from "react-router-dom";
import './Product.css';
// import apiInstance from "../../utils/axios";
import DeleteConfirmation from "../DeleteConfirmation";
import axios from "axios";

const ProductTable = () => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  // const [expandedId, setExpandedId] = useState(null);


  const [editingUser, setEditingUser] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [attributeToDeleteId, setAttributeToDeleteId] = useState(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://e-commerce-backend-1-0.onrender.com/api/sellerpreorderproducts");
        if (response.data.success) {
          const products = response.data.data.map((item, index) => ({
            id: index + 1,
            prodId: item._id,
            productName: item.productName,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            approval: "Approved",
            productOwner: "Admin",
            lowStockWarning: item.lowStockQuantityWarning || 0,
            info: {
              NumofSale: "0 times",
              BasePrice: `${item.unitPrice.toFixed(2)}`,
              Rating: "0",
            },
            totalstock: item.quantity < item.lowStockQuantityWarning ? "Low" : "In Stock",
            todaysdeal: item.flashDeal?.isActive || false,
            published: item.published,
            featured: item.featured,
            externalLink: item.externalLink,
            externalLinkButtonText: item.externalLinkButtonText,
            metaTitle: item.metaTitle,
            metaDescription: item.metaDescription,
            videoLink: item.videoLink,
            thumbnailImage: item.thumbnailImage,
          }));
          setUserData(products);
          console.log("Fetched products:", products);
        }
      } catch (err) {
        console.error("Failed to fetch wholesale products:", err);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1200);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Simulate loading delay
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500); // Adjust the delay as needed
  }, []);

  const toggleExpand = (index) => {
    setExpandedRows((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handlereview = (e) => {
    e.preventDefault();
    navigate("/products/create");
  };

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
      await axios.put(`https://e-commerce-backend-1-0.onrender.com/api/sellerproducts/update/${prodId}`, {
        published: updatedProduct.published,
        featured: updatedProduct.featured,
      });
    } catch (err) {
      console.error(`Failed to update ${field} status:`, err);

      setUserData((prevUser) =>
        prevUser.map((user) =>
          user.prodId === prodId ? { ...user, [field]: !newValue } : user
        )
      );
    }
  };

  // console.log('userData:', userData);

  const handleEditChange = (field, value) => {
    if (!editingUser) return;

    if (field.startsWith("info.")) {
      const subField = field.split(".")[1];
      setEditingUser((prev) => ({
        ...prev,
        info: {
          ...prev.info,
          [subField]: subField === "BasePrice" ? value.replace(/^\$/, "") : value, // Remove `$` if present
        },
      }));
    } else {
      setEditingUser((prev) => ({ ...prev, [field]: value }));
    }
  };


  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const cleanPayload = {
        productName: editingUser.productName,
        unitPrice: parseFloat(editingUser.info.BasePrice),
        quantity: parseInt(editingUser.quantity),
        lowStockQuantityWarning: parseInt(editingUser.lowStockWarning || 0),
        externalLink: editingUser.externalLink,
        externalLinkButtonText: editingUser.externalLinkButtonText,
        metaTitle: editingUser.metaTitle,
        metaDescription: editingUser.metaDescription,
        videoLink: editingUser.videoLink,
        todaysDeal: editingUser.todaysdeal,
        featured: Boolean(editingUser.featured),
        published: Boolean(editingUser.published),
        thumbnailImage: editingUser.thumbnailImage,
      };

      const formData = new FormData();
      for (const key in cleanPayload) {
        formData.append(key, cleanPayload[key]);
      }

      // const { data } = await apiInstance.put(
      //   `/sellerproducts/update/${editingUser.prodId}`,
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );

       await axios.put(
        `https://e-commerce-backend-1-0.onrender.com/api/sellerproducts/update/${editingUser.prodId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );


      // Update UI
      setUserData((prev) =>
        prev.map((u) =>
          u.prodId === editingUser.prodId
            ? {
              ...u,
              ...editingUser,
              totalstock:
                editingUser.quantity < editingUser.lowStockWarning ? "Low" : "In Stock",
              todaysdeal: editingUser.todaysdeal || false,
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
       await axios.delete(
        `https://e-commerce-backend-1-0.onrender.com/api/sellerproducts/delete/${prodId}`
      );
      // console.log(data.message);
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

    <div className="p-6">
      <h1 className="font-semibold text-base mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg p-6 flex flex-col items-center justify-center shadow-md">
          <div className="bg-white/20 p-3 rounded-full mb-3">
            {loading ? <Skeleton circle width={32} height={32} /> : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0l-4 4m4-4l4 4"
                />
              </svg>
            )}
          </div>
          <div className="text-3xl font-bold">{loading ? <Skeleton width={80} /> : '4953'}</div>
          <div className="text-sm mt-1">{loading ? <Skeleton width={120} /> : 'Remaining Uploads'}</div>
        </div>

        <div className="bg-white border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-md transition">
          <button className="bg-gray-100 p-4 rounded-full text-gray-600"  onClick={handlereview}>
            {loading ? <Skeleton circle width={32} height={32} /> : <Plus size={32} />}
          </button>
          <div className="mt-2 text-lg font-medium text-[#2E294E]" style={{ cursor: 'pointer' }}>{loading ? <Skeleton width={100} /> : 'Add New product'}</div>
        </div>
        <div className="bg-white rounded-lg p-6 border flex flex-col items-center justify-center shadow-sm">
          <div className="text-blue-600 text-3xl mb-2">{loading ? <Skeleton width={40} /> : '🌟'}</div>
          <div className="text-sm font-medium text-gray-700">
            {loading ? <Skeleton width={150} /> : <span>Current Package: <strong>Platinum</strong></span>}
          </div>
          <button className="mt-2 px-4 py-2 text-sm bg-white border border-gray-400 rounded-full hover:bg-gray-100">
            {loading ? <Skeleton width={100} /> : 'Upgrade Package'}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto p-7 border rounded bg-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
          <h5 className="text-base font-semibold text-gray-800">All Wholesale Products</h5>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-2 md:mt-0">

            <select className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>Bulk Action</option>
              <option>Delete</option>
              <option>Publish</option>
              <option>Unpublish</option>
            </select>
            <input
              type="text"
              placeholder="Search product"
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-left text-xs text-[#1B1B28] font-[600]">
              <th></th>
              <th className="ml-6">
                {loading ? <Skeleton width={20} height={20} /> : <input type="checkbox" disabled={loading} />}
              </th>
              <th className="p-3">{loading ? <Skeleton width={80} /> : 'Name'}</th>
              <th className="p-3 hidden xl:table-cell">{loading ? <Skeleton width={60} /> : 'Current Qty'}</th>
              <th className="p-3">{loading ? <Skeleton width={80} /> : 'Base Price'}</th>
              <th className="p-3 hidden xl:table-cell">{loading ? <Skeleton width={80} /> : 'Approval'}</th>
              <th className="p-3 hidden xl:table-cell">{loading ? <Skeleton width={80} /> : 'Published'}</th>
              <th className="p-3 hidden xl:table-cell">{loading ? <Skeleton width={80} /> : 'Featured'}</th>
              <th className="p-3 hidden xl:table-cell">{loading ? <Skeleton width={80} /> : 'Options'}</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={`skeleton-${index}`} className="border-b">
                  <td className="p-3">
                    {isMobile && <Skeleton circle width={16} height={16} className="mt-4" />}
                  </td>
                  <td><Skeleton width={20} height={20} /></td>
                  <td className="p-3"><Skeleton /></td>
                  <td className="p-3 hidden xl:table-cell"><Skeleton width={40} /></td>
                  <td className="p-3"><Skeleton width={60} /></td>
                  <td className="p-3 hidden xl:table-cell"><Skeleton width={80} /></td>
                  <td className="p-3 hidden xl:table-cell"><Skeleton width={60} /></td>
                  <td className="p-3 hidden xl:table-cell"><Skeleton width={60} /></td>
                  <td className="p-3 hidden xl:table-cell"><Skeleton width={100} /></td>
                </tr>
              ))
            ) : (
              userData.map((item, index) => {
                const isExpanded = expandedRows.includes(index);

                return (
                  <>
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-3 flex items-center gap-2">

                        {isMobile && (
                          <button
                            onClick={() => toggleExpand(index)}
                            className="text-blue-600 mt-4"
                          >
                            {isExpanded ? <Minus size={16} /> : <Plus size={16} />}
                          </button>
                        )}

                      </td>
                      <td><input type="checkbox" /></td>
                      <td className="p-3">{item.productName}</td>
                      <td className="p-3 hidden xl:table-cell">{item.quantity}</td>
                      <td className="p-3">${item.info.BasePrice}</td>
                      <td className="p-3 hidden xl:table-cell">
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                          Approved
                        </span>
                      </td>
                      <td className="p-3 hidden xl:table-cell">
                        <Switch
                          checked={item.published}
                          onChange={() => handleToggleChange(item.prodId, 'published')}
                          className={`
                            ${item.published ? "bg-green-500" : "bg-gray-300"}
                            relative inline-flex h-5 w-10 items-center rounded-full transition-colors
                          `}>
                          <span
                            className={`
                              ${item.published
                                ? "translate-x-5"
                                : "translate-x-1"}
                              inline-block h-4 w-4 transform bg-white rounded-full transition-transform
                            `} />
                        </Switch>
                      </td>
                      <td className="p-3 hidden xl:table-cell">
                        <Switch
                          checked={item.featured}
                          onChange={() => handleToggleChange(item.prodId, 'featured')}
                          className={`
                            ${item.featured ? "bg-green-500" : "bg-gray-300"}
                            relative inline-flex h-5 w-10 items-center rounded-full transition-colors
                          `}                      >
                          <span
                            className={`
                              ${item.featured
                                ? "translate-x-5"
                                : "translate-x-1"}
                              inline-block h-4 w-4 transform bg-white rounded-full transition-transform
                            `} />
                        </Switch>
                      </td>
                      <td className="p-3 hidden xl:table-cell space-x-2 flex items-center">
                        <button className="bg-blue-100 p-2 rounded-full text-blue-600">
                          <Pencil size={16} onClick={() => setEditingUser(item)} />
                        </button>
                        <button className="bg-green-100 p-2 rounded-full text-green-600">
                          <Eye size={16} />
                        </button>
                        <button className="bg-red-100 p-2 rounded-full text-red-600">
                          <Trash2 size={16} onClick={() => openDeleteConfirmation(item.prodId)} />
                        </button>
                      </td>
                    </tr>

                    {isMobile && isExpanded && (
                      <tr className="bg-gray-50 text-sm text-gray-600">
                        <td colSpan={9} className="px-6 py-4">
                          <div className="space-y-2">
                            <div className="mt-3"><strong>Qty:</strong> {item.quantity}</div>
                            <div className="mt-3">
                              <strong>Approval:</strong>{" "}
                              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                                {item.approval}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-3">
                              <strong>Published:</strong>
                              <Switch
                                checked={item.published}
                                onChange={() => handleToggleChange(item.prodId, 'published')}
                                className={`
                                  ${item.published ? "bg-green-500" : "bg-gray-300"}
                                  relative inline-flex h-5 w-10 items-center rounded-full transition-colors
                                `}                            >
                                <span
                                  className={`
                                    ${item.published
                                      ? "translate-x-5"
                                      : "translate-x-1"}
                                    inline-block h-4 w-4 transform bg-white rounded-full transition-transform
                                  `} />
                              </Switch>
                            </div>
                            <div className="flex items-center gap-2 mt-3">
                              <strong>Featured:</strong>
                              <Switch
                                checked={item.featured}
                                onChange={() => handleToggleChange(item.prodId, 'featured')}
                                className={`
                                  ${item.featured ? "bg-green-500" : "bg-gray-300"}
                                  relative inline-flex h-5 w-10 items-center rounded-full transition-colors
                                `}                            >
                                <span
                                  className={`
                                    ${item.featured
                                      ? "translate-x-5"
                                      : "translate-x-1"}
                                    inline-block h-4 w-4 transform bg-white rounded-full transition-transform
                                  `} />
                              </Switch>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <strong>Options:</strong>
                              <button className="bg-blue-100 p-2 rounded-full text-blue-600">
                                <Pencil size={16} onClick={() => setEditingUser(item)} />
                              </button>
                              <button className="bg-green-100 p-2 rounded-full text-green-600">
                                <Eye size={16} />
                              </button>
                              <button className="bg-red-100 p-2 rounded-full text-red-600">
                                <Trash2 size={16} onClick={() => openDeleteConfirmation(item.prodId)} />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })
            )}
          </tbody>
        </table>
      </div>
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
              value={editingUser.info.BasePrice.replace(/^\$/, "")} // Remove `$` for display
              onChange={(e) => handleEditChange("info.BasePrice", e.target.value)}
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

export default ProductTable;