import React, { useEffect, useState } from "react";
import { Download, Plus, Star } from "lucide-react";
import ProductTable from "./ProductTable";
import apiInstance from "../../utils/axios";


const BestSellerProducts = () => {
 const [currentPage, setCurrentPage] = useState(1);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;


    const statusBadge = (status) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        switch (status) {
          case "In Stock":
            return <span className={`${baseClasses} bg-green-100 text-green-800`}>{status}</span>;
         
          case "Low Stock":
            return <span className={`${baseClasses} bg-red-100 text-red-800`}>{status}</span>;
          default:
            return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
        }
      };
  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const response = await apiInstance.get('/best-seller-product');
        const transformedData = response.data.map(product => ({
          id: product._id,
          product: product.productName,
          category: product.category,
          sales: product.sales,
          stock: product.stock,
          rating: product.rating,
          price: `${product.price.toFixed(2)}`,
          status: product.status.toLowerCase()
        }));
        setSellerProducts(transformedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching weekly products:', err);
      }
    };

    fetchSellerProducts();
  }, []);


  const columns = [
    { header: "Product", accessor: (item) => item.product },
    { header: "Category", accessor: (item) => item.category },
    { header: "Sales", accessor: (item) => item.sales.toLocaleString() },
    { header: "Rating", accessor: (item) => <div className="flex items-center"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />{item.rating}</div> },
    { header: "Stock", accessor: (item) => item.stock },
    { header: "Status", accessor: (item) => statusBadge(item.status) },
    { header: "Price", accessor: (item) => item.price },
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-center items-center h-40">
          <p>Loading weekly products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-center items-center h-40">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Best Selling Products</h2>
        <p className="text-sm text-gray-500">Best performing products this week</p>
      </div>

      <ProductTable 
        columns={columns} 
        data={sellerProducts} 
        currentPage={currentPage} 
        itemsPerPage={itemsPerPage} 
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default BestSellerProducts;