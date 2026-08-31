import "../styles/Cart.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  if (!cartContext) {
    return <p>Cart not available.</p>;
  }

  const { cart, removeFromCart, updateQuantity, clearCart } = cartContext;

  const total = cart.reduce((sum, item) => {
    return sum + item.product.discountedPrice * item.quantity;
  }, 0);

  function handleCheckout() {
    clearCart();
    navigate("/checkout-success");
  }

  return (
    <main>
      <h1>Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.product.id}>
              <img
                src={item.product.image.url}
                alt={item.product.image.alt}
              />
              <h2>{item.product.title}</h2>

              <p>{item.product.discountedPrice} NOK</p>

              <label>
                Quantity:
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(event) =>
                    updateQuantity(
                      item.product.id,
                      Number(event.target.value)
                    )
                  }
                />
              </label>

              <button onClick={() => removeFromCart(item.product.id)}>
                Remove
              </button>
            </div>
          ))}

          <div className="cart-summary">
            <h2>Total: {total.toFixed(2)} NOK</h2>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </>
      )}
    </main>
  );
}

export default Cart;