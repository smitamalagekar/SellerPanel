import React, { useState } from "react";
import "./Seo.css";
import { useProductContext } from "../../productContex";
import { Link } from "react-router-dom"

const SeoMetaForm = () => {
  const [metaImage, setMetaImage] = useState(null)
  const { productData, setProductData } = useProductContext()

  console.log(productData)

  return (
    <div className="form-container">
      <h2 className="form-title">SEO Meta Tags</h2>
      <div className="divider"></div>

      <div className="form-group">
        <label>Meta Title</label>
        <div className="input-container">
          <input type="text" className="text-input" placeholder="Meta Title" value={productData.metaTitle} onChange={(e) => {
            setProductData((prev) => ({
              ...prev,
              metaTitle: e.target.value
            }))
          }} />
        </div>
      </div>

      <div className="form-group">
        <label>Description</label>
        <div className="input-container">
          <textarea className="text-input" placeholder="Description" rows="4" value={productData.metaDescription} onChange={(e) => {
            setProductData((prev) => ({
              ...prev,
              metaDescription: e.target.value
            }))
          }}></textarea>
        </div>
      </div>

      <div className="form-group">
        <label>Meta Image</label>
        <div className="input-container">
          <div className="PreProductInputDiv">
            <label className="file-label">
              Browse

              <input type="file" className="file-input" onChange={(e) => { setMetaImage(e.target.files[0]) }} />
            </label>
            <span className="file-name">{metaImage?.name}</span>
          </div>
        </div>
      </div>

      <div className="button-group">
        <button className="btn-btn-gray">Save & Unpublish</button>
        <Link to='/products/create/shipping'>
          <button className="btn-btn-green" onClick={() => {
            setProductData((prev) => ({
              ...prev,
              metaImage: metaImage
            }))
          }}>Save & Publish</button>
        </Link>
      </div>
    </div>
  );
};

export default SeoMetaForm;