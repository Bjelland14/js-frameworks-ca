import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Header() {
  const cartContext = useContext(CartContext);

  const cartCount = cartContext
    ? cartContext.cart.reduce((total, item) => total + item.quantity, 0)
    : 0;

  return (
    <header>
      <nav>
        <Link className="logo" to="/">
          Shop
        </Link>

        <div className="nav-links">
          <Link to="/">Shop</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/cart">Cart ({cartCount})</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;