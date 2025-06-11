import React, { useState } from "react";
import { useProductContext } from "../../productContex";
import "./Shipping.css";
import { type } from "@testing-library/user-event/dist/type";
import { Link } from "react-router-dom";

const ShippingConfig = () => {
  const { productData, setProductData } = useProductContext();
  const [cashOnDelivery, setCashOnDelivery] = useState(false);
  const [freeShipping, setFreeShipping] = useState(false);
  const [flatRate, setFlatRate] = useState(false);
  const [productQuantityMultiply, setProductQuantityMultiply] = useState(false);
  const [shippingDays, setShippingDays] = useState("");



  const handleTogglecashOnDelivery = () => {
    setCashOnDelivery(!cashOnDelivery);
    setProductData((prev) => ({
      ...prev,
      shippingConfiguration: { ...prev.shippingConfiguration, cashOnDelivery: !cashOnDelivery },
    }));
  };
  const handleTogglefreeShiping = (key) => {
    setFreeShipping(!freeShipping);
    setProductData((prev) => ({
      ...prev,
      shippingConfiguration: { ...prev.shippingConfiguration, freeShipping: !freeShipping },
    }));
  };
  const handleToggleflatRate = () => {
    setFlatRate(!flatRate);
    setProductData((prev) => ({
      ...prev,
      shippingConfiguration: { ...prev.shippingConfiguration, flatRate: !flatRate },
    }));
  };
  const handleToggleproductQuantityMultiply = () => {
    setProductQuantityMultiply(!productQuantityMultiply);
    setProductData((prev) => ({
      ...prev,
      shippingConfiguration: { ...prev.shippingConfiguration, isProductQuantityMultiply: !productQuantityMultiply },
    }));
  };
  const handleInputChange = (e) => {
    setShippingDays(e.target.value);
    setProductData((prev) => ({
      ...prev,
      shippingConfiguration: {
        ...prev.shippingConfiguration,
        shippingDays: e.target.value,
      },
    }));
  }
  const handleSubmit = (isPublished) => {
    console.log("Shipping Details:", productData);
    // Here, you can implement API calls or state updates accordingly
    alert(isPublished ? "Saved & Published" : "Saved & Unpublished");
  };
  return (
    <div className="shipping-container">
      <h2 className="shipping-title">Shipping Configuration</h2>
      <div className="shipping-divider"></div>

      <div className="shipping-option">
        <span>Cash On Delivery</span>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={cashOnDelivery}
            onChange={handleTogglecashOnDelivery}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      <div className="shipping-option">
        <span>Free Shipping</span>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={productData.freeShipping}
            onChange={handleTogglefreeShiping}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      <div className="shipping-option">
        <span>Flat Rate</span>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={flatRate}
            onChange={handleToggleflatRate}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      <div className="shipping-option">
        <span>Is Product Quantity Multiply</span>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={productQuantityMultiply}
            onChange={handleToggleproductQuantityMultiply}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      <h2 className="shipping-title">Estimate Shipping Time</h2>
      <div className="shipping-divider"></div>

      <div className="shipping-option">
        <span>Shipping Days</span>
        <div className="input-box">
          <input
            type="number"
            placeholder="Shipping Days"
            className="shipping-input"
            value={shippingDays}
            onChange={handleInputChange}
          />
          <span className="days-text">Days</span>
        </div>
      </div>

      <div className="button-group-ship">
        <button className="btn-btn-grey" onClick={() => handleSubmit(false)}>Save & Unpublish</button>
        <Link to='/products/create/warranty'>
          <button className="btn-btn-green" onClick={() => handleSubmit(true)}>Save & Publish</button>
        </Link>
      </div>
    </div>
  );
};

export default ShippingConfig;
