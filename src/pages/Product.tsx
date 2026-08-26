import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import type { Product as ProductType } from "../types/Product";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const cartContext = useContext(CartContext);

  useEffect(() => {
    async function getProduct() {
      const response = await fetch(
        `https://v2.api.noroff.dev/online-shop/${id}`
      );

      const result = await response.json();
      setProduct(result.data);
    }

    getProduct();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const hasDiscount = product.discountedPrice < product.price;

  function handleAddToCart() {
    if (cartContext && product) {
      cartContext.addToCart(product);
    }
  }

  return (
    <main>
      <img src={product.image.url} alt={product.image.alt} />

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
    </main>
  );
}

export default Product;