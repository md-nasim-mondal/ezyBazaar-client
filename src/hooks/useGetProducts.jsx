import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

/**
 * Custom hook to fetch a list of products with React Query.
 *
 * @param queryKey - A unique query key for the React Query cache.
 * @param queryParams - Optional query parameters to filter or modify the products request.
 * @returns An object containing the products data, loading and error states, and a refetch function.
 */
const useGetProducts = (queryKey = ["products"], queryParams = {}) => {
  const axiosCommon = useAxiosCommon();
  const queryString = new URLSearchParams(queryParams).toString();

  const {
    data = {},
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await axiosCommon.get(`/products?${queryString}`);
      return res.data;
    },
  });

  const { productCount, totalPages, products } = data;
  return {
    productCount,
    totalPages,
    products,
    isProductsLoading,
    isProductsError,
    productsError,
    refetchProducts,
  };
};

export default useGetProducts;
