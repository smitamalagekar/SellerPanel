// import { Delete, Edit, Trash } from "lucide-react";
import "./addpreorder.css";
// import { MdOutlineSettings } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { useProductContext } from "../../../productContex";
import Switch from "../../Switch";
import ProductCategory from "../../ProductCategory";
import axios from "axios";
// import apiInstance from "../../../utils/axios";

export default function PreOrderFaq() {
  // const [quantity, setQuantity] = React.useState(1);
  // const [showQuantity, setShowQuantity] = useState(true);


  // const [showTextOnly, setShowTextOnly] = useState(false);
  // const [hideStock, setHideStock] = useState(false);
  // const [status, setStatus] = useState(true);

  // eslint-disable-next-line no-unused-vars
  const [showTextOnly , setShowTextOnly] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [hideStock , setHideStock] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [status , setStatus] = useState(true);

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

  // const handleFileChange = (index) => (event) => {
  //   const file = event.target.files[0];
  //   const updatedNames = [...fileName];

  //   updatedNames[index] = file ? file.name : "Choose file";
  //   setFileNames(updatedNames);

  //   // Reset input so re-selecting same file still triggers onChange
  //   event.target.value = null;
  // };

  // const [isRefundable, setIsRefundable] = useState(false);
  // const [metaImage, setMetaImage] = useState(null);

  const { productData, setProductData } = useProductContext();

  // const [isWarranty, setIsWarranty] = useState(false);
  // const [warrantyType, setWarrantyType] = useState("");

  console.log(productData);

  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get("https://e-commerce-backend-1-0.onrender.com/api/brands/getall"); // Adjust base URL if needed
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

  // const addProducts = (selectedProducts) => {
  //   setProductData((prev) => ({
  //     ...prev,
  //     frequentlyBought: {
  //       ...prev.frequentlyBought,
  //       products: [...prev.frequentlyBought.products, ...selectedProducts],
  //     },
  //   }));
  // };

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

  // const [selectedCategories, setSelectedCategories] = useState([]);

  // eslint-disable-next-line no-unused-vars
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
        // videoProvider: productData.videoProvider,
        // videoLink: productData.videoLink,
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
        } else if (key === "thumbnailImage" && finalData.thumbnailImage) {
          formData.append("thumbnailImage", finalData.thumbnailImage);
        } else if (key === "pdfSpecification" && finalData.pdfSpecification) {
          formData.append("pdfSpecification", finalData.pdfSpecification);
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
      const response = await axios.post(
        "https://e-commerce-backend-1-0.onrender.com/api/sellerpreorderproducts/store",
        formData
      );

      if (response.data.success) {
        alert("Product created successfully!");
        navigate("/preorder/product");
      } else {
        alert("Failed to create product.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("An error occurred while submitting the product.");
    }
  };

  return (
    <div className="PreOrderFaq-whole ">
      <div className="product-table">
        <p className="customersText mt-6 ml-6">Add new preorder product</p>
      </div>
      <div className="preOrderFaqBox-new">
        <div className="procol">
          <div className="preOrderFaqLeft-new">
            <div className="preOrderLeftUpper-new">
              <div className="border p-4 rounded">
                <div className="">
                  <p className="allFaq">Product Information</p>
                  {/* <input type="text" placeholder="Type to search...." className="searchFaq" /> */}
                </div>
                <br></br>
                <div className="seo-divider"></div>
                <div className="preOrderLeftLower">
                  <form className="addwhole-form">
                    {/* Product Name */}
                    <div className="addwhole-field">
                      <label className="addwhole-label">
                        Product Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        value={productData.productName}
                        onChange={(e) =>
                          setProductData({
                            ...productData,
                            productName: e.target.value,
                          })
                        }
                        className="addwhole-input"
                        placeholder="Product Name"
                      />
                    </div>

                    {/* Brand */}
                    <div className="addwhole-field">
                      <label className="addwhole-label">Brand</label>
                      <select
                        className="addwhole-input"
                        value={productData.brand}
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
                    </div>

                    {/* Unit */}
                    <div className="addwhole-field">
                      <label className="addwhole-label">
                        Unit <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="addwhole-input"
                        value={productData.unit}
                        onChange={(e) =>
                          setProductData({
                            ...productData,
                            unit: e.target.value,
                          })
                        }
                        placeholder="Unit (e.g. KG, Pc etc)"
                      />
                    </div>

                    {/* Minimum Purchase Qty */}
                    <div className="addwhole-field">
                      <label className="addwhole-label">
                        Minimum Purchase Qty <span className="required">*</span>
                      </label>
                      <input
                        type="number"
                        value={productData.minPurchaseQty}
                        onChange={(e) =>
                          setProductData({
                            ...productData,
                            minPurchaseQty: e.target.value,
                          })
                        }
                        className="addwhole-input"
                        placeholder="1"
                      />
                    </div>

                    {/* Tags */}
                    <div className="addwhole-tags">
                      <div className="addwhole-tags-field">
                        <label className="addwhole-tags-label">
                          Tags <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="addwhole-tags-input"
                          value={productData.tags}
                          onChange={(e) =>
                            setProductData({
                              ...productData,
                              tags: [e.target.value],
                            })
                          }
                          placeholder="Type and hit enter to add a tag"
                        />
                      </div>
                      <p className="addwhole-tags-helper">
                        This is used for search. Input those words by which
                        customers can find this product.
                      </p>
                    </div>
                    {/* Barcode */}
                    <div className="addwhole-field">
                      <label className="addwhole-label">Barcode</label>
                      <input
                        type="text"
                        className="addwhole-input"
                        value={productData.barcode}
                        onChange={(e) =>
                          setProductData((prev) => ({
                            ...prev,
                            barcode: e.target.value,
                          }))
                        }
                        placeholder="Barcode"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="pro-container">
            <h3 className="pro-heading">Product Images</h3>
            <div className="seo-divider"></div>
            {/* Gallery Images */}
            <div className="pro-field">
              <label className="pro-label">
                Gallery Images <span className="pro-size">(600×600)</span>
              </label>
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
                          galleryImages: [...prev.galleryImages, ...newFiles],
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
              <p className="pro-helper">
                These images are visible in the product details page gallery.
                Use 600×600 size images.
              </p>
            </div>

            {/* Thumbnail Image */}
            <div className="pro-field">
              <label className="pro-label">
                Thumbnail Image <span className="pro-size">(300×300)</span>
              </label>
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
              <p className="pro-helper">
                This image is visible in all product boxes. Use 300×300 size
                images. Keep some blank space around the main object of your
                image as we had to crop some edges in different devices to make
                it responsive.
              </p>
            </div>
          </div>

          <div className="product-price-container">
            <h3 className="product-price-title">Product price + stock</h3>
            <div className="seo-divider"></div>
            <div className="input-group">
              <label>
                Unit price <span className="required">*</span>
              </label>
              <input
                type="number"
                value={productData.unitPrice}
                onChange={(e) =>
                  setProductData((prev) => ({
                    ...prev,
                    unitPrice: e.target.value,
                  }))
                }
                placeholder="0"
              />
            </div>

            <div className="input-group">
              <label>Set Point</label>
              <input
                type="number"
                value={productData.setPoint}
                onChange={(e) =>
                  setProductData((prev) => ({
                    ...prev,
                    setPoint: e.target.value,
                  }))
                }
                placeholder="0"
              />
            </div>

            <div className="input-group">
              <label>
                Quantity <span className="required">*</span>
              </label>
              <input
                type="number"
                value={productData.quantity}
                onChange={(e) =>
                  setProductData((prev) => ({
                    ...prev,
                    quantity: e.target.value,
                  }))
                }
                placeholder="0"
              />
            </div>

            <div className="input-group">
              <label>SKU</label>
              <input
                type="text"
                value={productData.sku}
                onChange={(e) =>
                  setProductData((prev) => ({
                    ...prev,
                    sku: e.target.value,
                  }))
                }
                placeholder="SKU"
              />
            </div>

            <div className="wholesale-section">
              <label>Wholesale Prices</label>
              {wholesalePrices.map((price, index) => (
                <div className="wholesale-row" key={index}>
                  <input
                    type="number"
                    placeholder="Min QT"
                    value={price.minQT}
                    onChange={(e) => {
                      const newPrices = [...wholesalePrices];
                      newPrices[index].minQT = e.target.value;
                      setWholesalePrices(newPrices);
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Max QT"
                    value={price.maxQT}
                    onChange={(e) => {
                      const newPrices = [...wholesalePrices];
                      newPrices[index].maxQT = e.target.value;
                      setWholesalePrices(newPrices);
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Price per piece"
                    value={price.price}
                    onChange={(e) => {
                      const newPrices = [...wholesalePrices];
                      newPrices[index].price = e.target.value;
                      setWholesalePrices(newPrices);
                    }}
                  />
                  <button
                    className="remove-btn"
                    onClick={() => removeWholesalePrice(index)}
                  >
                    <RxCross2 />
                  </button>
                </div>
              ))}
              <button className="add-btn" onClick={addWholesalePrice}>
                Add More
              </button>
            </div>
          </div>
          {/* Description */}
          <div className="product-description-container">
            <h3 className="product-description-title">Product Description</h3>
            <div className="seo-divider"></div>

            <div className="description-group">
              <label className="description-label">Description</label>
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
            </div>
          </div>

          {/* PDF */}

          <div className="pro-container">
            <h3 className="pro-heading">Product Images</h3>
            <div className="seo-divider"></div>

            {/* Gallery Images */}
            <div className="pro-field">
              <label className="pro-label">
                PDF Specification<span className="pro-size"></span>
              </label>
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
                          pdfSpecification: file,
                        }));
                      }
                    }}
                    hidden
                  />
                </label>
                <span className="pro-placeholder">
                  {productData.pdfSpecification
                    ? productData.pdfSpecification.name
                    : "No file chosen"}
                </span>
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="seo-container">
            <h2 className="seo-title">SEO Meta Tags</h2>
            <div className="seo-divider"></div>

            {/* Meta Title */}
            <div className="seo-group">
              <label className="seo-label">Meta Title</label>
              <div className="seo-input-wrapper">
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
              </div>
            </div>

            {/* Meta Description */}
            <div className="seo-group">
              <label className="seo-label">Description</label>
              <div className="seo-input-wrapper">
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
              </div>
            </div>

            {/* Meta Image */}
            <div className="seo-group">
              <label className="seo-label">Meta Image</label>
              <div className="seo-input-wrapper">
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
              </div>
            </div>
          </div>
          {/* refund */}
          <div className="refund-container-new">
            <h3 className="refund-title">Refund</h3>
            <div className="seo-divider"></div>
            <div className="refund-option">
              <span>Refundable?</span>
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
          {/* warrenty */}
          <div className="warranty-container-new">
            <h3 className="warranty-title">Warranty</h3>
            <div className="seo-divider"></div>
            <div className="warranty-option">
              <span>Warranty</span>
              <Switch
                value={productData.warranty?.enabled || false}
                onChangeFunc={() => {
                  setProductData((prev) => ({
                    ...prev,
                    warranty: {
                      ...prev.warranty,
                      enabled: !prev.warranty?.enabled,
                      // Reset warranty details when disabling
                      ...(!prev.warranty?.enabled
                        ? {}
                        : {
                          type: "",
                          note: "",
                        }),
                    },
                  }));
                }}
              />
            </div>

            {/* Conditional Warranty Inputs */}
            {productData.warranty?.enabled && (
              <>
                {/* Warranty Type Dropdown */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Warranty Type
                  </label>
                  <select
                    value={productData.warranty.type || ""}
                    onChange={(e) => {
                      setProductData((prev) => ({
                        ...prev,
                        warranty: {
                          ...prev.warranty,
                          type: e.target.value,
                        },
                      }));
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white focus:outline-none"
                  >
                    <option value="">Select Warranty</option>
                    <option value="1 Year">1 Year</option>
                    <option value="2 Years">2 Years</option>
                    <option value="No Warranty">No Warranty</option>
                  </select>
                </div>

                {/* Warranty Note */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Warranty Note
                  </label>
                  <textarea
                    value={productData.warranty.note || ""}
                    onChange={(e) => {
                      setProductData((prev) => ({
                        ...prev,
                        warranty: {
                          ...prev.warranty,
                          note: e.target.value,
                        },
                      }));
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white focus:outline-none"
                    placeholder="Enter warranty notes..."
                  />
                  <div className="w-full px-4 py-2  border border-gray-300 text-center rounded-md text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 cursor-pointer">
                    + Select Warranty Note
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Frequently */}
          <div className="w-full max-w-4xl mx-auto border border-gray-200 rounded-md p-4 mt-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">
              Frequently Bought
            </h3>
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
                <span
                  className={
                    productData.frequentlyBought.selectionType === "product"
                      ? "font-semibold"
                      : ""
                  }
                >
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
                <span
                  className={
                    productData.frequentlyBought.selectionType === "category"
                      ? " font-semibold"
                      : ""
                  }
                >
                  Select Category
                </span>
              </label>
            </div>

            {/* Category Dropdown */}
            {productData.frequentlyBought.selectionType === "category" && (
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <label className="text-sm text-gray-700 font-medium">
                  Category
                </label>
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
                <div
                  onClick={openProductSelector}
                  className="w-full border border-dashed border-gray-300 rounded-md py-4 text-center text-gray-600 text-sm hover:bg-gray-50 cursor-pointer transition"
                >
                  + Add More
                </div>
              </div>
            )}
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
            <div className="preOrderFaqRight-new7 mt-5 border rounded">
              <div className="preOrderFaqRightHead">
                <p className="allFaq">Shipping Configuration</p>
              </div>
            </div>

            <div className="faqForm">
              <div className=" flex items-center justify-between  w-full">
                <label className="text-black w-fit font-normal">
                  Free Shipping
                </label>
                <Switch
                  value={productData.shippingConfig.freeShipping}
                  onChangeFunc={() => {
                    setProductData((prev) => ({
                      ...prev,
                      shippingConfig: {
                        ...prev.shippingConfig,
                        freeShipping: !prev.shippingConfig.freeShipping,
                      },
                    }));
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${productData.shippingConfig.freeShipping
                      ? "bg-green-500"
                      : "bg-gray-300"
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${productData.shippingConfig.freeShipping
                        ? "translate-x-6"
                        : "translate-x-1"
                      }`}
                  />
                </Switch>
              </div>
              <div className=" flex items-center justify-between w-full">
                <label className="text-black font-normal">Flat Rate</label>
                <Switch
                  value={productData.shippingConfig.flatRate}
                  onChangeFunc={() => {
                    setProductData((prev) => ({
                      ...prev,
                      shippingConfig: {
                        ...prev.shippingConfig,
                        flatRate: !prev.shippingConfig.flatRate,
                      },
                    }));
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${productData.shippingConfig.flatRate
                      ? "bg-green-500"
                      : "bg-gray-300"
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${productData.shippingConfig.flatRate
                        ? "translate-x-6"
                        : "translate-x-1"
                      }`}
                  />
                </Switch>
              </div>
              <div className=" flex items-center justify-between w-full">
                <label className="text-black font-normal">
                  Is Product Quantity Mulitiply
                </label>
                <button
                  onClick={() => {
                    setProductData((prev) => ({
                      ...prev,
                      shippingConfig: {
                        ...prev.shippingConfig,
                        isProductQuantityMultiply:
                          !prev.shippingConfig.isProductQuantityMultiply,
                      },
                    }));
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${productData.shippingConfig.isProductQuantityMultiply
                      ? "bg-green-500"
                      : "bg-gray-300"
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${productData.shippingConfig.isProductQuantityMultiply
                        ? "translate-x-6"
                        : "translate-x-1"
                      }`}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="max-w-xl w-full mx-auto mt-2 rounded-md  border border-gray-300 p-4 ">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Low Stock Quantity Warning
            </h2>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={productData.lowStockQuantityWarning}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    lowStockQuantityWarning: e.target.value,
                  })
                }
                className="w-full px-4 py-2 pb-4 border border-gray-300 rounded-md focus:outline-none text-gray-700"
              />
            </div>
          </div>

          <div className="max-w-xl w-full mx-auto mt-2 rounded-md  border border-gray-300 p-6  pb-8">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
              Stock Visibility State
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Show Stock Quantity</span>
                <button
                  onClick={() => {
                    setProductData((prev) => ({
                      ...prev,
                      showStockQuantity: !prev.showStockQuantity,
                    }));
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${productData.showStockQuantity
                      ? "bg-green-500"
                      : "bg-gray-300"
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${productData.showStockQuantity
                        ? "translate-x-6"
                        : "translate-x-1"
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700">Show Stock With Text Only</span>
                <button
                  onClick={() => {
                    setProductData((prev) => ({
                      ...prev,
                      showStockWithTextOnly: !prev.showStockWithTextOnly,
                    }));
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${productData.showStockWithTextOnly
                      ? "bg-green-500"
                      : "bg-gray-300"
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${productData.showStockWithTextOnly
                        ? "translate-x-6"
                        : "translate-x-1"
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700">Hide Stock</span>
                <button
                  onClick={() => {
                    setProductData((prev) => ({
                      ...prev,
                      hideStock: !prev.hideStock,
                    }));
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${productData.hideStock ? "bg-green-500" : "bg-gray-300"
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${productData.hideStock ? "translate-x-6" : "translate-x-1"
                      }`}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="max-w-xl w-full mx-auto mt-2 rounded-md  border border-gray-300 p-6 pb-8">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
              Cash On Delivery
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Status</span>
                <button
                  onClick={() => {
                    setProductData((prev) => ({
                      ...prev,
                      shippingConfig: {
                        ...prev.shippingConfig,
                        cashOnDelivery: !prev.shippingConfig.cashOnDelivery,
                      },
                    }));
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${productData.shippingConfig.cashOnDelivery
                      ? "bg-green-500"
                      : "bg-gray-300"
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${productData.shippingConfig.cashOnDelivery
                        ? "translate-x-6"
                        : "translate-x-1"
                      }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="w-full max-w-xl mx-auto border border-gray-300 rounded-md p-4 mt-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Estimate Shipping Time
            </h2>

            <div className="mt-4">
              <label className="block text-sm font-normal text-gray-700 mb-1">
                Shipping Days
              </label>
              <div className="flex rounded-md border border-gray-300 overflow-hidden">
                <input
                  type="number"
                  placeholder="Shipping Days"
                  value={productData.shippingConfig.shippingDays}
                  onChange={(e) =>
                    setProductData((prev) => ({
                      ...prev,
                      shippingConfig: {
                        ...prev.shippingConfig,
                        shippingDays: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-0 focus:border-transparent"
                />
                <span className="inline-flex items-center px-4 text-sm text-gray-500 bg-gray-100 border-l border-gray-300">
                  Days
                </span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-xl mx-auto border border-gray-300 rounded-md p-4 mt-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Vat & TAX
            </h2>

            {/* Tax Section */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tax
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
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
                  <option>percentage</option>
                </select>
              </div>
            </div>

            {/* VAT Section */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vat
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
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
                  <option>percentage</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="button-group">
        <button className="btn-btn-gray">Save & Unpublish</button>
        <button className="btn-btn-green" onClick={handleSubmit}>
          Save & Publish
        </button>
      </div> */}
      <div className="flex justify-end gap-4 mt-6 mr-16">
  <button
    className="px-5 py-2 rounded-xl bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-200 shadow-md"
  >
    Save & Unpublish
  </button>
  <button
    onClick={handleSubmit}
    className="px-5 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors duration-200 shadow-md"
  >
    Save & Publish
  </button>
</div>

    </div>
  );
}
