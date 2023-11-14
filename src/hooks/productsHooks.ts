import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";
import { Product } from "../types/Product";

export const useGetProductsQuery = () => useQuery({
    queryKey: ["products"], //save this query in the cache by key "products"
    queryFn: async () => (await apiClient.get<Product[]>(`api/products`)).data, // what api call should happen
});

export const useGetSlugProductQuery = (slug : string) => useQuery({
    queryKey: ["products", slug], //save this query in the cache by key "products:slug"
    queryFn: async () => (await apiClient.get<Product>(`api/products/slug/${slug}`)).data, // what api call should happen
})
 
 