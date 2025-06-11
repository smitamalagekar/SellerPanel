import { createContext, useContext, useEffect, useState } from "react"
// import apiInstance from "./utils/axios"
import axios from "axios";

const ProductContext = createContext()

export default function ProductProvider({ children }) {

    const [productData, setProductData] = useState({
        // Basic Info
        productName: "",
        brand: "",
        unit: "",
        // weight: "",
        minPurchaseQty: "",
        salePrice: "",
        category: "",
        productCategory: "",
        regularPrice: "",
        discountDateRange: "",
        productdescription: "",
        specification: "",
        highlights: "",
        features: "",
        tags: [],
        barcode: "",
        // category: [],
        description: "",
        refundable: "",
        refundNote: "",
        featured: "",
        todaysDeal: "",
        flashDeal: {
            isActive: "",
            title: "",
            discount: "0",
            discountType: "",
            dateRange: ""
        },
        tax: {
            type: "",
            amount: "0"
        },
        vat: {
            type: "",
            amount: "0"
        },
        videoProvider: "",
        videoLink: "",
        galleryImages: [],
        thumbnailImage: "",
        pdfSpecification: "",

        // Price & Stock
        // colors: [],
        // attributes: [],
        unitPrice: "",
        // discountDate: "",
        // discount: "",
        // discountType: "",
        setPoint: "",
        sku: "",
        // externalLink: "",
        // externalLinkButtonText: "",
        lowStockQuantityWarning: "",
        quantity: "",
        showStockWithTextOnly: "",
        hideStock: "",

        // SEO Meta
        metaTitle: "",
        metaDescription: "",
        metaImage: "",

        // Shipping Configuration
        shippingConfig: {
            cashOnDelivery: "",
            freeShipping: "",
            flatRate: "",
            isProductQuantityMultiply: "",
            shippingDays: ""
        },

        // Warranty
        warranty: "",

        // Frequently Bought
        frequentlyBought: {
            // selectionType: "",
            products: [],
            categories: [
                {
                    category: "",
                    subcategories: [{ subcategory: "", items: [] }]
                }
            ],
            category: "",
        }
    });

    const [allProducts, setAllProducts] = useState([

    ])

    const [fetchProducts, setFetchProducts] = useState(false)


    useEffect(() => {
        const fetchAllProducts = async () => {
            const response = await axios.get('https://e-commerce-backend-1-0.onrender.com/api/products/getall');
            setAllProducts(response.data.data)
            setFetchProducts(false)
        }
        fetchAllProducts();
    }, [fetchProducts])

    console.log(allProducts)
    return (
        <ProductContext.Provider value={{ productData, setProductData, allProducts, setAllProducts, setFetchProducts }}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProductContext = () => {
    return useContext(ProductContext)
}