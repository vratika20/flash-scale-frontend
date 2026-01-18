import { useState } from "react";
import api from "../api/api";
import "./ProductCard.css";

const ProductCard = ({ product, refreshProducts }) => {
  const [loading, setLoading] = useState(false);

  // 🔥 Sold / Total calculations
  const sold = product.total_stock - product.stock;
  const soldPercent = (sold / product.total_stock) * 100;

  const handleBuy = async () => {
    if (product.stock === 0 || loading) return;

    try {
      setLoading(true);

      const res = await api.post("/order", {
        userId: 1, // demo user
        productId: product.product_id,
      });

      alert(res.data.message);

      // Refresh product stock after order
      await refreshProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-card">
      {/* ✅ Product Image */}
      <img
        src={`/images/${product.image}`}
        alt={product.name}
        className="product-image"
      />

      {/* ✅ Product Name */}
      <h3>{product.name}</h3>

      {/* ✅ Stock Info */}
      <p className="stock-text">
        Stock: <b>{product.stock}</b>
        {product.stock <= 3 && product.stock > 0 && " 🔥"}
        {product.stock === 0 && " ❌ Sold Out"}
      </p>

      {/* ✅ Sold / Total Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${soldPercent}%` }} />
      </div>

      <p className="sold-text">
        {sold} / {product.total_stock} sold
      </p>

      {/* ✅ Buy Button */}
      <button
        className={`buy-btn ${product.stock === 0 ? "disabled" : ""}`}
        onClick={handleBuy}
        disabled={product.stock === 0 || loading}
      >
        {loading
          ? "Processing..."
          : product.stock === 0
          ? "Sold Out"
          : "Buy Now"}
      </button>
    </div>
  );
};

export default ProductCard;
