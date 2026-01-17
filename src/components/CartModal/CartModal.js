import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./CartModal.css";

function CartSidebar({
  cart,
  cartOpen,
  onToggleCart,
  onRemoveFromCart,
  onClearCart,
}) {
  const cartTotal = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Handle checkout
  const handleCheckout = () => {
    alert("Thank you for your purchase!");
    // Clear cart from state and localStorage
    localStorage.removeItem("cart");
    onClearCart();
    onToggleCart(false);
  };

  return (
    <>
      {/* Floating Cart Button */}
      <button
        className="floating-cart-btn"
        onClick={() => onToggleCart(!cartOpen)}
        title="Shopping Cart"
      >
        <FaShoppingCart size={24} />
        {cartTotal > 0 && <span className="cart-badge">{cartTotal}</span>}
      </button>

      {/* Cart Modal */}
      {cartOpen && (
        <div className="cart-modal-overlay" onClick={() => onToggleCart(false)}>
          <div className="cart-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h5 className="mb-0">
                <FaShoppingCart className="me-2" />
                Shopping Cart ({cartTotal})
              </h5>
              <button
                className="btn btn-sm btn-close"
                onClick={() => onToggleCart(false)}
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
                        <img
                          src={item.image}
                          alt={item.title}
                          className="img-fluid cart-item-image"
                        />
                        <p className="mb-1 small cart-item-title">{item.title}</p>
                        <p className="mb-0 text-success small">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-danger ms-2"
                        onClick={() => onRemoveFromCart(item.id)}
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
                  <strong className="text-success">${cartPrice.toFixed(2)}</strong>
                </div>
                <button
                  className="btn btn-success w-100 mb-2"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
                <button
                  className="btn btn-secondary w-100"
                  onClick={() => onToggleCart(false)}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CartSidebar;
