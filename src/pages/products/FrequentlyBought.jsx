import React, { useState } from "react";
import "./FrequentlyBought.css";
import { IoClose } from "react-icons/io5";
import { useProductContext } from "../../productContex";
import axios from "axios"
import api from "../../utils/axios.js"

const FrequentlyBought = () => {
  const { productData, setProductData } = useProductContext();
  const [showModal, setShowModal] = useState(false);
  const [product, setproduct] = useState("");

  const categories = [
    {
      label: "Women Clothing & Fashion",
      options: [
        { label: "Hot Categories", value: "hot_categories" },
        { label: "Party Dress", value: "party_dress" },
        { label: "Beauty & Health", value: "beauty_health" },
        { label: "Women Shoe", value: "women_shoe" },
      ],
    },
  ];

  const handleSelectionChange = (type) => {
    setProductData((prev) => ({
      ...prev,
      frequentlyBought: { ...prev.frequentlyBought, selectionType: type },
    }));
  };

  const handleCategoryChange = (e) => {
    setProductData((prev) => ({
      ...prev,
      frequentlyBought: { ...prev.frequentlyBought, category: e.target.value },
    }));
  };
  const handleAddProduct = () => {
    if (product) {
      setProductData((prev) => ({
        ...prev,
        frequentlyBought: {
          ...prev.frequentlyBought,
          products: [
            ...(prev.frequentlyBought.products || []),
            product,
          ],
        },
      }));
      setproduct(""); // Reset the selected product
      setShowModal(false); // Close the modal
    }
  };
  const handleSubmit = async () => {
    console.log("Submitting:", productData);

    try {
      await api.post("/products/store", productData)

      alert("Product added")
    }
    catch (err) {
      console.log(err)
    }

  };
  return (
    <div className="frequently-container">
      <h2 className="section-title">Frequently Bought</h2>

      {/* Radio Buttons */}
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="option"
            value="product"
            checked={productData.frequentlyBought.selectionType === "product"}
            onChange={() => handleSelectionChange("product")}
          />
          Select Product
        </label>

        <label>
          <input
            type="radio"
            name="option"
            value="category"
            checked={productData.frequentlyBought.selectionType === "category"}
            onChange={() => handleSelectionChange("category")}
          />
          Select Category
        </label>
      </div>

      {/* Category Dropdown */}
      {productData.frequentlyBought.selectionType === "category" && (
        <div className="category-dropdown">
          <label>Category</label>
          <select
            className="dropdown"
            value={productData.frequentlyBought.category}
            onChange={handleCategoryChange}
          >
            <option value="">Choose Category</option>
            {categories.map((group, index) => (
              <optgroup key={index} label={group.label}>
                {group.options.map((option, i) => (
                  <option key={i} value={option.value}>
                    -- {option.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      )}
      {/* Selected Products */}
      {productData.frequentlyBought.selectionType === "product" &&
        productData.frequentlyBought.products &&
        productData.frequentlyBought.products.length > 0 && (
          <div className="selected-products">
            <h3>Selected Products:</h3>
            <ul>
              {productData.frequentlyBought.products.map(
                (product, index) => (
                  <li key={index}>{product}</li>
                )
              )}
            </ul>
          </div>
        )}

      {/* Add More Button - Only for Product Selection */}
      {productData.frequentlyBought.selectionType === "product" && (
        <div className="category-dropdown-add">
          <button className="add-more-btn" onClick={() => setShowModal(true)}>
            + Add More
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowModal(false)}>
              <IoClose />
            </button>
            <h3>Add Products</h3>
            <select
              className="dropdown"
              value={product}
              onChange={(e) => setproduct(e.target.value)}
            >
              <option value="">Select Product</option>
              {categories.map((group, index) => (
                <optgroup key={index} label={group.label}>
                  {group.options.map((option, i) => (
                    <option key={i} value={option.label}>
                      -- {option.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <input
              type="text"
              className="search-input"
              placeholder="Search by Product Name"
            />
            <div className="modal-actions">
              <button className="btn btn-add" onClick={handleAddProduct}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Buttons */}
      <div className="button-group">
        <button className="btn-btn-grey" onClick={handleSubmit}>Save & Unpublish</button>
        <button className="btn-btn-green" onClick={handleSubmit}>Save & Publish</button>
      </div>
    </div>
  );
};

export default FrequentlyBought;
