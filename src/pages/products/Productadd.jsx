import React, { useState } from "react";
import "./Product.css";
import { X } from "lucide-react";
import { useProductContext } from "../../productContex";
import { Link } from "react-router-dom"




const ProductMediaForm = () => {
  const [videoProvider, setVideoProvider] = useState("Youtube");
  const [galleryImgs, setGalleryImgs] = useState([])
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [pdfSpecification, setPdfSpecification] = useState(null)


  const { productData, setProductData } = useProductContext()

  console.log(productData)

  // Handle file selection for gallery (multiple)
  const handleGalleryChange = (e) => {
    setGalleryImgs([...e.target.files]); // Convert FileList to Array
  };



  // Handle file selection for thumbnail
  const handleThumbnailChange = (e) => {
    setThumbnailImage(e.target.files[0]);
  };

  const handlePdfSpecificationChange = (e) => {
    setPdfSpecification(e.target.files[0]);
  };



  return (

    <div className="form-container">
      <h2 className="form-title">Product Files & Media</h2>
      <div className="divider"></div>

      <div className="form-group">
        <label>Gallery Images</label>
        <div className="input-container">

          <div className="PreProductInputDiv">
            <label className="file-label">
              Browse

              <input type="file" className="file-input" multiple onChange={handleGalleryChange} />
            </label>
            <span className="file-name">{galleryImgs.length} files selected</span>
          </div>
          <p className="description">
            These images are visible in the product details page gallery. Minimum dimensions required: 900px width X 900px height.
          </p>
        </div>
      </div>

      {
        galleryImgs && galleryImgs.length > 0 ?
          <div className="form-group">
            <label>Selected Images</label>
            <div className="input-container">

              <div className="flex flex-row gap-[.2cm]">
                {
                  galleryImgs.map((g, i) => (
                    <div className="relative ">
                      <img src={URL.createObjectURL(g)} key={i} alt="gallery images" className="w-[4cm] flex-shrink-0 " />
                      <div className="p-[.2cm] rounded-[50%] bg-blue-100 w-fit absolute top-0  ">
                        <X size={16} color="blue" />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          : null
      }


      <div className="form-group">
        <label>Thumbnail Image</label>
        <div className="input-container">
          <div className="PreProductInputDiv">
            <label className="file-label">
              Browse

              <input type="file" className="file-input" onChange={handleThumbnailChange} />
            </label>
            <span className="file-name">{thumbnailImage?.name}</span>
          </div>
          <p className="description">
            This image is visible in all product boxes. Minimum dimensions required: 195px width X 195px height.
          </p>
        </div>
      </div>

      <div className="form-group">
        <label>Video Provider</label>
        <div className="input-container">
          <select className="dropdown" value={productData.videoProvider} onChange={(e) => {
            setProductData((prev) => ({
              ...prev,
              videoProvider: e.target.value
            }))
          }}>
            <option value="Youtube">Youtube</option>
            <option value="Vimeo">Vimeo</option>
            <option value="Dailymotion">Dailymotion</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Video Link</label>
        <div className="input-container">
          <input type="text" placeholder="Video Link" value={productData.videoLink} onChange={(e) => {
            setProductData((prev) => ({
              ...prev,
              videoLink: e.target.value
            }))
          }} className="text-input" />
          <p className="description">
            Use a proper link without extra parameters. Don't use short share links or embedded iframe code.
          </p>
        </div>
      </div>

      <div className="form-group">
        <label>PDF Specification</label>
        <div className="input-container">
          <div className="PreProductInputDiv">
            <label className="file-label">
              Browse

              <input type="file" className="file-input" onChange={handlePdfSpecificationChange} />
            </label>
            <span className="file-name">{pdfSpecification?.name}</span>
          </div>
        </div>
      </div>

      <div className="button-group">
        <button className="btn-btn-gray">Save & Unpublish</button>
        <Link to='/products/create/price-stock' >
          <button className="btn-btn-green" onClick={() => {
            setProductData((prev) => ({
              ...prev,
              galleryImages: galleryImgs,
              thumbnailImage: thumbnailImage,
              pdfSpecification: pdfSpecification
            }))
          }} >Save & Publish</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductMediaForm;
