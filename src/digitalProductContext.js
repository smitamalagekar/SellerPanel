import { createContext, useContext, useState } from "react"
const DigitalProductContext = createContext()

export default function DigitalProductProvider({ children }) {

    const [productData, setProductData] = useState({
        // Basic Info
        productName: "",
        tags: [],
        description: "",
        salePrice: "",
        regularPrice: "",
        flashDeal: {
            title: "",
            dateRange: "",
            discount: "0",
            discountType: ""
        },
        tax: {
            type: "",
            amount: "0"
        },
        vat: {
            type: "",
            amount: "0"
        },
        galleryImages: [],
        thumbnailImage: "",
        pdfSpecification: "",
        unitPrice: "",
        metaTitle: "",
        metaDescription: "",
        productdescription: "",
        specification: "",
        highlights: "",
        features: "",
        metaImage: "",

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


    // useEffect(() => {
    //     const fetchAllProducts = async () => {
    //         const response = await apiInstance.get('/products/');
    //         setAllProducts(response.data.data)
    //         setFetchProducts(false)
    //     }
    //     fetchAllProducts();
    // }, [fetchProducts])

    // console.log(allProducts)
    return (
        <DigitalProductContext.Provider value={{ productData, setProductData, allProducts, setAllProducts, setFetchProducts }}>
            {children}
        </DigitalProductContext.Provider>
    )
}

export const useDigitalProductContext = () => {
    return useContext(DigitalProductContext)
}