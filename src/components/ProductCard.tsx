import type { Product } from "../types/Product";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.discountedPrice < product.price;

  const discountPercentage = Math.round(
    ((product.price - product.discountedPrice) / product.price) * 100
  );

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        {hasDiscount && <span>{discountPercentage}% OFF</span>}

        <img src={product.image.url} alt={product.image.alt} />

        <h2>{product.title}</h2>

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
      </Link>
    </div>
  );
}

export default ProductCard;