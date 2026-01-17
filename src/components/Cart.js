import React from 'react';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';

function Cart({ items, onRemoveItem, onClose, cartOpen = true }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-sidebar" style={{ width: cartOpen ? '350px' : '0' }}>
      <div className="cart-header">
        <h5>
          <FaShoppingCart /> Shopping Cart ({items.length})
        </h5>
        <button className="btn btn-sm btn-close" onClick={onClose}></button>
      </div>
      <div className="cart-items">
        {items.length === 0 ? (
          <p className="text-muted text-center py-5">Your cart is empty</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <p className="mb-1 small">{item.title}</p>
                  <p className="mb-0 text-success">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {items.length > 0 && (
        <div className="cart-footer">
          <div className="d-flex justify-content-between mb-3">
            <strong>Total:</strong>
            <strong className="text-success">${total.toFixed(2)}</strong>
          </div>
          <button className="btn btn-success w-100 mb-2">Checkout</button>
          <button className="btn btn-secondary w-100" onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
