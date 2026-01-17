import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import About from "./components/About/About";
import CartSidebar from "./components/CartModal/CartModal";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router basename="/fakestore/">
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initialization
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
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
  };

  // Handle remove from cart
  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Handle clear cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Handle view product
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  // Handle close detail
  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  // Handle toggle cart
  const handleToggleCart = (isOpen) => {
    setCartOpen(isOpen);
  };

  return (
    <div className="App">
      <CartSidebar
        cart={cart}
        cartOpen={cartOpen}
        onToggleCart={handleToggleCart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              products={products}
              loading={loading}
              error={error}
              searchTerm={searchTerm}
              onSearchChange={handleSearch}
              onAddToCart={handleAddToCart}
              onViewProduct={handleViewProduct}
              selectedProduct={selectedProduct}
              onCloseDetail={handleCloseDetail}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
