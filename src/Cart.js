import React from "react";
import { Link } from "react-router-dom"; // For navigation to checkout page

function Cart({ cart, removeFromCart, updateQuantity, totalPrice }) {
  return (
    <div className="cart">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <p>{item.name}</p>
                <p>Price: ${item.price}</p>

                {/* Update quantity only for non-subscription items */}
                {item.category !== "Subscription" && (
                  <div>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>Quantity: {item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                )}

                {/* Display message for subscriptions indicating no update allowed */}
                {item.category === "Subscription" && (
                  <p>Quantity: {item.quantity} (You can only have one subscription)</p>
                )}

                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="total">
            <p>Total: ${totalPrice}</p>
          </div>

          {/* Proceed to Checkout button */}
          <div className="checkout">
            <Link to="/checkout">
              <button>Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
