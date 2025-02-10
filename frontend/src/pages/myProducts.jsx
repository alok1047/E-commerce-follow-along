import { useEffect, useState } from "react";
import Product from "../components/auth/Product";

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");

  const fetchProducts = (email) => {
    if (!email) return;
    setLoading(true);
    setError(null);

    fetch(`http://localhost:3000/api/v2/product/my-products?email=${email}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="w-full min-h-screen bg-neutral-800">
      <h1 className="text-3xl text-center py-4 font-bold text-white">My Products</h1>
      <div className="flex justify-center mt-4">
        <input
          type="text"
          placeholder="Enter email to filter"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded text-black"
        />
        <button
          onClick={() => fetchProducts(email)}
          className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
        >
          Search
        </button>
      </div>

      {loading && <div className="text-center text-white mt-10">Loading products...</div>}
      {error && <div className="text-center text-red-500 mt-10">{error}</div>}
      {!loading && products.length === 0 && !error && (
        <div className="text-center text-gray-400 mt-20">Product not created.</div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-8">
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}