import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";
import { Product } from "../types/Product";

const useGetProductsQuery= () => useQuery({
    queryKey: ["products"], //save this query in the cache by key "products"
    queryFn: async () => (await apiClient.get<Product[]>(`api/products`)).data, // what api call should happen
});

export default useGetProductsQuery;