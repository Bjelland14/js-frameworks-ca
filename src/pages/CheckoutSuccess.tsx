import "../styles/CheckoutSuccess.css";
import { Link } from "react-router-dom";

function CheckoutSuccess() {
  return (
    <main className="checkout-success">
      <h1>Order successful!</h1>
      <p>Thank you for your purchase.</p>
      <p>Your order has been completed successfully.</p>

      <Link className="continue-shopping" to="/">
        Continue shopping
      </Link>
    </main>
  );
}

export default CheckoutSuccess;