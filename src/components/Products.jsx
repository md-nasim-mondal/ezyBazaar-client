import { useRef, useState } from "react";
import useGetProducts from "../hooks/useGetProducts";
import ProductCard from "./ProductCard";
import toast from "react-hot-toast";
import useAxiosCommon from "../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";

const Products = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const inputRef = useRef(null);

  const axiosCommon = useAxiosCommon();

  // Get products data using hook
  const { productCount, totalPages, products, isProductsLoading } =
    useGetProducts(
      [
        "products",
        currentPage,
        itemsPerPage,
        searchText,
        selectedBrand,
        selectedCategory,
        minPrice,
        maxPrice,
        sortBy,
      ],
      {
        page: currentPage,
        size: itemsPerPage,
        search: searchText,
        brand: selectedBrand,
        category: selectedCategory,
        minPrice,
        maxPrice,
        sort: sortBy,
      }
    );

  const pages = [...Array(totalPages).keys()];

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosCommon("/products/categories");
      return res.data?.categories;
    },
  });

  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await axiosCommon("/products/brands");
      return res.data?.brands;
    },
  });

  const handleSearchProduct = (e) => {
    e.preventDefault();
    if (searchText.trim() === "") {
      return toast.error("Cannot Perform Empty Search!");
    }
    setSearchText(searchText.trim());
    setCurrentPage(1);
  };

  // Clear Search Text after a search
  const clearSearchText = () => {
    setSearchText("");
    if (inputRef.current) inputRef.current.value = "";
    setCurrentPage(1);
  };

  const handleItemsPerPage = (e) => {
    const pageValue = parseInt(e.target.value);
    setItemsPerPage(pageValue);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section>
      {/* Filter & Search Options */}
      <div className='w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mx-auto gap-4 mb-8 text-sm'>
        {/* Filter by Brand */}
        <div className='flex gap-2 w-full items-center relative bg-transparent rounded-lg border border-ezyBazaar-secondary'>
          <select
            id='brand'
            name='brand'
            value={selectedBrand || ""}
            onChange={(e) => {
              setSelectedBrand(e.target.value);
              setCurrentPage(1);
            }}
            className='redesign px-2 rounded-r-lg py-2 bg-transparent w-full border-ezyBazaar-secondary focus:outline-0'>
            <option value=''>All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Category */}
        <div className='flex gap-2 w-full items-center relative bg-transparent rounded-lg border border-ezyBazaar-secondary'>
          <select
            id='category'
            name='category'
            value={selectedCategory || ""}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className='redesign px-2 rounded-r-lg py-2 bg-transparent w-full border-ezyBazaar-secondary focus:outline-0'>
            <option value=''>All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className='flex gap-2 w-full items-center relative bg-transparent rounded-lg border border-ezyBazaar-secondary'>
          <input
            type='number'
            value={minPrice || ""}
            onChange={(e) => setMinPrice(Number(e.target.value) || "")}
            placeholder='Minimum Price'
            className='px-2 rounded-r-lg py-2 bg-transparent w-full border-ezyBazaar-secondary focus:outline-0'
          />
          <input
            type='number'
            value={maxPrice || ""}
            onChange={(e) => setMaxPrice(Number(e.target.value) || "")}
            placeholder='Maximum Price'
            className='px-2 rounded-r-lg py-2 bg-transparent w-full border-l border-ezyBazaar-secondary focus:outline-0'
          />
        </div>

        {/* Sort Products */}
        <div className='flex gap-2 w-full items-center relative bg-transparent rounded-lg border border-ezyBazaar-secondary'>
          <select
            id='sort'
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            className='px-2 rounded-r-lg py-2 bg-transparent w-full border-ezyBazaar-secondary focus:outline-0'>
            <option value=''>Sort Products</option>
            <option value='date_desc'>Newest First</option>
            <option value='date_asc'>Oldest First</option>
            <option value='price_asc'>Price: Low to High</option>
            <option value='price_desc'>Price: High to Low</option>
          </select>
        </div>

        {/* Search Products */}
        <form
          onSubmit={handleSearchProduct}
          className='sm:col-span-2 lg:col-span-2 xl:col-span-1 flex gap-2 items-center justify-start text-ezyBazaar-secondary'>
          <div className='flex gap-2 w-full items-center relative pl-2 pr-6 bg-transparent rounded-lg border border-ezyBazaar-secondary'>
            <label className='font-medium' htmlFor='search'>
              <FaSearch />
            </label>
            <input
              ref={inputRef}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className='px-2 rounded-r-lg py-2 bg-transparent w-full border-l border-ezyBazaar-secondary focus:outline-0'
              placeholder='Search Products'
              type='text'
              name='search'
              id='search'
            />
            <div className='absolute right-0 flex gap-2'>
              {searchText !== "" && (
                <button
                  title='Clear Search Field'
                  onClick={clearSearchText}
                  className='text-2xl hover:text-ezyBazaar-primary transition-all duration-500 z-10'
                  type='button'>
                  <MdClear />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Show Product Cards */}
      <div className=''>
        {isProductsLoading ? (
          "Loading..."
        ) : products?.length === 0 ? (
          "No products found."
        ) : (
          <>
            {(searchText.trim() ||
              minPrice ||
              maxPrice ||
              selectedBrand ||
              selectedCategory) &&
              productCount > 0 && (
                <div className='flex items-center justify-center'>
                  {`${productCount} ${
                    productCount > 1 ? "Matches" : "Match"
                  } Found!`}
                </div>
              )}
            <div
              className={`grid md:grid-cols-2 ${
                itemsPerPage >= 3 && "lg:grid-cols-3"
              } gap-6 justify-center items-center`}>
              {products?.map((product) => (
                <ProductCard key={product?._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
      {totalPages > 0 && (
  <div className='flex flex-col gap-4 justify-center items-center font-semibold mt-8 lg:mt-16'>
    <p className='text-ezyBazaar-primary'>
      Page: {currentPage} of {totalPages}
    </p>
    <div className='flex flex-wrap gap-2 justify-center'>
      <button
        className='px-3 py-1 text-sm border disabled:text-gray-500 disabled:border-gray-500 disabled:hover:text-gray-500 disabled:hover:bg-transparent text-ezyBazaar-primary border-ezyBazaar-primary hover:bg-ezyBazaar-primary hover:text-white'
        disabled={currentPage === 1}
        onClick={handlePreviousPage}>
        Previous
      </button>

      {pages.map((page) => (
        <button
          className={`px-3 py-1 text-sm border ${
            currentPage === page + 1
              ? "bg-ezyBazaar-primary border-ezyBazaar-primary text-white hover:bg-transparent hover:text-ezyBazaar-primary"
              : "text-ezyBazaar-primary border-ezyBazaar-primary hover:bg-ezyBazaar-primary hover:text-white"
          }`}
          onClick={() => setCurrentPage(page + 1)}
          key={page}>
          {page + 1}
        </button>
      ))}

      <button
        className='px-3 py-1 text-sm border disabled:text-gray-500 disabled:border-gray-500 disabled:hover:text-gray-500 disabled:hover:bg-transparent text-ezyBazaar-primary border-ezyBazaar-primary hover:bg-ezyBazaar-primary hover:text-white'
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={handleNextPage}>
        Next
      </button>
    </div>
    <select
      className='border px-2 py-1 text-sm focus:text-ezyBazaar-primary outline-ezyBazaar-primary border-ezyBazaar-primary text-ezyBazaar-primary bg-transparent focus:border-2 mx-auto mb-12'
      value={itemsPerPage}
      onChange={handleItemsPerPage}
      name='products'
      id='products'>
      <option value='3'>Show Products Per Page: 3</option>
      <option value='6'>Show Products Per Page: 6</option>
      <option value='9'>Show Products Per Page: 9</option>
      <option value='12'>Show Products Per Page: 12</option>
    </select>
  </div>
)}

    </section>
  );
};

export default Products;
