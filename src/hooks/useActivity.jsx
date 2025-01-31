import { useQuery } from "react-query";
import axiosClient from "../axios-client";

/**
 * Custom hook to fetch activities based on the selected company ID.
 * 
 * This hook utilizes React Query's `useQuery` to fetch today's activities
 * for the provided `companyId`. It only triggers the request when a valid
 * `companyId` is provided.
 * 
 * @param {string} companyId - The ID of the selected company for fetching activities.
 * 
 * @returns {object} - An object containing:
 *   - `data`: The fetched activity data.
 *   - `isLoading`: A boolean indicating if the query is currently loading.
 *   - `isError`: A boolean indicating if there was an error during the query.
 *   - `error`: Error object (if any) in case the query fails.
 * 
 * @example
 * const { data, isLoading, isError, error } = useActivity(companyId);
 */

const useActivity = (companyId) => {
  return useQuery(
    ["activity", companyId],
    async () => {
      const response = await axiosClient.get(`/today-activities?company=${companyId}`);
      return response.data;
    },
    {
      enabled: !!companyId,
    }
  );
};

export default useActivity;
