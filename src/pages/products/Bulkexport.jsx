import React, { useState } from "react";
import "./Bulkimport.css";

const BrandBulkUpload = () => {

     const [fileName, setFileName] = useState("Choose file");
        
          const handleFileChange = (event) => {
            if (event.target.files.length > 0) {
              setFileName(event.target.files[0].name);
            } else {
              setFileName("Choose file");
            }}
    
  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Product Bulk Export</h2>
        <div className="divider"></div>
       
        <button className="download-btn">Download CSV</button>
      </div>
  
    </div>
  );
};

export default BrandBulkUpload;
