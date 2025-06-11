import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import apiInstance from '../../utils/axios';
import { useProductContext } from "../../productContex";

const AddProductForm = () => {
  const [loading, setLoading] = useState(true);


  
  // const [showTextOnly, setShowTextOnly] = useState(false);
  // const [hideStock, setHideStock] = useState(false);
  // const [status, setStatus] = useState(true);


  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [fileName, setFileNames] = useState([]);

  const { productData, setProductData } = useProductContext();

  console.log(productData);

  const openProductSelector = () => {
    // Implement your product selection UI
    // This could set a state like: setIsProductModalOpen(true)
  };

  const removeProduct = (productId) => {
    setProductData((prev) => ({
      ...prev,
      frequentlyBought: {
        ...prev.frequentlyBought,
        products: prev.frequentlyBought.products.filter(
          (p) => p.id !== productId
        ),
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Merge all form values into one object
      const finalData = {
        ...productData,
        productName: productData.productName,
        quantity: productData.quantity,
        // category: productData.category,
        productCategory: productData.productCategory,
        unitPrice: productData.unitPrice,
        salePrice: productData.salePrice,
        regularPrice: productData.regularPrice,
        discountDateRange: productData.discountDateRange,
        discount: productData.discount,
        flashDeal: {
          title: productData.flashDeal.title,
          dateRange: productData.flashDeal.dateRange,
          discount: productData.flashDeal.discount,
          discountType: productData.flashDeal.discountType,
        },
        taxAmount: Number(productData.tax.amount),
        taxType: productData.tax.type,
        vatAmount: Number(productData.vat.amount),
        vatType: productData.vat.type,
        flatRate: Boolean(productData.shippingConfig.flatRate),
        frequentlyBoughtProducts: productData.products,
        frequentlyBought: productData.frequentlyBought.categories,
        frequentlyBoughtCategories: productData.frequentlyBought.category,
        description: productData.description,
        // metaImage,
        productdescription: productData.productdescription,
        specification: productData.specification,
        highlights: productData.highlights,
        features: productData.features
      };

      // Prepare FormData
      const formData = new FormData();
      for (const key in finalData) {
        if (key === "galleryImages" && Array.isArray(finalData.galleryImages)) {
          finalData.galleryImages.forEach((file) => {
            formData.append("galleryImages", file);
          });
        } else if (key === "tags") {
          // Convert tags array to comma-separated string
          formData.append("tags", finalData.tags.join(","));
        } else if (key === "metaImage" && finalData.metaImage) {
          formData.append("metaImage", finalData.metaImage);
        } else if (key === "wholesalePrices") {
          formData.append(
            "wholesalePrices",
            JSON.stringify(finalData.wholesalePrices)
          );
        } else if (typeof finalData[key] === "object") {
          formData.append(key, JSON.stringify(finalData[key]));
        } else {
          formData.append(key, finalData[key]);
        }
      }

      formData.append(
        "frequentlyBoughtCategories",
        JSON.stringify(productData.frequentlyBought.categories)
      );

      // API POST
      const response = await apiInstance.post(
        "/sellerdigitalproducts/store",
        formData
      );

      if (response.data.success) {
        alert("Product created successfully!");
        navigate("/products/digitalproducts");
      } else {
        alert("Failed to create product.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("An error occurred while submitting the product.");
    }
  };

  // Simulate data fetching delay
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);


  return (
    <section className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{loading ? <Skeleton width={200} /> : "Add Your Product"}</h2>
        <button className="text-sm text-white px-4 py-2 border rounded bg-[#6f5bbe] ">
          {loading ? <Skeleton width={100} /> : "Clear Tempdata"}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left - General + Images + Meta Tags + Pricing */}
        <div className="xl:col-span-2 space-y-6">
          {/* General */}
          <section className={`p-6 bg-white border border-gray-300 rounded-lg ${loading ? 'skeleton-loading' : ''}`}>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{loading ? <Skeleton width={100} /> : "General"}</h2>
            <form className="space-y-6">
              {/* Product Name */}
              <div className="flex items-start">
                <label className="w-1/4 text-sm font-medium text-gray-700 pt-2">
                  {loading ? <Skeleton width={100} /> : <>Product Name <span className="text-red-500">*</span></>}
                </label>
                {loading ? <Skeleton width="75%" height={36} /> : (
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={productData.productName}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        productName: e.target.value,
                      })
                    }
                    className="w-3/4 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>

              {/* Product File */}
              <div className="flex items-start">
                <label className="w-1/4 text-sm font-medium text-gray-700 pt-2">
                  {loading ? <Skeleton width={100} /> : "Product File"}
                </label>
                {loading ? <Skeleton width="75%" height={36} /> : (
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setProductData((prev) => ({
                          ...prev,
                          pdfSpecification: file,
                        }));
                      }
                    }}
                    className="w-3/4 text-gray-700 border border-gray-300 rounded px-2 py-1 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                  />
                )}
              </div>

              {/* Tags */}
              <div className="flex items-start">
                <label className="w-1/4 text-sm font-medium text-gray-700 pt-2">
                  {loading ? <Skeleton width={50} /> : "Tags"}
                </label>
                <div className="w-3/4">
                  {loading ? <Skeleton height={36} /> : (
                    <input
                      type="text"
                      value={productData.tags}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          tags: [e.target.value],
                        })
                      }
                      placeholder="Type and hit enter"
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                  {loading ? <Skeleton className="mt-1" width="60%" /> : (
                    <p className="text-xs text-gray-500 mt-1">
                      This is used for search. Input those words by which customer
                      can find this product.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </section>

          {/* Images */}
          <section className={`p-6 bg-white border border-gray-300 rounded-lg ${loading ? 'skeleton-loading' : ''}`}>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{loading ? <Skeleton width={80} /> : "Images"}</h2>
            <form className="space-y-6">
              {/* Gallery Images */}
              <div className="flex items-start">
                <label className="w-1/4 text-sm font-medium text-gray-700 pt-2">
                  {loading ? <Skeleton width={120} /> : <>Gallery Images <span className="text-xs">(600x600)</span></>}
                </label>
                {loading ? <Skeleton width="75%" height={36} /> : (
                  <input
                    type="file"
                    multiple
                    onChange={(e) => {
                      const newFiles = Array.from(e.target.files);
                      if (newFiles.length > 0) {
                        setProductData((prev) => ({
                          ...prev,
                          galleryImages: [...prev.galleryImages, ...newFiles],
                        }));

                        setFileNames((prev) => [
                          ...prev,
                          ...newFiles.map((file) => file.name),
                        ]);
                      }
                    }}
                    className="w-3/4 text-gray-700 border border-gray-300 rounded px-2 py-1 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                  />
                )}
              </div>
              {loading ? <Skeleton className="mt-1 mb-4" width="80%" /> : (
                <p className="text-xs text-gray-500 mt-1 mb-4">
                  These images are visible in product details page gallery. Use
                  600x600 size images.
                </p>
              )}

              {/* Thumbnail Image */}
              <div className="flex items-start">
                <label className="w-1/4 text-sm font-medium text-gray-700 pt-2">
                  {loading ? <Skeleton width={130} /> : <>Thumbnail Image <span className="text-xs">(300x300)</span></>}
                </label>
                {loading ? <Skeleton width="75%" height={36} /> : (
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setProductData((prev) => ({
                          ...prev,
                          thumbnailImage: file,
                        }));
                      }
                    }}
                    className="w-3/4 text-gray-700 border border-gray-300 rounded px-2 py-1 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                  />
                )}
              </div>
              {loading ? <Skeleton className="mt-1" width="90%" /> : (
                <p className="text-xs text-gray-500 mt-1">
                  This image is visible in all product box. Use 300x300 size image.
                  Keep some blank space around main object of your image as we had to
                  crop some edge in different devices to make it responsive.
                </p>
              )}
            </form>
          </section>

          {/* Meta Tags */}
          <section className={`p-6 bg-white border border-gray-300 rounded-lg ${loading ? 'skeleton-loading' : ''}`}>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{loading ? <Skeleton width={90} /> : "Meta Tags"}</h2>
            <form className="space-y-6">
              {/* Meta Title */}
              <div className="flex items-start">
                <label className="w-1/4 text-sm font-medium text-gray-700 pt-2">
                  {loading ? <Skeleton width={80} /> : "Meta Title"}
                </label>
                {loading ? <Skeleton width="75%" height={36} /> : (
                  <input
                    type="text"
                    placeholder="Meta Title"
                    value={productData.metaTitle}
                    onChange={(e) =>
                      setProductData((prev) => ({
                        ...prev,
                        metaTitle: e.target.value,
                      }))
                    }
                    className="w-3/4 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>

              {/* Description */}
              <div className="flex items-start">
                <label className="w-1/4 text-sm font-medium text-gray-700 pt-2">
                  {loading ? <Skeleton width={80} /> : "Description"}
                </label>
                {loading ? <Skeleton width="75%" height={100} /> : (
                  <textarea
                    placeholder="Description"
                    rows="4"
                    value={productData.metaDescription}
                    onChange={(e) => {
                      setProductData((prev) => ({
                        ...prev,
                        metaDescription: e.target.value,
                      }));
                    }}
                    className="w-3/4 border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>

              {/* Meta Image */}
              <div className="flex items-start">
                <label className="w-1/4 text-sm font-medium text-gray-700 pt-2">
                  {loading ? <Skeleton width={80} /> : "Meta Image"}
                </label>
                {loading ? <Skeleton width="75%" height={36} /> : (
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setProductData((prev) => ({
                          ...prev,
                          metaImage: file,
                        }));
                      }
                    }}
                    className="w-3/4 text-gray-700 border border-gray-300 rounded px-2 py-1 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                  />
                )}
              </div>
            </form>
          </section>

          {/* Price */}
          <section className={`p-6 bg-white border border-gray-300 rounded-lg ${loading ? 'skeleton-loading' : ''}`}>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{loading ? <Skeleton width={60} /> : "Price"}</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="w-1/4 text-sm font-medium text-gray-700 pt-2">
                  {loading ? <Skeleton width={100} /> : "Regular Price"}
                </label>
                {loading ? <Skeleton width="75%" height={36} /> : (
                  <input
                    type="number"
                    placeholder="0.00"
                    value={productData.regularPrice}
                    onChange={(e) =>
                      setProductData((prev) => ({
                        ...prev,
                        regularPrice: e.target.value,
                      }))
                    }
                    className="w-3/4 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
              <div className="flex items-center">
                <label className="w-1/4 text-sm font-medium text-gray-700 pt-2">
                  {loading ? <Skeleton width={80} /> : "Sale Price"}
                </label>
                {loading ? <Skeleton width="75%" height={36} /> : (
                  <input
                    type="number"
                    placeholder="0.00"
                    value={productData.salePrice}
                    onChange={(e) =>
                      setProductData((prev) => ({
                        ...prev,
                        salePrice: e.target.value,
                      }))
                    }
                    className="w-3/4 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
              <div className="flex items-center">
                <label className="w-1/4 text-sm font-medium text-gray-700 pt-2">
                  {loading ? <Skeleton width={70} /> : "Unit Price"}
                </label>
                {loading ? <Skeleton width="75%" height={36} /> : (
                  <input
                    type="number"
                    placeholder="0.00"
                    value={productData.unitPrice}
                    onChange={(e) =>
                      setProductData((prev) => ({
                        ...prev,
                        unitPrice: e.target.value,
                      }))
                    }
                    className="w-3/4 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
              <div className="flex items-center">
                <label className="w-1/4 text-sm font-medium text-gray-700 pt-2">
                  {loading ? <Skeleton width={30} /> : "Tax"}
                </label>
                <div className="w-3/4 flex items-center gap-4">
                  {loading ? <Skeleton width="40%" height={36} /> : (
                    <>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={productData.tax.amount}
                        onChange={(e) =>
                          setProductData((prev) => ({
                            ...prev,
                            tax: {
                              ...prev.tax,
                              amount: e.target.value,
                            },
                          }))
                        }
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select value={productData.tax.type}
                        onChange={(e) =>
                          setProductData((prev) => ({
                            ...prev,
                            tax: { ...prev.tax, type: e.target.value },
                          }))
                        } className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Flat</option>
                        <option>percentage</option>
                      </select>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-1/4 text-sm font-medium text-gray-700 pt-2">
                  {loading ? <Skeleton width={30} /> : "VAT"}
                </label>
                <div className="w-3/4 flex items-center gap-4">
                  {loading ? <Skeleton width="40%" height={36} /> : (
                    <>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={productData.vat.amount}
                        onChange={(e) =>
                          setProductData((prev) => ({
                            ...prev,
                            vat: {
                              ...prev.vat,
                              amount: e.target.value,
                            },
                          }))
                        }
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select value={productData.vat.type}
                        onChange={(e) =>
                          setProductData((prev) => ({
                            ...prev,
                            vat: { ...prev.vat, type: e.target.value },
                          }))
                        } className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Flat</option>
                        <option>percentage</option>
                      </select>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <label className="w-1/4 text-sm font-medium text-gray-700 pt-2">
                  {loading ? <Skeleton width={140} /> : "Discount Date Range"}
                </label>
                {loading ? <Skeleton width="75%" height={36} /> : (
                  <input
                    type="text"
                    placeholder="Select Date"
                    value={productData.flashDeal.discountDateRange}
                    onChange={(e) =>
                      setProductData((prev) => ({
                        ...prev,
                        flashDeal: { ...prev.flashDeal, dateRange: e.target.value },
                      }))
                    }
                    className="w-3/4 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>

              <div className="flex items-center">
                <label className="w-1/4 text-sm font-medium text-gray-700 pt-2">
                  {loading ? <Skeleton width={60} /> : "Discount"}
                </label>
                <div className="w-3/4 flex items-center gap-4">
                  {loading ? <Skeleton width="40%" height={36} /> : (
                    <>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={productData.flashDeal.discount}
                        onChange={(e) =>
                          setProductData((prev) => ({
                            ...prev,
                            flashDeal: { ...prev.flashDeal, discount: e.target.value },
                          }))
                        }
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select value={productData.flashDeal.discountType}
                        onChange={(e) =>
                          setProductData((prev) => ({
                            ...prev,
                            flashDeal: { ...prev.flashDeal, discountType: e.target.value },
                          }))
                        } className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Flat</option>
                        <option>Percentage</option>
                      </select>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>


          {/* Product Information */}
          <section className={`p-6 bg-white border border-gray-300 rounded-lg ${loading ? 'skeleton-loading' : ''}`}>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{loading ? <Skeleton width={150} /> : "Product Information"}</h2>
            {loading ? (
              <div className="animate-pulse space-y-6">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <form className="space-y-6">
                  <div className="flex items-start flex-col">
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="w-full bg-gray-200 h-24 rounded-md"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mt-1"></div>
                  </div>
                  <div className="flex items-start flex-col">
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="w-full bg-gray-200 h-24 rounded-md"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mt-1"></div>
                  </div>
                  <div className="flex items-start flex-col">
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="w-full bg-gray-200 h-20 rounded-md"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mt-1"></div>
                  </div>
                  <div className="flex items-start flex-col">
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="w-full bg-gray-200 h-20 rounded-md"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mt-1"></div>
                  </div>
                </form>
              </div>
            ) : (
              <form className="space-y-6">
                {/* Description */}
                <div className="flex items-start flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter a description of the product"
                    rows="4"
                    value={productData.productdescription}
                    onChange={(e) => {
                      setProductData((prev) => ({
                        ...prev,
                        productdescription: e.target.value,
                      }));
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use the editor to format your description.
                  </p>
                </div>

                {/* Specification */}
                <div className="flex items-start flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    Specification
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter product specifications"
                    rows="4"
                    value={productData.specification}
                    onChange={(e) => {
                      setProductData((prev) => ({
                        ...prev,
                        specification: e.target.value,
                      }));
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use the editor to format product specifications.
                  </p>
                </div>

                {/* Highlights */}
                <div className="flex items-start flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    Highlights
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter key product highlights"
                    rows="4"
                    value={productData.highlights}
                    onChange={(e) => {
                      setProductData((prev) => ({
                        ...prev,
                        highlights: e.target.value,
                      }));
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use the editor to format product highlights.
                  </p>
                </div>

                {/* Features */}
                <div className="flex items-start flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter product features"
                    rows="4"
                    value={productData.features}
                    onChange={(e) => {
                      setProductData((prev) => ({
                        ...prev,
                        features: e.target.value,
                      }));
                    }}

                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use the editor to format product features.
                  </p>
                </div>
              </form>
            )}
          </section>

          {/* Frequently Bought */}
          <section className={`p-6 bg-white border border-gray-300 rounded-lg ${loading ? 'skeleton-loading' : ''}`}>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{loading ? <Skeleton width={180} /> : "Frequently Bought"}</h2>
            {loading ? (
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="border-b border-gray-200 my-3"></div>
                <div className="flex flex-wrap gap-6 mt-3 text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="w-full sm:w-64 bg-gray-200 h-10 rounded-md"></div>
                </div>
                <div className="mt-6 w-full border border-dashed border-gray-300 rounded-md py-4 text-center text-gray-600 text-sm bg-gray-200">
                  <div className="h-6 bg-gray-200 rounded w-24 mx-auto"></div>
                </div>
              </div>
            ) : (
              <section className="p-6 bg-white border border-gray-300 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800">Frequently Bought</h3>
                <div className="border-b border-gray-200 my-3"></div>

                {/* Radio Options */}
                <div className="flex flex-wrap gap-6 mt-3 text-sm font-medium text-gray-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="frequent"
                      value="product"
                      checked={
                        productData.frequentlyBought.selectionType === "product"
                      }
                      onChange={() =>
                        setProductData((prev) => ({
                          ...prev,
                          frequentlyBought: {
                            ...prev.frequentlyBought,
                            selectionType: "product",
                            category: "", // Reset category when product is selected
                          },
                        }))
                      }
                      className="accent-blue-600 w-4 h-4"
                    />
                    <span className={
                      productData.frequentlyBought.selectionType === "product"
                        ? "font-semibold"
                        : ""
                    }>
                      Select Product
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="frequent"
                      value="category"
                      checked={
                        productData.frequentlyBought.selectionType === "category"
                      }
                      onChange={() =>
                        setProductData((prev) => ({
                          ...prev,
                          frequentlyBought: {
                            ...prev.frequentlyBought,
                            selectionType: "category",
                          },
                        }))
                      }
                      className="accent-blue-600 w-4 h-4"
                    />
                    <span className={
                      productData.frequentlyBought.selectionType === "category"
                        ? " font-semibold"
                        : ""
                    }>
                      Select Category
                    </span>
                  </label>
                </div>

                {/* Category Dropdown */}
                {productData.frequentlyBought.selectionType === "category" && (
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <label className="text-sm text-gray-700 font-medium">Category</label>
                    <select
                      value={productData.frequentlyBought.category}
                      onChange={(e) =>
                        setProductData((prev) => ({
                          ...prev,
                          frequentlyBought: {
                            ...prev.frequentlyBought,
                            category: e.target.value,
                          },
                        }))
                      }
                      className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Select Category</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="grocery">Grocery</option>
                      <option value="books">Books</option>
                    </select>
                  </div>
                )}

                {/* Add More Box - Show only for 'product' selection */}
                {productData.frequentlyBought.selectionType === "product" && (
                  <div className="mt-6">
                    {productData.frequentlyBought.products.length > 0 && (
                      <div className="mb-3 space-y-2">
                        {productData.frequentlyBought.products.map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded"
                          >
                            <span>{product.name}</span>
                            <button
                              onClick={() => removeProduct(product.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div onClick={openProductSelector} className="w-full border border-dashed border-gray-300 rounded-md py-4 text-center text-gray-600 text-sm hover:bg-gray-50 cursor-pointer transition">
                      + Add More
                    </div>
                  </div>
                )}
              </section>
            )}
          </section>
        </div>

        {/* Product Category */}
        <div className={`border border-gray-300 rounded-lg p-6 h-fit xl:w-full ${loading ? 'skeleton-loading' : ''}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">{loading ? <Skeleton width={150} /> : "Product Category"}</h2>
            {loading ? <Skeleton width={20} /> : <span className="text-sm text-gray-600">Select Main <span className="p-2 border rounded rounded-lg">?</span></span>}
          </div>
          {loading ? (
            <div className="animate-pulse">
              <div className="flex items-center justify-between gap-2 px-3 py-2 rounded mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2 px-3 py-2 rounded mb-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" value="Software"
                  checked={
                    productData.productCategory === "Software"
                  }
                  onChange={() =>
                    setProductData((prev) => ({
                      ...prev,
                      productCategory: "Software",
                    }))
                  } />
                <label className="text-sm">Software</label>
              </div>
              <input type="radio" />
            </div>
          )}
        </div>
      </div>

      {/* Save Product Button */}
      <div className="button-group mt-6">
        {loading ? (
          <div className="animate-pulse">
            <div className="w-32 h-10 bg-gray-200 rounded-md mx-auto"></div>
          </div>
        ) : (
          <button className="bg-[#2d254c] text-white p-3 rounded" onClick={handleSubmit}>Save Product</button>
        )}
      </div>
    </section>
  );
};

export default AddProductForm;


















































