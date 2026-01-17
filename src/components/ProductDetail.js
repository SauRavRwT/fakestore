import React from 'react';
import { FaTimes } from 'react-icons/fa';

function ProductDetail({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5 className="modal-title">{product.title}</h5>
          <button
            className="btn-close"
            onClick={onClose}
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-md-4">
              <img
                src={product.image}
                alt={product.title}
                className="img-fluid"
                style={{ maxHeight: '400px', objectFit: 'contain' }}
              />
            </div>
            <div className="col-md-8">
              <div className="mb-3">
                <span className="badge bg-secondary me-2">{product.category}</span>
                <span className="badge bg-warning text-dark">
                  ★ {product.rating?.rate || 'N/A'} ({product.rating?.count || 0} reviews)
                </span>
              </div>

              <h3 className="text-success mb-3">${product.price.toFixed(2)}</h3>

              <div className="mb-4">
                <h6>Description</h6>
                <p>{product.description}</p>
              </div>

              <div className="mb-4">
                <h6>Product Details</h6>
                <ul className="list-unstyled">
                  <li><strong>Category:</strong> {product.category}</li>
                  <li><strong>Rating:</strong> {product.rating?.rate || 'N/A'}/5</li>
                  <li><strong>Reviews:</strong> {product.rating?.count || 0}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
