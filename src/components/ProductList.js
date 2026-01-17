import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, onAddToCart, onViewProduct }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <h5 className="text-muted">No products found</h5>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {products.map((product) => (
        <div key={product.id} className="col-12 col-sm-6 col-lg-3">
          <ProductCard
            product={product}
            onAddToCart={onAddToCart}
            onViewProduct={onViewProduct}
          />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
