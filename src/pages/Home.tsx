import "../styles/Home.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

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

  const sortedProducts = [...filteredProducts];

  if (sort === "price-low") {
    sortedProducts.sort((a, b) => a.discountedPrice - b.discountedPrice);
  }

  if (sort === "price-high") {
    sortedProducts.sort((a, b) => b.discountedPrice - a.discountedPrice);
  }

  if (sort === "rating") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }

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

     <select
        className="sort-select"
        value={sort}
        onChange={(event) => setSort(event.target.value)}
      >
        <option value="">Sort by</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Rating</option>
      </select>

      {search && (
        <div className="search-results">
          {filteredProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              {product.title}
            </Link>
          ))}
        </div>
      )}

      <div className="product-grid">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

export default Home;