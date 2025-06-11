import { Bold, Delete, Edit, Trash } from "lucide-react"
import "./Addwholesale.css"
import { MdOutlineSettings } from "react-icons/md"
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
// import { useProductContext } from "../../productContex";
// import Switch from "./Switch";
import ProductCategory from "../ProductCategory";
import Switch from "../Switch";
import ProductSettings from "./Productsetting";
import Shippingsetting from "./Shippingsetting"
import CashOnDeliverySettings from "./Cashondelivery";
import MoreProductsToPreorder from "./Producttopreorder";
import ProductPriceDiscounts from "./Productpricedelivery";


export default function WholesaleCreate() {

    const [quantity, setQuantity] = React.useState(1);

    const [showQuantity, setShowQuantity] = useState(true);
    const [showTextOnly, setShowTextOnly] = useState(false);
    const [hideStock, setHideStock] = useState(false);

    const [status, setStatus] = useState(true);

    const [showShipping, setShowShipping] = useState(true);
    const [showRate, setShowRate] = useState(true);
    const [showMulitiply, setShowMulitiply] = useState(true);
    const [showStatus, setShowStatus] = useState(true);
    const [showFeatured, setShowFeatured] = useState(true);
    const [showDeal, setShowDeal] = useState(true);
    const [tax, setTax] = useState("");
    const [vat, setVat] = useState("");
    const [taxType, setTaxType] = useState("Flat");
    const [vatType, setVatType] = useState("Flat");

    const [flashTitle, setFlashTitle] = useState("");
    const [discount, setDiscount] = useState(0);
    const [discountType, setDiscountType] = useState("");
    const [shippingDays, setShippingDays] = useState("");

    const [selectedOption, setSelectedOption] = useState("product");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [productData, setProductData] = useState("");
    const navigate = useNavigate();
  

   

    const [videoProvider, setVideoProvider] = useState("Youtube");
    const [videoLink, setVideoLink] = useState("");

    const [wholesalePrices, setWholesalePrices] = useState([{ minQT: "", maxQT: "", price: "" }]);

    const addWholesalePrice = () => {
        setWholesalePrices([...wholesalePrices, { minQT: "", maxQT: "", price: "" }]);
    };

    const removeWholesalePrice = (index) => {
        const newPrices = [...wholesalePrices];
        newPrices.splice(index, 1);
        setWholesalePrices(newPrices);
    };

    const [description, setDescription] = useState("");

    const [fileName, setFileName] = useState("Choose file");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName("Choose file");
        }
    };

    const [isRefundable, setIsRefundable] = useState(false);


    const [metaImage, setMetaImage] = useState(null)
    // const { productData, setProductData } = useProductContext()

    console.log(productData)

    const [isWarranty, setIsWarranty] = useState(false);
    const [warrantyType, setWarrantyType] = useState("");
   
    const [shippingCost, setShippingCost] = useState(0); // Shipping cost state

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/wholesale/Addewholesale");
    };

    const faqs = [
        {
            id: 1,
            name: "MistyRose",

        },
        {
            id: 2,
            name: "Ivory",

        },
        {
            id: 3,
            name: "Silver",

        },
        {
            id: 4,
            name: "DarkGray",

        },
        {
            id: 5,
            name: "LightGrey",

        },
    ]
    return (
        <div className="PreOrderFaq-whole ">
            <div className="product-table">
                <p className="customersText mt-4 ml-6">
                    Add new wholesale product
                </p>
            </div>
            <div className="preOrderFaqBox-new">
                <div className="procol">
                    <div className="preOrderFaqLeft-new">
                        <div className="border p-4 rounded">
                        <div className="">
                            <p className="allFaq">Product Information</p>
                            {/* <input type="text" placeholder="Type to search...." className="searchFaq" /> */}
                        </div>
                        <br></br>
                        <div className="seo-divider"></div>
                        <div className="preOrderLeftLower">
                            <form className="addwhole-form">
                                {/* Product Name */}
                                <div className="addwhole-field">
                                    <label className="addwhole-label">
                                        Product Name <span className="required">*</span>
                                    </label>
                                    <input type="text" className="addwhole-input" placeholder="Product Name" />
                                </div>

                                {/* Brand */}
                                <div className="addwhole-field">
                                    <label className="addwhole-label">Brand</label>
                                    <select className="addwhole-input">
                                        <option>Select Brand</option>
                                    </select>
                                </div>

                                {/* Unit */}
                                <div className="addwhole-field">
                                    <label className="addwhole-label">
                                        Unit <span className="required">*</span>
                                    </label>
                                    <input type="text" className="addwhole-input" placeholder="Unit (e.g. KG, Pc etc)" />
                                </div>

                                {/* Minimum Purchase Qty */}
                                <div className="addwhole-field">
                                    <label className="addwhole-label">
                                        Minimum Purchase Qty <span className="required">*</span>
                                    </label>
                                    <input type="number" className="addwhole-input" placeholder="1" />
                                </div>

                                {/* Tags */}
                                <div className="addwhole-tags">
                                    <div className="addwhole-tags-field">
                                        <label className="addwhole-tags-label">
                                            Tags <span className="required">*</span>
                                        </label>
                                        <input type="text" className="addwhole-tags-input" placeholder="Type and hit enter to add a tag" />
                                    </div>
                                    <p className="addwhole-tags-helper">
                                        This is used for search. Input those words by which customers can find this product.
                                    </p>
                                </div>
                                {/* Barcode */}
                                <div className="addwhole-field">
                                    <label className="addwhole-label">Barcode</label>
                                    <input type="text" className="addwhole-input" placeholder="Barcode" />
                                </div>
                            </form>
                        </div>
                        </div>
                  


                    <div className="pro-container">
                        <h3 className="pro-heading">Product Files & Media</h3>
                        <div className="seo-divider"></div>
                        {/* Gallery Images */}
                        <div className="pro-field">
                            <label className="pro-label">
                                Gallery Images <span className="pro-size">(600×600)</span>
                            </label>
                            <div className="pro-file-input">
                                <button className="pro-btn">Browse</button>
                                <input type="file" className="pro-input" />
                                <span className="pro-placeholder">Choose file</span>
                            </div>
                            <p className="pro-helper">
                                These images are visible in the product details page gallery. Use 600×600 size images.
                            </p>
                        </div>

                        {/* Thumbnail Image */}
                        <div className="pro-field">
                            <label className="pro-label">
                                Thumbnail Image <span className="pro-size">(300×300)</span>
                            </label>
                            <div className="pro-file-input">
                                <button className="pro-btn">Browse</button>
                                <input type="file" className="pro-input" />
                                <span className="pro-placeholder">Choose file</span>
                            </div>
                            <p className="pro-helper">
                                This image is visible in all product boxes. Use 300×300 size images. Keep some blank space
                                around the main object of your image as we had to crop some edges in different devices to
                                make it responsive.
                            </p>
                        </div>
                    </div>
                  

                    {/* <div className="product-price-container">
                        <h3 className="product-price-title">Product price + stock</h3>
                        <div className="seo-divider"></div>
                        <div className="input-group">
                            <label>Unit price <span className="required">*</span></label>
                            <input type="number" placeholder="0" />
                        </div>

                        <div className="input-group">
                            <label>Set Point</label>
                            <input type="number" placeholder="0" />
                        </div>

                        <div className="input-group">
                            <label>Quantity <span className="required">*</span></label>
                            <input type="number" placeholder="0" />
                        </div>

                        <div className="input-group">
                            <label>SKU</label>
                            <input type="text" placeholder="SKU" />
                        </div>

                        <div className="wholesale-section">
                            <label>Wholesale Prices</label>
                            {wholesalePrices.map((price, index) => (
                                <div className="wholesale-row" key={index}>
                                    <input type="number" placeholder="Min QT" />
                                    <input type="number" placeholder="Max QT" />
                                    <input type="number" placeholder="Price per piece" />
                                    <button className="remove-btn" onClick={() => removeWholesalePrice(index)}><RxCross2 /></button>
                                </div>
                            ))}
                            <button className="add-btn" onClick={addWholesalePrice}>Add More</button>
                        </div>
                    </div> */}
                    {/* Description */}
                    <div className="product-description-container">
                        <h3 className="product-description-title">Product Description</h3>
                        <div className="seo-divider"></div>

                        <div className="description-group">
                            <label className="description-label">Description</label>
                            <textarea
                                className="description-textarea"
                                placeholder="Enter product description..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                    </div>    
                                    {/* Product Price & Discounts */}
                                    <ProductPriceDiscounts/>

                    {/* SEO */}
                    <div className="seo-container">
                        <h2 className="seo-title">SEO Meta Tags</h2>
                        <div className="seo-divider"></div>

                        {/* Meta Title */}
                        <div className="seo-group">
                            <label className="seo-label">Meta Title</label>
                            <div className="seo-input-wrapper">
                                <input
                                    type="text"
                                    className="seo-input"
                                    placeholder="Meta Title"
                                    value={productData.metaTitle}
                                    onChange={(e) =>
                                        setProductData((prev) => ({ ...prev, metaTitle: e.target.value }))
                                    }
                                />
                            </div>
                        </div>

                        {/* Meta Description */}
                        <div className="seo-group">
                            <label className="seo-label">Description</label>
                            <div className="seo-input-wrapper">
                                <textarea
                                    className="seo-textarea"
                                    placeholder="Description"
                                    rows="4"
                                    value={productData.metaDescription}
                                    onChange={(e) =>
                                        setProductData((prev) => ({
                                            ...prev,
                                            metaDescription: e.target.value,
                                        }))
                                    }
                                ></textarea>
                            </div>
                        </div>

                        {/* Meta Image */}
                        <div className="seo-group">
                            <label className="seo-label">Meta Image</label>
                            <div className="seo-input-wrapper">
                                <div className="seo-file-container">
                                    <label className="seo-file-btn">
                                        Browse
                                        <input
                                            type="file"
                                            className="seo-file-input"
                                            onChange={(e) => setMetaImage(e.target.files[0])}
                                            hidden
                                        />
                                    </label>
                                    <span className="seo-file-name">
                                        {metaImage ? metaImage.name : "No file chosen"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* refund */}
                    <div className="refund-container-new">
                        <h3 className="refund-title">Refund</h3>
                        <div className="seo-divider"></div>
                        <div className="refund-option">
                            <span>Refundable?</span>
                            <Switch
                                value={isRefundable}
                                onChangeFunc={() => setIsRefundable(!isRefundable)}
                            />
                        </div>

                        {/* Refund Note */}
                        {isRefundable && (
                            <div className="refund-note mt-4">
                                <label className="note-label block mb-1 font-medium">Refund Note</label>
                                <div className="note-box p-2 border border-gray-300 rounded-md cursor-pointer">
                                    + Select Refund Note
                                </div>
                            </div>
                        )}
                    </div>
                  
                </div>
                </div>

                <div className="prerow-whole8">
                    <div className="preOrderFaqRight-new">

                        {/* <div className="preOrderFaqRightHead">
                            <p className="allFaq">Product category</p>
                        </div>

                        <div className="faqForm">
                            <label>Name</label>
                            <input type="text" placeholder="Enter question" className="faqInp" />

                            <label>Color Code</label>
                            <input type="text" placeholder="Enter Code" className="faqInp" />

                            <div className="inpSubBox">
                                <input type="submit" value="Save" className="inpSub" />
                            </div>
                        </div> */}
                       <div className="border p-5 rounded">
                       <div className="preOrderFaqRightHead">
                            <p className="allFaq">Product category</p>
                        </div>
                      
                        <ProductCategory/>
                        </div>
                    {/* </div> */}
                    {/* <div className="preOrderFaqRight-new mt-5">
                        <div className="preOrderFaqRightHead  ">
                            <p className="allFaq">Shipping Configuration</p>
                        </div>

                        <div className="faqForm">
                            <div className=" flex items-center justify-between  w-full">
                                <label className="text-black w-fit font-normal">Free Shipping</label>
                                <button
                                    onClick={() => setShowShipping(!showShipping)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showShipping ? "bg-green-500" : "bg-gray-300"
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showShipping ? "translate-x-6" : "translate-x-1"
                                            }`}
                                    />
                                </button>
                            </div>
                            <div className=" flex items-center justify-between w-full">
                                <label className="text-black font-normal">Flat Rate</label>
                                <button
                                    onClick={() => setShowRate(!showRate)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showRate ? "bg-green-500" : "bg-gray-300"
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showRate ? "translate-x-6" : "translate-x-1"
                                            }`}
                                    />
                                </button>
                            </div>
                            <div className=" flex items-center justify-between w-full">
                                <label className="text-black font-normal">Is Product Quantity Mulitiply</label>
                                <button
                                    onClick={() => setShowMulitiply(!showMulitiply)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showMulitiply ? "bg-green-500" : "bg-gray-300"
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showMulitiply ? "translate-x-6" : "translate-x-1"
                                            }`}
                                    />
                                </button>

                            </div>
                        </div>
                    </div> */}
                    <ProductSettings/>
                    <Shippingsetting />
                   
                   
                    <CashOnDeliverySettings/>
                    {/* <div className="max-w-xl w-full mx-auto mt-2 rounded-md  border border-gray-300 p-6 pb-8">
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                            Featured
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">Status</span>
                                <button
                                    onClick={() => setShowFeatured(!showFeatured)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showFeatured ? "bg-green-500" : "bg-gray-300"
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showFeatured ? "translate-x-6" : "translate-x-1"
                                            }`}
                                    />
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className="max-w-xl w-full mx-auto mt-2 rounded-md  border border-gray-300 p-6 pb-8">
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                            Todays Deal
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">Status</span>
                                <button
                                    onClick={() => setShowDeal(!showDeal)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showDeal ? "bg-green-500" : "bg-gray-300"
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showDeal ? "translate-x-6" : "translate-x-1"
                                            }`}
                                    />
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="w-full max-w-xl mx-auto  border border-gray-300 rounded-md p-4 mt-4 pb-8">
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Flash Deal</h2>

                        
                        <div className="mt-4">
                            <label className="block text-sm  font-normal text-gray-700 mb-1">Add To Flash</label>
                            <select
                                value={flashTitle}
                                onChange={(e) => setFlashTitle(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-transparent"
                            >
                                <option value="">Choose Flash Title</option>
                                <option value="flash1">End of Season</option>
                                <option value="flash2">Winter Sale</option>
                                <option value="flash2">Electronics</option>
                                <option value="flash2">Flash Deal</option>
                                <option value="flash2">Flash Sale</option>
                            </select>
                        </div>

                        
                        <div className="mt-4">
                            <label className="block text-sm font-normal text-gray-700 mb-1">Discount</label>
                            <input
                                type="number"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-transparent"
                            />
                        </div>

                        
                        <div className="mt-4">
                            <label className="block text-sm font-normal text-gray-700 mb-2">Discount Type</label>
                            <select
                                value={discountType}
                                onChange={(e) => setDiscountType(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-transparent"
                            >
                                <option value="">Choose Discount Type</option>
                                <option value="flat">Flat</option>
                                <option value="percent">Percent</option>
                            </select>
                        </div>

                    </div> */}
                  

                    <div className="w-full max-w-xl mx-auto border border-gray-300 rounded-md p-4 mt-4">
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Vat & TAX</h2>

                        {/* Tax Section */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tax</label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={tax}
                                    onChange={(e) => setTax(e.target.value)}
                                    className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300"
                                />
                                <select
                                    value={taxType}
                                    onChange={(e) => setTaxType(e.target.value)}
                                    className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300"
                                >
                                    <option>Flat</option>
                                    <option>Percent</option>
                                </select>
                            </div>
                        </div>
                 {/* VAT Section */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Vat</label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={vat}
                                    onChange={(e) => setVat(e.target.value)}
                                    className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300"
                                />
                                <select
                                    value={vatType}
                                    onChange={(e) => setVatType(e.target.value)}
                                    className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300"
                                >
                                    <option>Flat</option>
                                    <option>Percent</option>
                                </select>
                            </div>
                        </div>
                        
                    </div>
                       {/* Frequently */}
                       <div className="w-full max-w-4xl mx-auto border border-gray-200 rounded-md p-4 mt-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800">Frequently Bought</h3>
                        <div className="border-b border-gray-200 my-3"></div>

                        {/* Radio Options */}
                        <div className="flex flex-wrap gap-6 mt-3 text-sm font-medium text-gray-700">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="frequent"
                                    value="product"
                                    checked={selectedOption === "product"}
                                    onChange={() => setSelectedOption("product")}
                                    className="accent-blue-600 w-4 h-4"
                                />
                                <span className={selectedOption === "product" ? "font-semibold" : ""}>
                                    Select Product
                                </span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="frequent"
                                    value="category"
                                    checked={selectedOption === "category"}
                                    onChange={() => setSelectedOption("category")}
                                    className="accent-blue-600 w-4 h-4"
                                />
                                <span className={selectedOption === "category" ? " font-semibold" : ""}>
                                    Select Category
                                </span>
                            </label>
                        </div>

                        {/* Category Dropdown */}
                        {selectedOption === "category" && (
                            <div className="mt-5 flex flex-wrap items-center gap-3">
                                <label className="text-sm text-gray-700 font-medium">Category</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="">Select Category</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="fashion">Fashion</option>
                                    <option value="grocery">Grocery</option>
                                    <option value="books">Books</option>
                                </select>
                            </div>
                        )}

                        {/* Add More Box - Show only for 'product' selection */}
                        {selectedOption === "product" && (
                            <div className="mt-6">
                                <div className="w-full border border-dashed border-gray-300 rounded-md py-4 text-center text-gray-600 text-sm hover:bg-gray-50 cursor-pointer transition">
                                    + Add More
                                </div>
                            </div>
                        )}
                    </div>
                    <MoreProductsToPreorder/>
                    {/* <div className="button-group">
                      <button className="btn-btn-gray">Save & Unpublish</button>
                      <Link to='/products/create/add' >
                        <button className="btn-btn-green">Save & Publish</button>
                      </Link>
                    </div> */}
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
    )
}