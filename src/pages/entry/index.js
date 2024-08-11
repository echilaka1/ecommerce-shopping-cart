import React, { useState, useEffect, useContext } from "react";
import { Search } from "lucide-react";
import { CartContext } from "../../context/CartContext";
import { Cart } from "../../components/ShoppingCart";
import { Product } from "../../components/Products";
import { CartIcon } from "../../components/CartIcon";
import { fetchProducts, fetchCategories } from "../../utils/apiUtils";
import { CategoryFilter } from "../../components/Categories";
import { ProductDetail } from "../../components/ProductDetails";

// Main component
const EcommerceProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {
    cart,
    removeFromCart,
    isCartOpen,
    toggleCart,
    updateQuantity,
    addToCart,
  } = useContext(CartContext);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || product.category === selectedCategory)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">E-commerce Product Catalog</h1>
          <CartIcon cart={cart} toggleCart={toggleCart} />
        </div>

        <div className="flex items-center mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white p-2 rounded-r">
            <Search size={24} />
          </button>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {isLoading ? (
          <div className="text-center text-xl">Loading products...</div>
        ) : error ? (
          <div className="text-center text-xl text-red-500">{error}</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-xl">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {filteredProducts.map((product) => (
              <Product
                key={product.id}
                product={product}
                addToCart={addToCart}
                setSelectedProduct={setSelectedProduct}
              />
            ))}
          </div>
        )}

        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
          />
        )}

        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          isCartOpen={isCartOpen}
          toggleCart={toggleCart}
          updateQuantity={updateQuantity}
        />
      </div>
    </div>
  );
};

export default EcommerceProductCatalog;
