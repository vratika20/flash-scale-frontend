import { useEffect, useState } from "react";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setProducts(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (error) return <h2 style={{ textAlign: "center" }}>{error}</h2>;

  return (
    <div className="home-container">
      <h1 className="title">⚡ Flash Sale</h1>

      <div className="product-grid">
        {products.map((p) => (
          <ProductCard
            key={p.product_id}
            product={p}
            refreshProducts={fetchProducts}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
