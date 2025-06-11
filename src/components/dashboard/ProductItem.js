import React from 'react';

function ProductItem({ product }) {
  if (!product) {
    return null; // Return null if product is undefined
  }

  return (
    <li className="flex justify-between items-center py-2 border-b">
      <div className="flex items-center">
        <img
          src={product.image || '/images/default-product.webp'} // Provide a default image if product.image is undefined
          alt={product.name || 'Product'}
          className="w-8 h-8 mr-2 rounded-lg"
        />
        <span className="text-gray-700 font-medium">{product.name || 'Unknown Product'}</span>
      </div>
      <span className="text-gray-800 font-semibold">{product.price || 'N/A'}</span>
    </li>
  );
}

export default ProductItem;