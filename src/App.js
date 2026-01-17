import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import { FaShoppingCart } from "react-icons/fa";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(term.toLowerCase()) ||
          product.description.toLowerCase().includes(term.toLowerCase()),
      );
      setFilteredProducts(filtered);
    }
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    // Show toast-like feedback
    // alert(`${product.title} added to cart!`);
  };

  // Handle remove from cart
  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Handle view product
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  // Handle close detail
  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="App">
      {/* Floating Cart Button */}
      <button
        className="floating-cart-btn"
        onClick={() => setCartOpen(!cartOpen)}
        title="Shopping Cart"
      >
        <FaShoppingCart size={24} />
        {cartTotal > 0 && <span className="cart-badge">{cartTotal}</span>}
      </button>

      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${cartOpen ? "show" : ""}`}>
        <div className="cart-header">
          <h5 className="mb-0">
            <FaShoppingCart className="me-2" />
            Shopping Cart ({cartTotal})
          </h5>
          <button
            className="btn btn-sm btn-close"
            onClick={() => setCartOpen(false)}
          ></button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="text-muted text-center py-5">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <p className="mb-1 small cart-item-title">{item.title}</p>
                    <p className="mb-0 text-success small">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-danger ms-2"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="d-flex justify-content-between mb-3 pb-3 border-top">
              <strong>Total:</strong>
              <strong className="text-success">
                $
                {cart
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2)}
              </strong>
            </div>
            <button className="btn btn-success w-100 mb-2">Checkout</button>
            <button
              className="btn btn-secondary w-100"
              onClick={() => setCartOpen(false)}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {/* Cart overlay */}
      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}></div>
      )}

      {/* Main Content */}
      <main className="main-content">
        <div className="container-fluid">
          <div className="hero-section">
            <h1>Welcome to FakeStore</h1>
            <p>Discover our amazing collection of premium products</p>
          </div>

          <div className="row mb-4">
            <div className="col-12 col-md-8 mx-auto">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={handleSearch}
              />
            </div>
          </div>

          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading products...</p>
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="container-fluid">
              {filteredProducts.length > 0 ? (
                <>
                  <p className="text-muted mb-4">
                    Showing {filteredProducts.length} product
                    {filteredProducts.length !== 1 ? "s" : ""}
                  </p>
                  <ProductList
                    products={filteredProducts}
                    onAddToCart={handleAddToCart}
                    onViewProduct={handleViewProduct}
                  />
                </>
              ) : (
                <div className="no-products alert alert-info text-center py-5">
                  No products found. Try a different search term.
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail product={selectedProduct} onClose={handleCloseDetail} />
      )}

      {/* Footer */}
      <footer className="text-center py-4 mt-5">
        <div className="container">
          <p className="mb-0 fw-bold">
            Made with ❤️ by
            <a
              className="ms-1 fw-bold"
              href="https://SauRavRwT.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Balbheji
            </a>
          </p>
          <p>
            &copy; {new Date().getFullYear()} FakeStore. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
