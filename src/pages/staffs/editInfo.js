import React from 'react';
import './EditInfo.css';

const EditInfo = () => {
  return (
    <div className="staff-form-container">
      <div className='staffbox'>
      <h2>Staff Information</h2>
      <form className="staff-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" name="phone" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select id="role" name="role">
            <option value="mukul">Mukul Type</option>
            <option value="Houses">Houses</option>
            <option value="Recaler">Recaler</option>
            <option value="Staff Head">Staff Head</option>
            <option value="Logistic Manager">Logistic Manager</option>
            <option value="Ecommerce Manager">Ecommerce Manager</option>
            <option value="Order Clerks">Order Clerks</option>
            <option value="Category Manager">Category Manager</option>
            <option value="PPC Manager">PPC Manager</option>
            <option value="Product Manager">Product Manager</option>
            <option value="Custom Service Representatives">Custom Service Representatives</option>


          </select>
        </div>
        <div className='save-btn1'>
        <button type="submit" className="save-button">Save</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default EditInfo;