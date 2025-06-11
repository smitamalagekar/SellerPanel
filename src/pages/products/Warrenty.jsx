import React, { useState } from "react";
import { useProductContext } from "../../productContex";
import "./warrenty.css";
import { Link } from "react-router-dom";

const WarrantyConfig = () => {
  const { productData, setProductData } = useProductContext();
  const [warrantyEnabled, setWarrantyEnabled] = useState(false);

  const handleToggleWarranty = () => {
    setWarrantyEnabled(!warrantyEnabled);
    setProductData((prev) => ({
      ...prev,
      warranty: warrantyEnabled ? "" : productData.warranty,
    }));
  };

  const handleWarrantyChange = (e) => {
    setProductData((prev) => ({ ...prev, warranty: e.target.value }));
  };

  const handleWarrantyNote = () => {
    setProductData((prev) => ({ ...prev, warrantyNote: "Sample Note" }));
  };
  const handleSubmit = (isPublished) => {
    console.log("Saving Warranty Config:", productData);
    // Here, you can implement API calls or state updates accordingly
    alert(isPublished ? "Saved & Published" : "Saved & Unpublished");
  };
  return (
    <div className="warranty-container">
      <h2 className="section-title">Warranty</h2>
      <div className="divider"></div>

      {/* Toggle Switch */}
      <div className="config-option">
        <span className="option-label">Warranty</span>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={warrantyEnabled}
            onChange={handleToggleWarranty}
          />
          <span className="slider"></span>
        </label>
      </div>

      {/* Show form when Warranty is enabled */}
      {warrantyEnabled && (
        <>
          {/* Warranty Dropdown */}
          <div className="warranty-dropdown">
            <select
              className="dropdown"
              value={productData.warranty || ""}
              onChange={handleWarrantyChange}
            >
              <option value="">Select Warranty</option>
              <option value="6 months">6 Months</option>
              <option value="1 year">1 Year</option>
              <option value="2 years">2 Years</option>
              <option value="4 years">4 Years</option>
              <option value="5 years">5 Years</option>
            </select>
          </div>

          {/* Warranty Note Section */}
          <h3 className="sub-title">Warranty Note</h3>
          <div className="warranty-note">
            <button className="add-note-btn" onClick={handleWarrantyNote}>
              + Select Warranty Note
            </button>
          </div>
        </>
      )}

      {/* Buttons */}
      <div className="button-group">
        <button
          className="btn-btn-grey"
          onClick={() => handleSubmit(false)}
        >
          Save & Unpublish
        </button>
        <Link to='/products/create/frequently-bought'>
          <button className="btn-btn-green" onClick={() => handleSubmit(true)}>
            Save & Publish
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WarrantyConfig;
