import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosCommon from "../hooks/useAxiosCommon";
const FilterInput = () => {
  const {
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

  const axiosCommon = useAxiosCommon();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosCommon("/products/categories");
      return res.data?.categories;
    },
  });

  const { data: brands = [] } = useQuery({
    queryKey: ["brands", selectedBrand],
    queryFn: async () => {
      const res = await axiosCommon("/products/brands");
      return res.data?.brands;
    },
  });
  return (
    <div>
      {/* Filter & Search Options */}
      <div className='w-full flex flex-col gap-8'>
        {/* Filter by Brand */}
        <div className='flex gap-2 w-full items-center relative bg-transparent rounded-lg border border-ezyBazaar-secondary'>
          <select
            id='brand'
            name='brand'
            value={selectedBrand}
            onChange={(e) => {
              setSelectedBrand(e.target.value);
              setCurrentPage(1);
            }}
            className='redesign px-2 rounded-r-lg py-2 bg-transparent w-full border-ezyBazaar-secondary focus:outline-0 dark:bg-gray-600'>
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
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className='redesign px-2 rounded-r-lg py-2 bg-transparent w-full border-ezyBazaar-secondary focus:outline-0 dark:bg-gray-600'>
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
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder='Minimum Price'
            className='px-2 rounded-r-lg py-2 bg-transparent w-full border-ezyBazaar-secondary focus:outline-0'
          />
          <input
            type='number'
            value={maxPrice || ""}
            onChange={(e) => setMaxPrice(e.target.value)}
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
            className='px-2 rounded-r-lg py-2 bg-transparent w-full border-ezyBazaar-secondary focus:outline-0 dark:bg-gray-600'>
            <option value=''>Sort Products</option>
            <option value='date_desc'>Newest First</option>
            <option value='date_asc'>Oldest First</option>
            <option value='price_asc'>Price: Low to High</option>
            <option value='price_desc'>Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterInput;
