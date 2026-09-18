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

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  const hasDiscount = product.discountedPrice < product.price;

  const discountPercentage = Math.round(
    ((product.price - product.discountedPrice) / product.price) * 100
  );

  function handleAddToCart() {
    if (cartContext && product) {
      cartContext.addToCart(product);
      setMessage("Product added to cart");
      setTimeout(() => setMessage(""), 2000);
    }
  }

  return (
    <main className="product-page">
      <div className="product-image-container">
        {hasDiscount && (
          <span className="product-discount">-{discountPercentage}%</span>
        )}

        <img
          className="product-page-image"
          src={product.image.url}
          alt={product.image.alt}
        />
      </div>

      <div className="product-page-info">
        <h1>{product.title}</h1>

        <p className="product-page-rating">★ {product.rating}</p>

        <div className="product-page-price">
          <strong>{product.discountedPrice} NOK</strong>

          {hasDiscount && <s>{product.price} NOK</s>}
        </div>

        <p className="product-description">{product.description}</p>

        {product.tags.length > 0 && (
          <div className="product-tags">
            {product.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}

        <button onClick={handleAddToCart}>Add to Cart</button>

        {message && <p className="toast-message">{message}</p>}

        {product.reviews.length > 0 && (
          <div className="reviews">
            <h2>Reviews</h2>

            {product.reviews.map((review) => (
              <div key={review.id}>
                <h3>{review.username}</h3>
                <p>★ {review.rating}</p>
                <p>{review.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Product;