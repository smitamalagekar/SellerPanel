import React, { useState } from "react";
import "./Bulkimport.css";

const BrandBulkUpload = () => {
  const [fileName, setFileName] = useState("Choose file");

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName("Choose file");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Product Bulk Upload</h2>
        <div className="divider"></div>
        <div className="info-box">
          <strong>Step 1:</strong>
          <ol>
            <li>1.Download the skeleton file and fill it with proper data.</li>
            <li>
              2.You can download the example file to understand how the data
              must be filled.
            </li>
            <li>
              3.Once you have downloaded and filled the skeleton file, upload it
              in the form below and submit.
            </li>
          </ol>
        </div>
        <button className="download-btn">Download CSV</button>
      </div>

      <div className="card">
        <h2 className="title">Brand Bulk Upload</h2>
        <div className="divider"></div>
        <div className="info-box">
          <strong>Step 2:</strong>
          <ol>
            <li>1. Category and Brand should be in numerical id.</li>
            <li>2. You can download the pdf to get Category and Brand id.</li>
          </ol>
        </div>
        <div className="download-buttons-container">
          <button className="download-btn-btn">Download Category</button>
          <button className="download-btn-btn">Download Brand</button>
        </div>
      </div>

      <div className="card upload-section">
        <h2 className="title">Upload Brand File</h2>
        <div className="divider"></div>
        <div className="file-upload-container">
          <label className="file-upload-label">
            <span className="file-upload-text">{fileName}</span>
            <span className="file-upload-button">Browse</span>
            <input
              type="file"
              className="file-upload-input"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <button className="upload-btn">Upload CSV</button>
      </div>
    </div>
  );
};

export default BrandBulkUpload;
