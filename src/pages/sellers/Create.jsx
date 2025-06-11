import React from "react";
import "./Create.css";

const Create = () => {
  return (
    <div className="add-seller-container">
      <h1 className="add-seller-title">Add New Seller</h1>
      <div className="form-container">
        <h2 className="seller-info-title">Seller Information</h2>

        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input type="text" id="name" placeholder="Name" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input type="email" id="email" placeholder="Email" />
        </div>

        <div className="form-group">
          <label htmlFor="shopName">Shop Name</label>
          <input type="text" id="shopName" placeholder="Shop Name" />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" placeholder="Address" />
        </div>

       <div className="sav"> <button className="save-button">Save</button></div>
      </div>
    </div>
  );
};

export default Create;
