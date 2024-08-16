import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosCommon from "../hooks/useAxiosCommon";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import toast from "react-hot-toast";
import { useRef } from "react";

const FilterInput = () => {
  const {
    searchText,
    setSearchText,
    selectedBrand,
    setSelectedBrand,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sortBy,
    setSortBy,
    setCurrentPage,
  } = useAuth();

  const inputRef = useRef(null);
  const axiosCommon = useAxiosCommon();

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

  return (
    <div>
      {/* Filter & Search Options */}
      <div className='w-full flex flex-col gap-8'>
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
    </div>
  );
};

export default FilterInput;
