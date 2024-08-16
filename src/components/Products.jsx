import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async ({ queryKey }) => {
  const [_key, { page, search, category, brand, priceSort, dateSort }] =
    queryKey;
  const { data } = await axios.get("http://localhost:5000/products", {
    params: { page, search, category, brand, priceSort, dateSort },
  });
  return data;
};

const Products = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [dateSort, setDateSort] = useState("");

  const { data, error, isLoading } = useQuery({
    queryKey: [
      "products",
      { page, search, category, brand, priceSort, dateSort },
    ],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div>
      <h1>Products</h1>
      {/* Search, Sort, and Filters */}
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search products'
      />
      {/* Add sorting, category, brand, and pagination UI controls here */}
      <div className='flex flex-wrap gap-8'>
        {data?.map((product) => (
          <div key={product?._id}>
            <h2>{product?.name}</h2>
            <img src={product?.image} alt={product?.name} width='150' />
            <p>{product?.description}</p>
            <p>Price: ${product?.price}</p>
            <p>Category: {product?.category}</p>
            <p>Brand: {product?.brandName}</p>
            <p>Rating: {product?.ratings}</p>
            <p>Added on: {new Date(product?.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      {/* Pagination controls */}
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default Products;
