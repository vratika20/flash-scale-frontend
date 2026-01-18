import { useEffect, useState } from "react";
import api from "../api/api";
import "./Admin.css";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ➕ Add Product
  const addProduct = async (e) => {
    e.preventDefault();

    await api.post("/admin/product", {
      name,
      stock: Number(stock),
      image,
    });

    setName("");
    setStock("");
    setImage("");
    fetchProducts();
  };

  // ✏️ Update Stock
  const updateStock = async (id, newStock) => {
    await api.put(`/admin/product/${id}/stock`, {
      stock: Number(newStock),
    });

    fetchProducts();
  };

  return (
    <div className="admin-container">
      <h1>🛠 Admin Dashboard</h1>

      {/* ADD PRODUCT */}
      <form className="add-form" onSubmit={addProduct}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <input
          placeholder="Image (iphone.jpg)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button>Add Product</button>
      </form>

      {/* PRODUCT LIST */}
      <h2>📦 Products</h2>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.product_id}>
              <td>
                <img src={`/images/${p.image}`} width="60" />
              </td>
              <td>{p.name}</td>
              <td>
                <input
                  type="number"
                  defaultValue={p.stock}
                  onBlur={(e) => updateStock(p.product_id, e.target.value)}
                />
              </td>
              <td>✔</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
