import { useQuery } from "react-query";
import axiosClient from "../axios-client";

/**
 * Custom hook to fetch user data.
 * 
 * This hook uses React Query's `useQuery` to fetch the current user's data
 * from the `/me` endpoint. It handles the loading and error states automatically.
 * 
 * @returns {Object} - An object containing:
 *   - `data`: The user data object.
 *   - `isLoading`: A boolean indicating if the query is currently loading.
 *   - `isError`: A boolean indicating if there was an error during the query.
 *   - `error`: Error object (if any) in case the query fails.
 * 
 * @example
 * const { data: user, isLoading, isError, error } = useUser();
 */

const useUser = () => {
  return useQuery("user", () =>
    axiosClient.get("/me").then(({ data }) => data)
  );
};

export default useUser;
