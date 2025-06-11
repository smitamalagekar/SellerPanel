import React from 'react';
import './DeleteConfirmation.css'; // Import the CSS file

const DeleteConfirmation = ({ isOpen, onConfirm, onCancel, itemName }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="delete-confirmation-overlay">
      <div className="delete-confirmation-dialog">
        <div className="dialog-header">
          <h2>Delete Confirmation</h2>
          <button className="close-dialog-btn" onClick={onCancel}>
            &times;
          </button>
        </div>
        <div className="dialog-content">
          <p>Are you sure to delete this?</p>
        </div>
        <div className="dialog-actions">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="delete-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;