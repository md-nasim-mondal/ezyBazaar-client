import useGetProducts from "../hooks/useGetProducts";
import ProductCard from "./ProductCard";
import useAuth from "../hooks/useAuth";

const Products = () => {
  const {
    searchText,
    selectedBrand,
    selectedCategory,
    minPrice,
    maxPrice,
    sortBy,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
  } = useAuth();

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
      <div className='flex justify-center items-center font-semibold'>
        <select
          className='border px-2 py-1 text-sm focus:text-ezyBazaar-primary outline-ezyBazaar-primary border-ezyBazaar-primary text-ezyBazaar-primary bg-transparent focus:border-2 mx-auto mb-12'
          value={itemsPerPage}
          onChange={handleItemsPerPage}
          name='products'
          id='products'>
          <option value='2'>Show Products Per Page: 2</option>
          <option value='4'>Show Products Per Page: 4</option>
          <option value='6'>Show Products Per Page: 6</option>
          <option value='12'>Show Products Per Page: 12</option>
        </select>
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
              } gap-6 justify-center items-center px-4`}>
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
        </div>
      )}
    </section>
  );
};

export default Products;
