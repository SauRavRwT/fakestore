import React from 'react';
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import "./ProductCard.css";

function ProductCard({ product, onAddToCart, onViewProduct }) {
  return (
    <div className="product-card h-100">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate">{product.title}</h5>
        <p className="card-text text-muted small flex-grow-1">
          {product.category}
        </p>
        <div className="product-rating mb-2">
          <span className="badge bg-warning text-dark">
            ★ {product.rating?.rate || 'N/A'} ({product.rating?.count || 0})
          </span>
        </div>
        <div className="product-price mb-3">
          <h6 className="text-success">${product.price.toFixed(2)}</h6>
        </div>
        <div className="d-grid gap-2 d-sm-flex">
          <button
            className="btn btn-primary btn-sm flex-grow-1"
            onClick={() => onAddToCart(product)}
          >
            <FaShoppingCart className="me-1" />
            Add to Cart
          </button>
          <button
            className="btn btn-outline-primary btn-sm flex-grow-1"
            onClick={() => onViewProduct(product)}
          >
            <FaEye className="me-1" />
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
