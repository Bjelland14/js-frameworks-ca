import type { ProductResponse } from "../types/ApiResponse";
import "../styles/Product.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import type { Product as ProductType } from "../types/Product";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const cartContext = useContext(CartContext);

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/online-shop/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const result: ProductResponse = await response.json();
        setProduct(result.data);
      } catch {
        setError("Could not load product.");
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, [id]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const hasDiscount = product.discountedPrice < product.price;

  function handleAddToCart() {
    if (cartContext && product) {
      cartContext.addToCart(product);
      setMessage("Product added to cart");

      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  }

  return (
    <main className="product-page">
      <img
        className="product-page-image"
        src={product.image.url}
        alt={product.image.alt}
      />

      <div className="product-page-info">
        <h1>{product.title}</h1>

        <p>{product.description}</p>

        {hasDiscount ? (
          <>
            <p>
              <s>{product.price} NOK</s>
            </p>
            <p>{product.discountedPrice} NOK</p>
          </>
        ) : (
          <p>{product.price} NOK</p>
        )}

        <p>Rating: {product.rating}</p>

        {product.tags.length > 0 && (
          <div>
            <h2>Tags</h2>

            {product.tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
        )}

        {product.reviews.length > 0 && (
          <div>
            <h2>Reviews</h2>

            {product.reviews.map((review) => (
              <div key={review.id}>
                <h3>{review.username}</h3>
                <p>Rating: {review.rating}</p>
                <p>{review.description}</p>
              </div>
            ))}
          </div>
        )}

        <button onClick={handleAddToCart}>Add to Cart</button>

        {message && <p className="toast-message">{message}</p>}
      </div>
    </main>
  );
}

export default Product;