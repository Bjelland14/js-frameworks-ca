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
        <div className="product-image-wrapper">
          {hasDiscount && (
            <span className="discount-badge">-{discountPercentage}%</span>
          )}

          <img src={product.image.url} alt={product.image.alt} />
        </div>

        <div className="product-card-content">
          <h2>{product.title}</h2>

          <p className="product-rating">
            ★ {product.rating}
          </p>

          <div className="product-price">
            <span className="current-price">
              {product.discountedPrice} NOK
            </span>

            {hasDiscount && (
              <span className="original-price">
                {product.price} NOK
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;