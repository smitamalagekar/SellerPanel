import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useProductContext } from "../../productContex";
import apiInstance from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";

const CashOnDeliverySettings = () => {
  const [cashOnDeliveryAvailable, setCashOnDeliveryAvailable] = useState(false);
  const [prepaymentNeeded, setPrepaymentNeeded] = useState(false);
  const [showNoteOnProductPage, setShowNoteOnProductPage] = useState(false);
  const [isNoteFormOpen, setIsNoteFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { productData, setProductData } = useProductContext();
  const [showTextOnly, setShowTextOnly] = useState(false);
  const [hideStock, setHideStock] = useState(false);

  const [status, setStatus] = useState(true);
  const [wholesalePrices, setWholesalePrices] = useState([
    { minQT: "", maxQT: "", price: "" },
  ]);

  console.log(productData);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

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
  useEffect(() => {
    // Simulate fetching COD settings data
    setTimeout(() => {
      setCashOnDeliveryAvailable(true);
      setPrepaymentNeeded(false);
      setShowNoteOnProductPage(true);
      setLoading(false);
    }, 1300); // Simulate 1.3 seconds loading
  }, []);

  const handleToggle = () => {
    setCashOnDeliveryAvailable(!cashOnDeliveryAvailable);
  };

  const handlePrepaymentChange = () => {
    setPrepaymentNeeded(!prepaymentNeeded);
  };

  const handleShowNoteChange = () => {
    setShowNoteOnProductPage(!showNoteOnProductPage);
  };

  const handleOpenNoteForm = () => {
    setIsNoteFormOpen(true);
  };

  const handleCloseNoteForm = () => {
    setIsNoteFormOpen(false);
  };

  const handleSubmitNoteForm = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Note form submitted");
    setIsNoteFormOpen(false); // Close the form after submission
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-lg shadow border mt-4 mr-4">
      <h2 className="text-lg font-semibold mb-3">
        {loading ? <Skeleton width={180} /> : "Cash On Delivery"}
      </h2>
      <div className="border-b border-gray-200 my-3"></div>

      <div className="flex items-center justify-between mb-2">
        <label className="text-sm text-gray-700">
          {loading ? <Skeleton width={150} /> : "Cash on delivery available"}
        </label>
        {loading ? (
          <div className="w-11 h-6 bg-gray-200 rounded-full flex items-center justify-center">
            <Skeleton width={30} height={18} circle />
          </div>
        ) : (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={cashOnDeliveryAvailable}
              onChange={handleToggle}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-400"></div>
          </label>
        )}
      </div>

      <div className="flex items-center mb-2">
        {loading ? (
          <Skeleton width={24} height={24} className="mr-2" />
        ) : (
          <input
            type="checkbox"
            id="prepaymentNeeded"
            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            checked={prepaymentNeeded}
            onChange={handlePrepaymentChange}
          />
        )}
        <label
          htmlFor="prepaymentNeeded"
          className="ml-2 text-sm text-gray-700"
        >
          {loading ? (
            <Skeleton width={250} />
          ) : (
            "Prepayment needed for cash on delivery"
          )}
        </label>
      </div>

      <div className="flex items-center mb-4">
        {loading ? (
          <Skeleton width={24} height={24} className="mr-2" />
        ) : (
          <input
            type="checkbox"
            id="showNoteOnProductPage"
            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            checked={showNoteOnProductPage}
            onChange={handleShowNoteChange}
          />
        )}
        <label
          htmlFor="showNoteOnProductPage"
          className="ml-2 text-sm text-gray-700"
        >
          {loading ? (
            <Skeleton width={350} />
          ) : (
            "Show note in cash on delivery section in product description page"
          )}
        </label>
      </div>

      <div className="mb-6">
        <label
          className="block text-md text-gray-700 mb-3 text-center cursor-pointer"
          onClick={handleOpenNoteForm}
        >
          {loading ? <Skeleton width={180} /> : "Note (Add from preset)"}
        </label>
        {loading ? (
          <div className="flex justify-center border border-gray-300 rounded-md py-4 px-2 text-md text-gray-700 items-center">
            <span className="mr-2">+</span> <Skeleton width={150} />
          </div>
        ) : (
          <div
            className="flex justify-center border border-gray-300 rounded-md py-4 px-2 text-md text-gray-700 hover:bg-gray-50 cursor-pointer"
            onClick={handleOpenNoteForm}
          >
            <span className="mr-2">+</span> Select Delivery Note
          </div>
        )}
      </div>

      {isNoteFormOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded-md shadow-lg p-12 w-3/4 md:w-2/3 lg:w-1/2">
            <h3 className="text-xl font-semibold mb-6">Add Delivery Note</h3>
            <form onSubmit={handleSubmitNoteForm}>
              <div className="mb-6">
                <label
                  htmlFor="noteText"
                  className="block text-gray-700 text-md font-bold mb-3"
                >
                  Delivery Note:
                </label>
                <textarea
                  id="noteText"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                  rows="6"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline mr-4 text-md"
                  onClick={handleCloseNoteForm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline text-md"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashOnDeliverySettings;
