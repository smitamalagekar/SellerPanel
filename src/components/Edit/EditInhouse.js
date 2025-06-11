import React, { useState } from "react";
import "./Editinhouse.css";
import { useProductContext } from "../../productContex";
import { X } from "lucide-react"
import { Link } from "react-router-dom"
import ProductCategory from "../../components/ProductCategory";
import { useParams } from "react-router-dom";
import Switch from "../Switch";

const EditInhouse = () => {

    const { id } = useParams(); // Get the product ID from URL

  const [description, setDescription] = useState("");
  const [isRefundable, setIsRefundable] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isTodaysDeal, setIsTodaysDeal] = useState(false);
  const [flashTitle, setFlashTitle] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState("");
  const [tax, setTax] = useState(0);
  const [taxType, setTaxType] = useState("flat");
  const [vat, setVat] = useState(0);
  const [vatType, setVatType] = useState("flat");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  // const [showHotCategories, setShowHotCategories] = useState(false);

  // const toggleHotCategories = () => {
  //   setShowHotCategories(!showHotCategories);
  // }











  const { productData, setProductData } = useProductContext()

  console.log(productData)

  const handleChangeInputFields = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFormat = (command) => {
    document.execCommand(command, false, null);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault(); // Prevent form submission
      setProductData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput(""); // Clear input field
    }
  };

  const removeTag = (index) => {
    setProductData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };




  return (
    <div className="container2 ">
      {/* Left Side - Form */}
      <div className="form-container-general">
        <h2>Product Information</h2>

        <br />
        <div className="divider"></div>
        <form>
          <div className="form-group-gen">
            <label>Product Name *</label>
            <input type="text" placeholder="Product Name" name="name" value={productData.name} onChange={handleChangeInputFields} />
          </div>

          <div className="form-group-brand">
            <label>Brand</label>
            <select name="brand" value={productData.brand} onChange={handleChangeInputFields} >
              <option>Asus</option>
              <option>Dell</option>
              <option>ROG</option>
              <option>Vivo</option>
            </select>
          </div>

          <div className="form-group-gen">
            <label>Unit *</label>
            <input type="text" placeholder="Unit (e.g. KG, Pc etc)" name="unit" value={productData.unit} onChange={handleChangeInputFields} />
          </div>

          <div className="form-group-gen">
            <label>Weight (In Kg)</label>
            <input type="number" placeholder="0" name="weight" value={productData.weight} onChange={handleChangeInputFields} />
          </div>

          <div className="form-group-gen">
            <label>Minimum Purchase Qty *</label>
            <input type="number" placeholder="1" name="minPurchaseQty" value={productData.minPurchaseQty} onChange={handleChangeInputFields} />
          </div>

          <div className="form-group-gen">
            <label>Tags</label>
            <input
              type="text"
              placeholder="Type and hit enter to add a tag"
              name="tagInput"
              value={tagInput}
              onChange={(e) => { setTagInput(e.target.value) }}
              onKeyDown={handleKeyDown}
            />
          </div>

          {
            productData.tags && productData.tags.length > 0 ?
              <div className=" flex flex-wrap gap-[.3cm] ">
                {productData.tags.map((t, i) => (
                  <p className="px-[.25cm] flex items-center gap-[.1cm] bg-[forestgreen] text-white rounded-[20px]  "  >
                    {t} <X size={16} onClick={() => { removeTag(i) }} />
                  </p>
                ))}
              </div>
              : null
          }

          <div className="form-group-gen">
            <label>Barcode</label>
            <input type="text" placeholder="Barcode" name="barcode" value={productData.barcode} onChange={handleChangeInputFields} />
          </div>
        </form>
        {/* Full Width Section - Description, Refund, and Status */}

        {/* Description */}
        <div className="editor-container">
          <label className="editor-label">Description</label>
          <div className="edit">
            <div className="toolbar">
              <button onClick={() => handleFormat("bold")} title="Bold (CTRL+B)">
                <b>B</b>
              </button>
              <button onClick={() => handleFormat("underline")} title="Underline">
                <u>U</u>
              </button>
              <button onClick={() => handleFormat("italic")} title="Italic">
                <i>I</i>
              </button>
              <button onClick={() => handleFormat("insertUnorderedList")} title="Bullet List">
                ••
              </button>
              <button onClick={() => handleFormat("insertOrderedList")} title="Numbered List">
                1.
              </button>
              <button onClick={() => handleFormat("justifyLeft")} title="Align Left">
                ⬅
              </button>
              <button onClick={() => handleFormat("justifyCenter")} title="Align Center">
                ⬆
              </button>
              <button onClick={() => handleFormat("justifyRight")} title="Align Right">
                ➡
              </button>
              <button onClick={() => handleFormat("undo")} title="Undo">
                ↩
              </button>
              <button onClick={() => handleFormat("redo")} title="Redo">
                ↪
              </button>
            </div>
          </div>
          <div
            className="editor"
            contentEditable
            name="description"
            onInput={(e) => {
              setProductData((prev) => ({
                ...prev,
                description: e.target.innerHTML
              }))
            }}

          ></div>
        </div>

        <br />
        <div className="section">
          <h3>Refund</h3>

          <div className="divider"></div>
          <br />
          <div className="toggle-group">
            <div className="group">
              <label>Refundable?</label>
            </div>
            <div className="refund">
              {/* <input
                type="checkbox"
                id="refundToggle"
                className="custom-toggle"
                checked={isRefundable}
                onChange={() => {
                  setIsRefundable(!isRefundable)
                  setProductData((prev) => ({
                    ...prev,
                    refundable: !isRefundable ? true : false
                  }))
                }}
              />
              <label htmlFor="refundToggle" className="toggle-label"></label> */}
              <Switch
                              value={productData.refundable}
                              onChangeFunc={() =>
                                setProductData((prev) => ({
                                  ...prev,
                                  refundable: !prev.refundable,
                                }))
                              }
                            />
            </div>
          </div>


          {/* Refund Note Section - Appears Only When Toggle is ON */}
          {productData.refundable && (
            <div className="refund-note">
              <label>Note (Add from preset)</label>
              <div className="refund-note-box">
                <span>+ Select Refund Note</span>
              </div>
            </div>
          )}
        </div>
        <br />
        {/* Status Section */}
        <div className="section">
          <h3>Status</h3>
          <div className="divider"></div>
          <div className="toggle-group">
            <label>Featured</label>
            {/* <input
              type="checkbox"
              id="featuredToggle"
              className="custom-toggle"
              checked={isFeatured}
              onChange={() => {
                setIsFeatured(!isFeatured)
                setProductData((prev) => ({
                  ...prev,
                  featured: !isFeatured ? true : false
                }))
              }}
            />
            <label htmlFor="featuredToggle" className="toggle-label"></label> */}
            <Switch
                          className="custom-toggle"
                          value={isFeatured}
                          onChangeFunc={() => {
                            const newValue = !isFeatured;
                            setIsFeatured(newValue);
                            setProductData((prev) => ({
                              ...prev,
                              featured: newValue,
                            }));
                          }}
                          />
            <p>If you enable this, this product will be granted as a featured product.</p>
          </div>
          <div className="toggle-group">
            <label>Today's Deal</label>
            <input
              type="checkbox"
              id="dealToggle"
              className="custom-toggle"
              checked={isTodaysDeal}
              onChange={() => {
                setIsTodaysDeal(!isTodaysDeal)
                setProductData((prev) => ({
                  ...prev,
                  todaysDeal: !isTodaysDeal ? true : false
                }))
              }}
            />
            <label htmlFor="dealToggle" className="toggle-label"></label>
            <p>If you enable this, this product will be granted as a today's deal product.</p>
          </div>

          <br />
          <h3>
            Flash Deal <span >(If you want to select this product as a flash deal, you can use it)</span>
          </h3>

          <div className="divider"></div>
          <br />
          {/* Add to Flash */}
          <div className="input-group">
            <label>Add To Flash</label>
            <select value={productData.flashDeal.addToFlash} onChange={(e) => {
              setProductData((prev) => ({
                ...prev,
                flashDeal: {
                  ...prev.flashDeal,
                  addToFlash: e.target.value
                }
              }))
            }}>
              <option value="">Choose Flash Title</option>
              <option value="flash_sale_1">Flash Sale 1</option>
              <option value="flash_sale_2">Flash Sale 2</option>
            </select>
          </div>

          {/* Discount */}
          <div className="input-group">
            <label>Discount</label>
            <input
              type="number"
              value={productData.flashDeal.discount}
              onChange={(e) => {
                setProductData((prev) => ({
                  ...prev,
                  flashDeal: {
                    ...prev.flashDeal,
                    discount: e.target.value
                  }
                }))
              }}
              min="0"
            />
          </div>

          {/* Discount Type */}
          <div className="input-group">
            <label>Discount Type</label>
            <select value={productData.flashDeal.discountType} onChange={(e) => {
              setProductData((prev) => ({
                ...prev,
                flashDeal: {
                  ...prev.flashDeal,
                  discountType: e.target.value
                }
              }))
            }}>
              <option value="">Choose Discount Type</option>
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>
        </div>
        <h3 className="heading">Vat & TAX</h3>
        <div className="divider"></div>

        {/* Tax Row */}
        <div className="row">
          <label className="label">Tax</label>
          <div className="input-group-Dropdown">
            <input type="number" value={productData.tax.value} className="input" onChange={(e) => {
              setProductData((prev) => ({
                ...prev,
                tax: {
                  ...prev.tax,
                  value: e.target.value

                }
              }))
            }} defaultValue="0" min="0" />
            <select className="dropdown" value={productData.tax.type} onChange={(e) => {
              setProductData((prev) => ({
                ...prev,
                tax: {
                  ...prev.tax,
                  type: e.target.value

                }
              }))
            }}>
              <option>Flat</option>
              <option>Percentage</option>
            </select>
          </div>
        </div>

        {/* Vat Row */}
        <div className="row">
          <label className="label">Vat</label>
          <div className="row-drop">
            <div className="input-group-Dropdown">
              <input type="number" className="input" value={productData.vat.value} onChange={(e) => {
                setProductData((prev) => ({
                  ...prev,
                  vat: {
                    ...prev.vat,
                    value: e.target.value

                  }
                }))
              }} defaultValue="0" min="0" />
              <select className="dropdown" value={productData.vat.type} onChange={(e) => {
                setProductData((prev) => ({
                  ...prev,
                  vat: {
                    ...prev.vat,
                    type: e.target.value

                  }
                }))
              }}>
                <option>Flat</option>
                <option>Percentage</option>
              </select>
            </div>
          </div>

        </div>

        <div className="button-group">
          <button className="btn-btn-gray">Save & Unpublish</button>
          <Link to='/products/create/add' >
            <button className="btn-btn-green">Save & Publish</button>
          </Link>
        </div>
      </div>



      {/* <div className="category-container">
        <h3>Product Category</h3>
        
      </div> */}




      <div className="pro3">
        <ProductCategory />
      </div>


    </div>
  );
};

export default EditInhouse;