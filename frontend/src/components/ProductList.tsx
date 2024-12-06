// ProductList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    status: "draft",
    isRecommended: false,
    isBestseller: false,
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/all");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Create new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.patch(
          `http://localhost:3000/products/${editingId}`,
          formData
        );
      } else {
        await axios.post("http://localhost:3000/add", formData);
      }
      fetchProducts();
      setFormData({
        name: "",
        price: "",
        description: "",
        status: "draft",
        isRecommended: false,
        isBestseller: false,
      });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Set up edit mode
  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product._id);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">
        {editingId ? "Edit Product" : "Add New Product"}
      </h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            required
            className="p-2 border rounded"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
            required
            className="p-2 border rounded"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
            className="p-2 border rounded"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="p-2 border rounded"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <div>
            <label className="mr-4">
              <input
                type="checkbox"
                name="isRecommended"
                checked={formData.isRecommended}
                onChange={handleInputChange}
              />
              Recommended
            </label>

            <label>
              <input
                type="checkbox"
                name="isBestseller"
                checked={formData.isBestseller}
                onChange={handleInputChange}
              />
              Bestseller
            </label>
          </div>

          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>

      <div className="grid gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded">
            <h3 className="font-bold">{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
            <p>Status: {product.status}</p>
            <p>
              {product.isRecommended && "⭐ Recommended"}{" "}
              {product.isBestseller && "🏆 Bestseller"}
            </p>
            <div className="mt-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white p-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
