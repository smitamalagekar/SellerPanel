import React, { useEffect, useState } from 'react';
import { TrendingUp, Star } from 'lucide-react';
import ProductTable from '../reports/ProductTable';
import apiInstance from "../../utils/axios"

const BestWeeklyProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [weeklyProducts, setWeeklyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchWeeklyProducts = async () => {
      try {
        const response = await apiInstance.get('/weekly-product');
        const transformedData = response.data.map(product => ({
          id: product._id,
          product: product.productName,
          category: product.category,
          sales: product.sales,
          rating: product.rating,
          change: product.weeklyChange,
          price: `${product.price.toFixed(2)}`,
          status: product.status.toLowerCase()
        }));
        setWeeklyProducts(transformedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching weekly products:', err);
      }
    };

    fetchWeeklyProducts();
  }, []);

  const columns = [
    { header: 'Product', accessor: (item) => item.product },
    { header: 'Category', accessor: (item) => item.category },
    { header: 'Sales', accessor: (item) => item.sales.toLocaleString() },
    { header: 'Rating', accessor: (item) => <div className="flex items-center"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />{item.rating}</div> },
    { header: 'Weekly Change', accessor: (item) => <span className={`text-sm font-medium ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{item.change}</span> },
    { header: 'Status', accessor: (item) => item.status === 'trending' ? <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800"><TrendingUp className="w-3 h-3 mr-1" />Trending</span> : <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">Popular</span> },
    { header: 'Price', accessor: (item) => item.price },
   
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
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Weekly Top Products</h2>
          <p className="text-sm text-gray-500">Best performing products this week</p>
        </div>
        
      </div>

      <ProductTable 
        columns={columns} 
        data={weeklyProducts} 
        currentPage={currentPage} 
        itemsPerPage={itemsPerPage} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default BestWeeklyProducts;