/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

// Product component
export const Product = ({ product, addToCart, setSelectedProduct }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getCategoryColor = (category) => {
    const colors = {
      electronics: "bg-blue-500",
      jewelry: "bg-purple-500",
      "men's clothing": "bg-green-500",
      "women's clothing": "bg-pink-500",
    };
    return colors[category] || "bg-gray-500";
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000); // Hide tooltip after 2 seconds
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 relative">
      <div
        className={`absolute top-2 right-2 ${getCategoryColor(
          product.category
        )} text-white text-xs font-bold px-2 py-1 rounded-full`}
        onClick={() => setSelectedProduct(product)}
      >
        {product.category}
      </div>
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-contain mb-4 rounded"
        onClick={() => setSelectedProduct(product)}
      />
      <h3
        className="text-lg font-semibold mb-2 truncate"
        onClick={() => setSelectedProduct(product)}
      >
        {product.title}
      </h3>
      <p
        className="text-gray-600 mb-4"
        onClick={() => setSelectedProduct(product)}
      >
        ${product.price.toFixed(2)}
      </p>
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Add to Cart
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-green-500 text-white text-sm rounded-md shadow-lg whitespace-nowrap">
            <CheckCircle className="inline-block mr-1" size={16} />
            Added to cart!
          </div>
        )}
      </button>
    </div>
  );
};
