import "../styles/Cart.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  if (!cartContext) return <p>Cart not available.</p>;

  const { cart, removeFromCart, updateQuantity, clearCart } = cartContext;

  const total = cart.reduce(
    (sum, item) => sum + item.product.discountedPrice * item.quantity,
    0
  );

  function handleCheckout() {
    clearCart();
    navigate("/checkout-success");
  }

  function handleRemove(id: string) {
    removeFromCart(id);
    setMessage("Product removed from cart");
    setTimeout(() => setMessage(""), 2000);
  }

  return (
    <main className="cart-page">
      

      {message && <p className="toast-message">{message}</p>}

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h1>Your cart is empty</h1>
          <p>Add some items to your cart to get started.</p>
          <button onClick={() => navigate("/")}>Go to shop</button>
          </div>
        ) : (
        <>
            <h1>Your cart</h1>
          
          {cart.map((item) => (
            <div className="cart-item" key={item.product.id}>
              <img
                src={item.product.image.url}
                alt={item.product.image.alt}
              />

              <div className="cart-product-info">
                <h2>{item.product.title}</h2>
                <p>{item.product.discountedPrice} NOK / each</p>
              </div>

              <div className="cart-quantity">
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity - 1)
                  }
                  disabled={item.quantity === 1}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              <strong className="cart-item-total">
                {(item.product.discountedPrice * item.quantity).toFixed(2)} NOK
              </strong>

              <button
                className="remove-button"
                onClick={() => handleRemove(item.product.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="cart-summary">
            <div className="cart-total">
              <h2>Total</h2>
              <h2>{total.toFixed(2)} NOK</h2>
            </div>

            <button className="checkout-button" onClick={handleCheckout}>
              Go to checkout
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Cart;