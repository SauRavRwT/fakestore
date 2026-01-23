import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import "./CartModal.css";
import generateBill from "../Bill/Bill";

function CartModal({
  cart,
  cartOpen,
  onToggleCart,
  onRemoveFromCart,
  onClearCart,
}) {
  const [cartItems, setCartItems] = useState(cart);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  useEffect(() => {
    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(updatedCart);
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const incItem = (itemId) => {
    const itemIndex = cartItems.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[itemIndex].quantity += 1;
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const decItem = (itemId) => {
    const itemIndex = cartItems.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1 && cartItems[itemIndex].quantity > 1) {
      const updatedCart = [...cartItems];
      updatedCart[itemIndex].quantity -= 1;
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };
  // Handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Generate PDF bill
    generateBill(cartItems, cartPrice);

    // Show success message
    // alert("Thank you for your purchase! Your bill has been downloaded.");

    // Clear cart from state and localStorage
    localStorage.removeItem("cart");
    setCartItems([]);
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
          <div
            className="cart-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
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
              {cartItems.length === 0 ? (
                <p className="text-muted text-center py-5">
                  Your cart is empty
                </p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="img-fluid cart-item-image"
                        />
                        <p className="mb-1 small cart-item-title">
                          {item.title}
                        </p>
                        <p className="mb-0 text-success small">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => decItem(item.id)}
                        >
                          <FaMinus />
                        </button>
                        <span
                          className="quantity-display"
                          style={{ minWidth: "20px", textAlign: "center" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => incItem(item.id)}
                        >
                          <FaPlus />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger ms-auto"
                          onClick={() => onRemoveFromCart(item.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="d-flex justify-content-between mb-3 pb-3 border-top">
                  <strong>Total:</strong>
                  <strong className="text-success">
                    ${cartPrice.toFixed(2)}
                  </strong>
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

export default CartModal;
