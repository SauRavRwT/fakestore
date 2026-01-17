import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ProductList from "../ProductList/ProductList";
import ProductDetail from "../ProductDetail/ProductDetail";
import "./HomePage.css";

function HomePage({
  products,
  loading,
  error,
  searchTerm,
  onSearchChange,
  onAddToCart,
  onViewProduct,
  selectedProduct,
  onCloseDetail,
}) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (term) => {
    onSearchChange(term);
    if (term.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(term.toLowerCase()) ||
          product.description.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <main className="main-content">
      <div className="container-fluid">
        <div className="hero-section">
          <h1>Welcome to FakeStore</h1>
          <p>Discover our amazing collection of premium products</p>
        </div>

        <div className="row mb-4">
          <div className="col-12 col-md-8 mx-auto">
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearch} />
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
                  onAddToCart={onAddToCart}
                  onViewProduct={onViewProduct}
                />
              </>
            ) : (
              <div className="no-products alert alert-info text-center py-5">
                No products found. Try a different search term.
              </div>
            )}
          </div>
        )}

        {/* Product Detail Modal */}
        {selectedProduct && (
          <ProductDetail product={selectedProduct} onClose={onCloseDetail} />
        )}
      </div>
    </main>
  );
}

export default HomePage;
