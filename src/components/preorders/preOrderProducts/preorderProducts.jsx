// import {
//   Eye,
//   Edit,
//   EyeIcon,
//   Trash2,
//   Edit2,
//   ChevronDownIcon,
// } from "lucide-react";
import {

  EyeIcon,
  Trash2,
  Edit2,
  ChevronDownIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import "./preOrderProducts.scss";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
// import apiInstance from "../../../utils/axios";
import axios from "axios";
import DeleteConfirmation from "../../DeleteConfirmation";

export default function PreorderProducts() {

  const [selected, setSelected] = useState([]);

  // const [selectAll, setSelectAll] = useState(false);

  const [loading, setLoading] = useState(true);
  const [uploadsRemaining, setUploadsRemaining] = useState(null);
  const [currentPackage, setCurrentPackage] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [expandedRows, setExpandedRows] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isMobile, setIsMobile] = useState(false);

 
 


  const navigate = useNavigate();

  // const [expandedId, setExpandedId] = useState(null);

  const [editingUser, setEditingUser] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [attributeToDeleteId, setAttributeToDeleteId] = useState(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setUploadsRemaining(353);
      setCurrentPackage("Platinum");
      setLoading(false);
    }, 1500); // Adjust the time to match your actual loading time
  }, []);

  // const handleCheckboxChange = (user) => {
  //   let updatedSelected;
  //   if (selected.some((item) => item.id === user.id)) {
  //     // If already selected, remove from the array
  //     updatedSelected = selected.filter((item) => item.id !== user.id);
  //   } else {
  //     // Otherwise, add to the array
  //     updatedSelected = [...selected, user];
  //   }

  //   // setSelected(updatedSelected);
  //   // setSelectAll(updatedSelected.length === products.length);

  //   // // Console logs
  //   // console.log("Selected Users:", updatedSelected);
  //   // console.log(
  //   //   "Select All Status:",
  //   //   updatedSelected.length === products.length
  //   // );
  // };


  const handleCheckboxChange = (user) => {
    let updatedSelected;
    if (selected.some((item) => item.id === user.id)) {
      // Already selected — remove it
      updatedSelected = selected.filter((item) => item.id !== user.id);
    } else {
      // Add to selection
      updatedSelected = [...selected, user];
    }

    setSelected(updatedSelected); // ✅ Now used, no warning

    // Optional: if you have a full product list
    // setSelectAll(updatedSelected.length === products.length);

    console.log("Selected Users:", updatedSelected);
  };


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await apiInstance.get("/sellerpreorderproducts");
  //       if (response.data.success) {
  //         const products = response.data.data.map((item, index) => ({

  //           id: index + 1,
  //           prodId: item._id,
  //           productName: item.productName,
  //           minPurchaseQty: item.minPurchaseQty,
  //           unitPrice: item.unitPrice,
  //           quantity: item.quantity,
  //           unit: item.unit,
  //           type: item.type,
  //           category: item.category,
  //           productCreated: item.createdAt,
  //           refund: item.refundable,
  //           availability: item.availability,
  //           prePaymentNeeded: item.prePaymentNeeded,
  //           discount: item.discount,
  //           approval: item.approval,
  //           productOwner: "Admin",
  //           lowStockWarning: item.lowStockQuantityWarning || 0,
  //           info: {
  //             NumofSale: "0 times",
  //             BasePrice: `$${item.unitPrice.toFixed(2)}`,
  //             Rating: "0",
  //           },
  //           totalstock:
  //             item.quantity < item.lowStockQuantityWarning ? "Low" : "In Stock",
  //           todaysdeal: item.flashDeal?.isActive || false,
  //           published: item.published,
  //           featured: item.featured,
  //           externalLink: item.externalLink,
  //           externalLinkButtonText: item.externalLinkButtonText,
  //           metaTitle: item.metaTitle,
  //           metaDescription: item.metaDescription,
  //           videoLink: item.videoLink,
  //           thumbnailImage: item.thumbnailImage,
  //         }));
  //         setUserData(products);
  //         console.log("Fetched products:", products);
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch wholesale products:", err);
  //     }
  //   };

  //   fetchData();
  // }, []);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://e-commerce-backend-1-0.onrender.com/api/sellerpreorderproducts");
        if (response.data.success) {
        
          const products = response.data.data.map((item, index) => ({
            id: index + 1,
            prodId: item._id,
            productName: item.productName,
            minPurchaseQty: item.minPurchaseQty,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            unit: item.unit,
            
            category: item.category?.name || "N/A", 
            type: item.type?.name || "N/A", 
            
            productCreated: item.createdAt,
            refund: item.refundable,
            availability: item.availability,
            prePaymentNeeded: item.prePaymentNeeded,
            discount: item.discount,
            approval: item.approval,
            productOwner: "Admin",
            lowStockWarning: item.lowStockQuantityWarning || 0,
            info: {
              NumofSale: "0 times",
              BasePrice: `$${item.unitPrice.toFixed(2)}`,
              Rating: "0",
            },
            totalstock:
              item.quantity < item.lowStockQuantityWarning ? "Low" : "In Stock",
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

  // const toggleExpand = (index) => {
  //   setExpandedRows((prev) =>
  //     prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
  //   );
  // };

  // const handlereview = (e) => {
  //   e.preventDefault();
  //   navigate("/sellerpreorderproducts/store");
  // };

  const handleToggleChange = async (prodId, field) => {
    const product = userData.find((u) => u.prodId === prodId);
    if (!product) return;

    const newValue = !product[field];

    const updatedProduct = {
      ...product,
      [field]: newValue,
    };

    // Optimistically update UI
    setUserData((prevUser) =>
      prevUser.map((user) =>
        user.prodId === prodId ? { ...user, [field]: newValue } : user
      )
    );

    try {
      await axios.put(`https://e-commerce-backend-1-0.onrender.com/api/sellerpreorderproducts/update/${prodId}`, {
        published: updatedProduct.published,
        approval: updatedProduct.approval,
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
      const cleanPayload = {
        productName: editingUser.productName,
        productOwner: editingUser.productOwner,
        category: editingUser.category,
        type: editingUser.type,
        minPurchaseQty: parseInt(editingUser.minPurchaseQty),
        refundable: editingUser.refundable,
        unitPrice: parseFloat(editingUser.unitPrice),
        unit: editingUser.unit,
        discount: editingUser.discount,
        availability: editingUser.availability,
        preorder: editingUser.preorder,
        finalOrder: editingUser.finalOrder,
        published: editingUser.published,
        approval: editingUser.approval,
        thumbnailImage: editingUser.thumbnailImage,
        info: {
          BasePrice: editingUser.info.BasePrice,
        },
        totalstock: editingUser.totalstock,
      };

      const formData = new FormData();
      for (const key in cleanPayload) {
        if (typeof cleanPayload[key] === "object" && key === "info") {
          formData.append("BasePrice", cleanPayload[key].BasePrice);
        } else {
          formData.append(key, cleanPayload[key]);
        }
      }

      // const { data } = await apiInstance.put(
      //   `/sellerpreorderproducts/update/${editingUser.prodId}`,
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );

      await axios.put(
        `https://e-commerce-backend-1-0.onrender.com/api/sellerpreorderproducts/update/${editingUser.prodId}`,
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
                editingUser.quantity < editingUser.lowStockWarning
                  ? "Low"
                  : "In Stock",
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
      const { data } = await axios.delete(
        `https://e-commerce-backend-1-0.onrender.com/api/sellerpreorderproducts/delete/${prodId}`
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
  const handleClick = () => {
    navigate("/preorder/addpreorder");
  };

  


  // Function to handle "Select All"
  // const handleSelectAll = () => {
  //   if (selectAll) {
  //     setSelected([]); // Deselect all
  //     console.log("Deselecting All products");
  //   } else {
  //     setSelected(products); // Select all products
  //     console.log("Selecting All products:", products);
  //   }
  //   setSelectAll(!selectAll);
  //   console.log("Select All Checkbox:", !selectAll);
  // };

  return (
    <div className="PreorderProducts ma10">
      <div className="preOrderProductsBox">
        <div className="preOrderProductsHeader">
          <p className="text-2xl md:text-2xl">Preorder Products</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
            {/* Remaining Uploads */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg p-6 flex flex-col items-center justify-center shadow-md">
              <div className="bg-white/20 p-3 rounded-full mb-3">
                {loading ? (
                  <Skeleton circle width={32} height={32} />
                ) : (
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
              <div className="text-4xl font-bold">
                {loading ? <Skeleton width={60} /> : uploadsRemaining}
              </div>
              <div className="text-sm mt-1">
                {loading ? <Skeleton width={120} /> : "Remaining Uploads"}
              </div>
            </div>

            {/* Add New Product */}
            <div className="bg-white border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-md transition">
              <button
                onClick={handleClick}
                className="bg-gray-100 p-4 rounded-full text-gray-600"
                disabled={loading}
              >
                {loading ? (
                  <Skeleton circle width={32} height={32} />
                ) : (
                  <Plus size={32} />
                )}
              </button>
              <div className="mt-2 text-sm font-medium text-gray-700">
                {loading ? <Skeleton width={140} /> : "Add New Product"}
              </div>
            </div>

            {/* Current Package */}
            <div className="bg-white rounded-lg p-6 border flex flex-col items-center justify-center shadow-sm">
              <div className="text-blue-600 text-3xl mb-2">
                {loading ? <Skeleton width={36} /> : "🌟"}
              </div>
              <div className="text-sm font-medium text-gray-700">
                {loading ? (
                  <>
                    Current Package:{" "}
                    <strong>
                      <Skeleton width={80} />
                    </strong>
                  </>
                ) : (
                  <>
                    Current Package: <strong>{currentPackage}</strong>
                  </>
                )}
              </div>
              <button
                className="mt-2 px-4 py-2 text-sm bg-white border border-gray-400 rounded-full hover:bg-gray-100"
                disabled={loading}
              >
                {loading ? <Skeleton width={120} /> : "Upgrade Package"}
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white shadow-md rounded-lg">
          {/* Header */}
          <div className="mb-4 border-b pb-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              {/* Left Menu */}
              <div className="flex gap-4 mb-3 md:mb-0">
                <p className="font-semibold text-blue-600">
                  {loading ? (
                    <Skeleton width={150} />
                  ) : (
                    `Total Products (${userData.length})`
                  )}
                </p>
              </div>

              {/* Right Menu */}
              <div className="flex gap-4 text-gray-600">
                <p>{loading ? <Skeleton width={100} /> : "Published (7)"}</p>
                <p>{loading ? <Skeleton width={120} /> : "Unpublished (3)"}</p>
                <p>{loading ? <Skeleton width={130} /> : "Discounted (5)"}</p>
              </div>
            </div>

            {/* Lower Menu: Filter, Search */}
            <div className="mt-4 flex flex-wrap items-center gap-4">
              {/* Bulk Action */}
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">
                  {loading ? <Skeleton width={80} /> : "Bulk Action"}
                </p>
                {loading ? (
                  <Skeleton width={18} height={18} />
                ) : (
                  <ChevronDownIcon size={18} />
                )}
              </div>

              {/* Filter */}
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">
                  {loading ? <Skeleton width={70} /> : "Filter by"}
                </p>
                {loading ? (
                  <Skeleton width={18} height={18} />
                ) : (
                  <ChevronDownIcon size={18} color="grey" />
                )}
              </div>

              {/* Search */}
              {loading ? (
                <Skeleton width={200} height={35} className="rounded-md" />
              ) : (
                <input
                  type="text"
                  placeholder="Type email to search"
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-[40px]  md:w-[40px] lg:w-[40px]"
                  disabled={loading}
                />
              )}

              {loading ? (
                <Skeleton width={80} height={35} />
              ) : (
                <button
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm"
                  disabled={loading}
                >
                  Search
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm-center text-left border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "",
                    "Image",
                    "Product Details",
                    "Product Details",
                    "Price Sett",
                    "Discount",
                    "Availability",
                    "Orders",
                    "Status",
                    "Approval",
                    "Actions",
                  ].map((header, idx) => (
                    <th
                      key={idx}
                      className="px-4 py-2 font-semibold text-gray-700"
                    >
                      {loading ? <Skeleton width={80} /> : header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array(5)
                    .fill(null)
                    .map((_, index) => (
                      <tr key={index} className="border-t">
                        {Array(11)
                          .fill(null)
                          .map((_, i) => (
                            <td key={i} className="px-4 py-3">
                              <Skeleton
                                width={i === 1 ? 50 : 80}
                                height={i === 1 ? 50 : 20}
                              />
                            </td>
                          ))}
                      </tr>
                    ))
                  : userData.map((product) => (
                    <tr
                      key={product.id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          checked={selected.some(
                            (item) => item.id === product.id
                          )}
                          onChange={() => handleCheckboxChange(product)}
                          disabled={loading}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <img
                          src={product.thumbnailImage}
                          alt=""
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <p className="font-semibold">{product.productName}</p>
                        <p className="text-xs text-gray-500">
                          Category: {product.category}
                        </p>
                        <p className="text-xs text-gray-500">
                          Type: {product.type}
                        </p>
                        <p className="text-xs text-gray-500">
                          Created:{" "}
                          {
                            new Date(product.productCreated)
                              .toISOString()
                              .split("T")[0]
                          }
                        </p>
                      </td>
                      <td className="px-4 py-2">
                        <p className="text-sm">
                          Min Qty: {product.minPurchaseQty} pc
                        </p>
                        <p className="text-sm">
                          Refund: {product.refundable === true ? "Yes" : "No"}
                        </p>
                      </td>
                      <td className="px-4 py-2">
                        <p className="text-sm">
                          {product.unitPrice} / {product.unit}
                        </p>
                        <p className="text-sm">
                          Pre-payment:{" "}
                          {product.prePaymentNeeded ? "Yes" : "No"}
                        </p>
                      </td>
                      <td className="px-4 py-2 text-sm">
                        {product.discount}
                      </td>
                      <td className="px-4 py-2 text-sm">
                        {product.availability}
                      </td>
                      <td className="px-4 py-2">
                        <p className="text-sm">Pre: {product.preorder}</p>
                        <p className="text-sm">Final: {product.finalOrder}</p>
                      </td>
                      <td className="px-4 py-2">
                        <label className="flex items-center gap-2">
                          <span>Publish</span>
                          <Switch
                            checked={product.published}
                            onChange={() =>
                              handleToggleChange(product.prodId, "published")
                            }
                            className={`
                              ${product.published
                                ? "bg-green-500"
                                : "bg-gray-300"
                              }
                              relative inline-flex h-5 w-10 items-center rounded-full transition-colors
                              `}
                          >
                            <span
                              className={`
                                ${product.published
                                  ? "translate-x-5"
                                  : "translate-x-1"
                                }
                                inline-block h-4 w-4 transform bg-white rounded-full transition-transform
                                `}
                            ></span>
                          </Switch>
                        </label>
                      </td>
                      <td className="px-4 py-2 text-sm">
                        <Switch
                          checked={product.approval}
                          onChange={() =>
                            handleToggleChange(product.prodId, "approval")
                          }
                          className={`
                              ${product.approval
                              ? "bg-green-500"
                              : "bg-gray-300"
                            }
                              relative inline-flex h-5 w-10 items-center rounded-full transition-colors
                              `}
                        >
                          <span
                            className={`
                                ${product.approval
                                ? "translate-x-5"
                                : "translate-x-1"
                              }
                                inline-block h-4 w-4 transform bg-white rounded-full transition-transform
                                `}
                          ></span>
                        </Switch>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          type="button"
                          className="p-2 bg-gray-100 rounded hover:bg-blue-100 transition me-2"
                        >
                          <EyeIcon size={18} className="text-blue-500" />
                        </button>
                        <button
                          type="button"
                          className="p-2 bg-gray-100 rounded hover:bg-blue-100 transition me-2"
                          onClick={() => setEditingUser(product)}
                        >
                          <Edit2 size={18} className="text-blue-500" />
                        </button>
                        <button
                          type="button"
                          className="p-2 bg-gray-100 rounded hover:bg-blue-100 transition"
                          onClick={() =>
                            openDeleteConfirmation(product.prodId)
                          }
                        >
                          <Trash2 size={18} className="text-blue-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {editingUser && (
            <div className="edit-modal">
              <form
                className="edit-form"
                style={{ width: "600px" }}
                onSubmit={handleEditSubmit}
              >
                <h2 className="text-lg font-bold mb-4">Edit Product</h2>

                <div className="flex align-center justify-between gap-2 sellerPreorder">
                  <div>
                    <input
                      type="text"
                      value={editingUser.productName}
                      onChange={(e) =>
                        handleEditChange("productName", e.target.value)
                      }
                      placeholder="Product Name"
                    />

                    <input
                      type="text"
                      value={editingUser.productOwner}
                      onChange={(e) =>
                        handleEditChange("productOwner", e.target.value)
                      }
                      placeholder="Product Owner"
                    />

                    <input
                      type="text"
                      value={editingUser.category}
                      onChange={(e) =>
                        handleEditChange("category", e.target.value)
                      }
                      placeholder="Category"
                    />

                    <input
                      type="text"
                      value={editingUser.type}
                      onChange={(e) => handleEditChange("type", e.target.value)}
                      placeholder="Type"
                    />

                    <input
                      type="number"
                      value={editingUser.minPurchaseQty}
                      onChange={(e) =>
                        handleEditChange("minPurchaseQty", e.target.value)
                      }
                      placeholder="Min Purchase Qty"
                    />

                    <select
                      value={editingUser.refundable ? "true" : "false"}
                      onChange={(e) =>
                        handleEditChange(
                          "refundable",
                          e.target.value === "true"
                        )
                      }
                    >
                      <option value="true">Refundable</option>
                      <option value="false">Non-Refundable</option>
                    </select>

                    <input
                      type="text"
                      value={editingUser.info.BasePrice.replace(/^\$/, "")}
                      onChange={(e) =>
                        handleEditChange("info.BasePrice", e.target.value)
                      }
                      placeholder="Base Price"
                    />
                    <input
                      type="text"
                      value={editingUser.availablity}
                      onChange={(e) =>
                        handleEditChange("availablity", e.target.value)
                      }
                      placeholder="Total Stock"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={editingUser.unitPrice}
                      onChange={(e) =>
                        handleEditChange("unitPrice", e.target.value)
                      }
                      placeholder="Unit Price"
                    />

                    <input
                      type="text"
                      value={editingUser.unit}
                      onChange={(e) => handleEditChange("unit", e.target.value)}
                      placeholder="Unit"
                    />

                    <input
                      type="text"
                      value={editingUser.discount}
                      onChange={(e) =>
                        handleEditChange("discount", e.target.value)
                      }
                      placeholder="Discount"
                    />

                    <input
                      type="text"
                      value={editingUser.availability}
                      onChange={(e) =>
                        handleEditChange("availability", e.target.value)
                      }
                      placeholder="Availability"
                    />

                    <input
                      type="text"
                      value={editingUser.preorder}
                      onChange={(e) =>
                        handleEditChange("preorder", e.target.value)
                      }
                      placeholder="Pre-order"
                    />

                    <input
                      type="text"
                      value={editingUser.finalOrder}
                      onChange={(e) =>
                        handleEditChange("finalOrder", e.target.value)
                      }
                      placeholder="Final Order"
                    />

                    <label className="flex items-center gap-2">
                      <span>Published</span>
                      <input
                        type="checkbox"
                        className="mb-0"
                        checked={editingUser.published}
                        onChange={(e) =>
                          handleEditChange("published", e.target.checked)
                        }
                      />
                    </label>

                    <label className="flex items-center gap-2">
                      <span>Approval</span>
                      <input
                        type="checkbox"
                        className="mb-0"
                        checked={editingUser.approval}
                        onChange={(e) =>
                          handleEditChange("approval", e.target.checked)
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className="form-buttons mt-4 flex gap-2">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setEditingUser(null)}
                  >
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
      </div>
    </div>
  );
}



