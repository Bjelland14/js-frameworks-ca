import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getProducts() {
      const response = await fetch("https://v2.api.noroff.dev/online-shop");
      const result = await response.json();

      setProducts(result.data);
    }

    getProducts();
  }, []);

  return (
    <main>
      <h1>Products</h1>

      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </main>
  );
}

export default Home;