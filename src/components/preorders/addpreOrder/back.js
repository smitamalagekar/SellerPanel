import { Bold, Delete, Edit, Trash } from "lucide-react";
import "./addpreorder.css";
import { MdOutlineSettings } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import ProductPriceDiscounts from "../../Wholesale/Productpricedelivery";
import Switch from "../../Switch";
import ProductCategory from "../../ProductCategory";
import ProductSettings from "../../Wholesale/Productsetting";
import CashOnDeliverySettings from "../../Wholesale/Cashondelivery";
import MoreProductsToPreorder from "../../Wholesale/Producttopreorder";
import Shippingsetting from "../../Wholesale/Shippingsetting";
import Skeleton from "react-loading-skeleton";
import { useProductContext } from "../../../productContex";
import apiInstance from "../../../utils/axios";
// import { useProductContext } from "../../productContex";
// import Switch from "./Switch";

export default function WholesaleCreate() {
  // const [quantity, setQuantity] = React.useState(1);

  // const [showQuantity, setShowQuantity] = useState(true);
  const [showTextOnly, setShowTextOnly] = useState(false);
  const [hideStock, setHideStock] = useState(false);

  const [status, setStatus] = useState(true);

  // const [showShipping, setShowShipping] = useState(true);
  // const [showRate, setShowRate] = useState(true);
  // const [showMulitiply, setShowMulitiply] = useState(true);
  // const [showStatus, setShowStatus] = useState(true);
  // const [showFeatured, setShowFeatured] = useState(true);
  // const [showDeal, setShowDeal] = useState(true);
  // const [tax, setTax] = useState("");
  // const [vat, setVat] = useState("");
  // const [taxType, setTaxType] = useState("Flat");
  // const [vatType, setVatType] = useState("Flat");

  // const [flashTitle, setFlashTitle] = useState("");
  // const [discount, setDiscount] = useState(0);
  // const [discountType, setDiscountType] = useState("");
  // const [shippingDays, setShippingDays] = useState("");

  // const [selectedOption, setSelectedOption] = useState("product");
  // const [selectedCategory, setSelectedCategory] = useState("");
  // const [description, setDescription] = useState("");
  // const [videoProvider, setVideoProvider] = useState("Youtube");
  // const [videoLink, setVideoLink] = useState("");

  const navigate = useNavigate();

  const [wholesalePrices, setWholesalePrices] = useState([
    { minQT: "", maxQT: "", price: "" },
  ]);

  const addWholesalePrice = () => {
    setWholesalePrices([
      ...wholesalePrices,
      { minQT: "", maxQT: "", price: "" },
    ]);
  };

  const removeWholesalePrice = (index) => {
    const newPrices = [...wholesalePrices];
    newPrices.splice(index, 1);
    setWholesalePrices(newPrices);
  };

  const [fileName, setFileNames] = useState([]);

  const handleFileChange = (index) => (event) => {
    const file = event.target.files[0];
    const updatedNames = [...fileName];

    updatedNames[index] = file ? file.name : "Choose file";
    setFileNames(updatedNames);

    // Reset input so re-selecting same file still triggers onChange
    event.target.value = null;
  };

  // const [isRefundable, setIsRefundable] = useState(false);

  // const [metaImage, setMetaImage] = useState(null);
  const { productData, setProductData } = useProductContext();

  // const [isWarranty, setIsWarranty] = useState(false);
  // const [warrantyType, setWarrantyType] = useState("");

  console.log(productData);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     navigate("/wholesale/CreateWholesale");
  //   };

  // const faqs = [
  //   {
  //     id: 1,
  //     name: "MistyRose",
  //   },
  //   {
  //     id: 2,
  //     name: "Ivory",
  //   },
  //   {
  //     id: 3,
  //     name: "Silver",
  //   },
  //   {
  //     id: 4,
  //     name: "DarkGray",
  //   },
  //   {
  //     id: 5,
  //     name: "LightGrey",
  //   },
  // ];

  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await apiInstance.get("/brands/getall"); // Adjust base URL if needed
        if (res.data.success) {
          setBrands(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching brands:", err);
      }
    };

    fetchBrands();
  }, []);

  const openProductSelector = () => {
    // Implement your product selection UI
    // This could set a state like: setIsProductModalOpen(true)
  };

  const addProducts = (selectedProducts) => {
    setProductData((prev) => ({
      ...prev,
      frequentlyBought: {
        ...prev.frequentlyBought,
        products: [...prev.frequentlyBought.products, ...selectedProducts],
      },
    }));
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

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Merge all form values into one object
      const finalData = {
        ...productData,
        lowStockWarning: productData.lowStockWarning,
        quantity: productData.quantity,
        showStockWithTextOnly: showTextOnly,
        hideStock,
        status,
        // flashDeal: {
        //   isActive: Boolean(productData.flashDeal.isActive),
        //   title: productData.flashDeal.title,
        //   discount: productData.flashDeal.discount,
        //   discountType: productData.flashDeal.discountType,
        // },
        taxAmount: Number(productData.tax.amount),
        taxType: productData.tax.type,
        vatAmount: Number(productData.vat.amount),
        vatType: productData.vat.type,
        cashOnDelivery: Boolean(productData.shippingConfig.cashOnDelivery),
        freeShipping: Boolean(productData.shippingConfig.freeShipping),
        flatRate: Boolean(productData.shippingConfig.flatRate),
        isProductQuantityMultiply: Boolean(
          productData.shippingConfig.isProductQuantityMultiply
        ),
        shippingDays: Number(productData.shippingConfig.shippingDays),
        refundable: Boolean(productData.refundable),
        warranty: productData.warranty,
        // selectionType: productData.frequentlyBought.selectedOption,
        frequentlyBoughtProducts: productData.products,
        frequentlyBought: productData.frequentlyBought.categories,
        frequentlyBoughtCategories: productData.frequentlyBought.category,
        description: productData.description,
        // metaImage,
        wholesalePrices: wholesalePrices.map(({ minQT, maxQT, price }) => ({
          minQty: Number(minQT),
          maxQty: Number(maxQT),
          price: Number(price),
        })),
        videoProvider: productData.videoProvider,
        videoLink: productData.videoLink,
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
        "/wholesaleProduct/create",
        formData
      );

      if (response.data.success) {
        alert("Product created successfully!");
        navigate("/wholesale/all");
      } else {
        alert("Failed to create product.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("An error occurred while submitting the product.");
    }
  };

  const [quantity, setQuantity] = React.useState(1);

  const [showQuantity, setShowQuantity] = useState(true);

  const [showShipping, setShowShipping] = useState(true);
  const [showRate, setShowRate] = useState(true);
  const [showMulitiply, setShowMulitiply] = useState(true);
  const [showStatus, setShowStatus] = useState(true);
  const [showFeatured, setShowFeatured] = useState(true);
  const [showDeal, setShowDeal] = useState(true);
  const [tax, setTax] = useState("");
  const [vat, setVat] = useState("");
  const [taxType, setTaxType] = useState("Flat");
  const [vatType, setVatType] = useState("Flat");

  const [flashTitle, setFlashTitle] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState("");
  const [shippingDays, setShippingDays] = useState("");

  const [selectedOption, setSelectedOption] = useState("product");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [videoProvider, setVideoProvider] = useState("Youtube");
  const [videoLink, setVideoLink] = useState("");

  const [description, setDescription] = useState("");

  const [isRefundable, setIsRefundable] = useState(false);

  const [metaImage, setMetaImage] = useState(null);
  // const { productData, setProductData } = useProductContext()

  console.log(productData);

  const [isWarranty, setIsWarranty] = useState(false);
  const [warrantyType, setWarrantyType] = useState("");

  const [shippingCost, setShippingCost] = useState(0); // Shipping cost state

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const faqs = [
    {
      id: 1,
      name: "MistyRose",
    },
    {
      id: 2,
      name: "Ivory",
    },
    {
      id: 3,
      name: "Silver",
    },
    {
      id: 4,
      name: "DarkGray",
    },
    {
      id: 5,
      name: "LightGrey",
    },
  ];
  return (
    <div className="PreOrderFaq-whole ">
      <div className="product-table">
        <p className="text-2xl md:text-2xl mt-4 ml-6">Add Preorder Product</p>
      </div>
      <div className="preOrderFaqBox-new">
        <div className="procol">
          <div className="preOrderFaqLeft-new">
            <div className="border p-4 rounded">
              <div className="">
                <p className="allFaq">
                  {loading ? <Skeleton width={150} /> : "Product Information"}
                </p>
                {/* <input type="text" placeholder="Type to search...." className="searchFaq" /> */}
              </div>
              <br></br>
              <div className="seo-divider"></div>
              <div className="preOrderLeftLower">
                <form className="addwhole-form">
                  {/* Product Name */}
                  <div className="addwhole-field">
                    <label className="addwhole-label">
                      {loading ? (
                        <Skeleton width={180} />
                      ) : (
                        <>
                          Product Name <span className="required">*</span>
                        </>
                      )}
                    </label>
                    {loading ? (
                      <Skeleton height={35} />
                    ) : (
                      <input
                        type="text"
                        className="addwhole-input"
                        placeholder="Product Name"
                        disabled={loading}
                        onChange={(e) =>
                          setProductData({
                            ...productData,
                            productName: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>

                  {/* Brand */}
                  <div className="addwhole-field">
                    <label className="addwhole-label">
                      {loading ? <Skeleton width={80} /> : "Brand"}
                    </label>
                    {loading ? (
                      <Skeleton height={35} />
                    ) : (
                      <select
                        className="addwhole-input"
                        disabled={loading}
                        onChange={(e) =>
                          setProductData({
                            ...productData,
                            brand: e.target.value,
                          })
                        }
                      >
                        <option>Select Brand</option>
                        {brands.map((brand) => (
                          <option key={brand._id} value={brand.name}>
                            {brand.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  {/* unit */}
                  <div className="addwhole-field">
                    <label className="addwhole-label">
                      {loading ? (
                        <Skeleton width={150} />
                      ) : (
                        <>
                          Unit <span className="required">*</span>
                        </>
                      )}
                    </label>
                    {loading ? (
                      <Skeleton height={35} />
                    ) : (
                      <input
                        type="text"
                        className="addwhole-input"
                        placeholder="Unit (e.g. KG, Pc etc)"
                        value={productData.unit}
                        onChange={(e) =>
                          setProductData({
                            ...productData,
                            unit: e.target.value,
                          })
                        }
                        disabled={loading}
                      />
                    )}
                  </div>
                  {/* Minimum Purchase Qty */}
                  <div className="addwhole-field">
                    <label className="addwhole-label">
                      {loading ? (
                        <Skeleton width={200} />
                      ) : (
                        <>
                          Minimum Purchase Qty{" "}
                          <span className="required">*</span>
                        </>
                      )}
                    </label>
                    {loading ? (
                      <Skeleton height={35} />
                    ) : (
                      <input
                        type="number"
                        className="addwhole-input"
                        placeholder="1"
                        disabled={loading}
                        value={productData.minPurchaseQty}
                        onChange={(e) =>
                          setProductData({
                            ...productData,
                            minPurchaseQty: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                  {/* Tags */}
                  <div className="addwhole-tags">
                    <div className="addwhole-tags-field">
                      <label className="addwhole-tags-label">
                        {loading ? (
                          <Skeleton width={80} />
                        ) : (
                          <>
                            Tags <span className="required">*</span>
                          </>
                        )}
                      </label>
                      {loading ? (
                        <Skeleton height={35} />
                      ) : (
                        <input
                          type="text"
                          className="addwhole-tags-input"
                          placeholder="Type and hit enter to add a tag"
                          disabled={loading}
                          value={productData.tags}
                          onChange={(e) =>
                            setProductData({
                              ...productData,
                              tags: [e.target.value],
                            })
                          }
                        />
                      )}
                    </div>
                    {loading ? (
                      <Skeleton width={300} />
                    ) : (
                      <p className="addwhole-tags-helper">
                        This is used for search. Input those words by which
                        customers can find this product.
                      </p>
                    )}
                  </div>
                  {/* Barcode */}
                  <div className="addwhole-field">
                    <label className="addwhole-label">
                      {loading ? <Skeleton width={80} /> : "Barcode"}
                    </label>
                    {loading ? (
                      <Skeleton height={35} />
                    ) : (
                      <input
                        type="text"
                        className="addwhole-input"
                        placeholder="Barcode"
                        disabled={loading}
                        value={productData.barcode}
                        onChange={(e) =>
                          setProductData((prev) => ({
                            ...prev,
                            barcode: e.target.value,
                          }))
                        }
                      />
                    )}
                  </div>
                </form>
              </div>
            </div>

            <div className="pro-container">
              <h3 className="pro-heading">Product Files & Media</h3>
              <div className="seo-divider"></div>
              {/* Gallery Images */}
              <div className="pro-field">
                <label className="pro-label">
                  {loading ? (
                    <Skeleton width={180} />
                  ) : (
                    <>
                      Gallery Images <span className="pro-size">(600×600)</span>
                    </>
                  )}
                </label>
                {loading ? (
                  <Skeleton height={35} />
                ) : (
                  <div className="pro-file-input">
                    <label className="pro-btn m-0">
                      Browse
                      <input
                        type="file"
                        className="pro-input"
                        multiple
                        onChange={(e) => {
                          const newFiles = Array.from(e.target.files);
                          if (newFiles.length > 0) {
                            setProductData((prev) => ({
                              ...prev,
                              galleryImages: [
                                ...prev.galleryImages,
                                ...newFiles,
                              ],
                            }));

                            setFileNames((prev) => [
                              ...prev,
                              ...newFiles.map((file) => file.name),
                            ]);
                          }
                        }}
                        hidden
                      />
                    </label>
                    <span className="pro-placeholder">
                      {fileName.length > 0
                        ? fileName.join(", ")
                        : "No files chosen"}
                    </span>
                  </div>
                )}
                {loading ? (
                  <Skeleton width={350} />
                ) : (
                  <p className="pro-helper">
                    These images are visible in the product details page
                    gallery. Use 600×600 size images.
                  </p>
                )}
              </div>

              {/* Thumbnail Image */}
              <div className="pro-field">
                <label className="pro-label">
                  {loading ? (
                    <Skeleton width={180} />
                  ) : (
                    <>
                      Thumbnail Image{" "}
                      <span className="pro-size">(300×300)</span>
                    </>
                  )}
                </label>
                {loading ? (
                  <Skeleton height={35} />
                ) : (
                  <div className="pro-file-input">
                    <label className="pro-btn m-0">
                      Browse
                      <input
                        type="file"
                        className="pro-input"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setProductData((prev) => ({
                              ...prev,
                              thumbnailImage: file,
                            }));
                          }
                        }}
                        hidden
                      />
                    </label>
                    <span className="pro-placeholder">
                      {productData.thumbnailImage
                        ? productData.thumbnailImage.name
                        : "No file chosen"}
                    </span>
                  </div>
                )}
                {loading ? (
                  <Skeleton width={400} />
                ) : (
                  <p className="pro-helper">
                    This image is visible in all product boxes. Use 300×300 size
                    images. Keep some blank space around the main object of your
                    image as we had to crop some edges in different devices to
                    make it responsive.
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="product-description-container">
              <h3 className="product-description-title">
                {loading ? <Skeleton width={200} /> : "Product Description"}
              </h3>
              <div className="seo-divider"></div>

              <div className="description-group">
                <label className="description-label">
                  {loading ? <Skeleton width={100} /> : "Description"}
                </label>
                {loading ? (
                  <Skeleton height={100} />
                ) : (
                  <textarea
                    className="description-textarea"
                    placeholder="Enter product description..."
                    value={productData.description}
                    onChange={(e) =>
                      setProductData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  ></textarea>
                )}
              </div>
            </div>
            {/* Product Price & Discounts */}
            <ProductPriceDiscounts />

            {/* SEO */}
            <div className="seo-container">
              <h2 className="seo-title">
                {loading ? <Skeleton width={150} /> : "SEO Meta Tags"}
              </h2>
              <div className="seo-divider"></div>

              {/* Meta Title */}
              <div className="seo-group">
                <label className="seo-label">
                  {loading ? <Skeleton width={80} /> : "Meta Title"}
                </label>
                <div className="seo-input-wrapper">
                  {loading ? (
                    <Skeleton height={36} />
                  ) : (
                    <input
                      type="text"
                      className="seo-input"
                      placeholder="Meta Title"
                      value={productData.metaTitle}
                      onChange={(e) =>
                        setProductData((prev) => ({
                          ...prev,
                          metaTitle: e.target.value,
                        }))
                      }
                    />
                  )}
                </div>
              </div>

              {/* Meta Description */}
              <div className="seo-group">
                <label className="seo-label">
                  {loading ? <Skeleton width={100} /> : "Description"}
                </label>
                <div className="seo-input-wrapper">
                  {loading ? (
                    <Skeleton height={80} />
                  ) : (
                    <textarea
                      className="seo-textarea"
                      placeholder="Description"
                      rows="4"
                      value={productData.metaDescription}
                      onChange={(e) => {
                        setProductData((prev) => ({
                          ...prev,
                          metaDescription: e.target.value,
                        }));
                      }}
                    ></textarea>
                  )}
                </div>
              </div>

              {/* Meta Image */}
              <div className="seo-group">
                <label className="seo-label">
                  {loading ? <Skeleton width={90} /> : "Meta Image"}
                </label>
                <div className="seo-input-wrapper">
                  {loading ? (
                    <div className="seo-file-container">
                      <div className="seo-file-btn-skeleton">
                        <Skeleton width={80} height={36} />
                      </div>
                      <span className="seo-file-name-skeleton">
                        <Skeleton width={150} />
                      </span>
                    </div>
                  ) : (
                    <div className="seo-file-container">
                      <label className="seo-file-btn m-0">
                        Browse
                        <input
                          type="file"
                          className="seo-file-input"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setProductData((prev) => ({
                                ...prev,
                                metaImage: file,
                              }));
                            }
                          }}
                          hidden
                        />
                      </label>
                      <span className="seo-file-name">
                        {productData.metaImage
                          ? productData.metaImage.name
                          : "No file chosen"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* refund */}
            <div className="refund-container-new">
              <h3 className="refund-title">
                {loading ? <Skeleton width={80} /> : "Refund"}
              </h3>
              <div className="seo-divider"></div>
              <div className="refund-option">
                <span>
                  {loading ? <Skeleton width={100} /> : "Refundable?"}
                </span>
                {loading ? (
                  <div style={{ width: "40px", height: "20px" }}>
                    <Skeleton width={40} height={20} />
                  </div>
                ) : (
                  <Switch
                    value={productData.refundable || false}
                    onChangeFunc={() => {
                      setProductData((prev) => ({
                        ...prev,
                        refundable: !prev.refundable,
                        refundNote: !prev.refundable ? prev.refundNote : "",
                      }));
                    }}
                  />
                )}
              </div>

              {/* Refund Note */}
              {productData.refundable && (
                <div className="refund-note mt-4">
                  <label className="note-label block mb-1 font-medium">
                    Refund Note
                  </label>
                  <textarea
                    value={productData.refundNote || ""}
                    onChange={(e) => {
                      setProductData((prev) => ({
                        ...prev,
                        refundNote: e.target.value,
                      }));
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white focus:outline-none"
                    placeholder="Enter refund policy details..."
                  />
                  <div className="note-box p-2 border border-gray-300 rounded-md cursor-pointer">
                    + Select Refund Note
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="prerow-whole8">
          <div className="preOrderFaqRight-new">
            <div className="border p-5 rounded">
              <div className="preOrderFaqRightHead">
                <p className="allFaq">Product category</p>
              </div>

              <ProductCategory onCategoriesChange={setSelectedCategories} />
            </div>

            <ProductSettings />
            <Shippingsetting />

            <CashOnDeliverySettings />

            <div className="w-full max-w-xl mx-auto border border-gray-300 rounded-md p-4 mt-4">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                {loading ? <Skeleton width={100} /> : "Vat & TAX"}
              </h2>

              {/* Tax Section */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {loading ? <Skeleton width={50} /> : "Tax"}
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  {loading ? (
                    <>
                      <Skeleton className="w-full sm:w-1/2 h-10" />
                      <Skeleton className="w-full sm:w-1/2 h-10" />
                    </>
                  ) : (
                    <>
                      <input
                        type="number"
                        placeholder="0"
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
                        className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300"
                      />
                      <select
                        value={productData.tax.type}
                        onChange={(e) =>
                          setProductData((prev) => ({
                            ...prev,
                            tax: { ...prev.tax, type: e.target.value },
                          }))
                        }
                        className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300"
                      >
                        <option>Flat</option>
                        <option>Percent</option>
                      </select>
                    </>
                  )}
                </div>
              </div>
              {/* VAT Section */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {loading ? <Skeleton width={50} /> : "Vat"}
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  {loading ? (
                    <>
                      <Skeleton className="w-full sm:w-1/2 h-10" />
                      <Skeleton className="w-full sm:w-1/2 h-10" />
                    </>
                  ) : (
                    <>
                      <input
                        type="number"
                        placeholder="0"
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
                        className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300"
                      />
                      <select
                        value={productData.vat.type}
                        onChange={(e) =>
                          setProductData((prev) => ({
                            ...prev,
                            vat: { ...prev.vat, type: e.target.value },
                          }))
                        }
                        className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300"
                      >
                        <option>Flat</option>
                        <option>Percent</option>
                      </select>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Frequently */}
            <div className="w-full max-w-4xl mx-auto border border-gray-200 rounded-md p-4 mt-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800">
                {loading ? <Skeleton width={200} /> : "Frequently Bought"}
              </h3>
              <div className="border-b border-gray-200 my-3"></div>

              {/* Radio Options */}
              <div className="flex flex-wrap gap-6 mt-3 text-sm font-medium text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="frequent"
                    value="product"
                    checked={selectedOption === "product"}
                    onChange={() => setSelectedOption("product")}
                    className="accent-blue-600 w-4 h-4"
                    disabled={loading}
                  />
                  <span
                    className={
                      selectedOption === "product" ? "font-semibold" : ""
                    }
                  >
                    {loading ? <Skeleton width={100} /> : "Select Product"}
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="frequent"
                    value="category"
                    checked={selectedOption === "category"}
                    onChange={() => setSelectedOption("category")}
                    className="accent-blue-600 w-4 h-4"
                    disabled={loading}
                  />
                  <span
                    className={
                      selectedOption === "category" ? " font-semibold" : ""
                    }
                  >
                    {loading ? <Skeleton width={120} /> : "Select Category"}
                  </span>
                </label>
              </div>

              {/* Category Dropdown */}
              {selectedOption === "category" && (
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <label className="text-sm text-gray-700 font-medium">
                    {loading ? <Skeleton width={80} /> : "Category"}
                  </label>
                  {loading ? (
                    <Skeleton className="w-full sm:w-64 h-10" />
                  ) : (
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      disabled={loading}
                    >
                      <option value="">Select Category</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="grocery">Grocery</option>
                      <option value="books">Books</option>
                    </select>
                  )}
                </div>
              )}

              {/* Add More Box - Show only for 'product' selection */}
              {selectedOption === "product" && (
                <div className="mt-6">
                  {loading ? (
                    <div className="w-full border border-dashed border-gray-300 rounded-md py-4 text-center text-gray-600 text-sm bg-gray-100">
                      <Skeleton width={80} className="mx-auto" />
                    </div>
                  ) : (
                    <div className="w-full border border-dashed border-gray-300 rounded-md py-4 text-center text-gray-600 text-sm hover:bg-gray-50 cursor-pointer transition">
                      + Add More
                    </div>
                  )}
                </div>
              )}
            </div>
            <MoreProductsToPreorder />
          </div>
        </div>
      </div>
      <div className="button-group">
        {loading ? (
          <>
            <Skeleton width={150} height={36} className="mr-2" />
            <Skeleton width={150} height={36} />
          </>
        ) : (
          <>
            <button className="btn-btn-gray" disabled={loading}>
              Save & Unpublish
            </button>
            <button className="btn-btn-green" onClick={handleSubmit}>
              Save & Publish
            </button>
          </>
        )}
      </div>
    </div>
  );
}
