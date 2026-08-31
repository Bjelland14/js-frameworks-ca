import "../styles/Home.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getProducts() {
      const response = await fetch("https://v2.api.noroff.dev/online-shop");
      const result = await response.json();

      setProducts(result.data);
    }

    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <h1>Products</h1>

      <input
        className="search-input"
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {search && (
        <div>
          {filteredProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              {product.title}
            </Link>
          ))}
        </div>
      )}

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

export default Home;