import { useQuery } from "react-query";
import axiosClient from "../axios-client";

/**
 * Custom hook to fetch the presence data for a specific company.
 * 
 * This hook uses React Query's `useQuery` to fetch the presence data based on the 
 * `selectedCompanyId`. It returns the list of presences for the selected company, 
 * and handles loading and error states.
 * 
 * @param {string | number} selectedCompanyId - The ID of the company whose presence data is to be fetched.
 * 
 * @returns {Object} - An object containing:
 *   - `data`: The list of presences for the selected company (fetched data).
 *   - `isLoading`: A boolean indicating if the query is still loading.
 *   - `isError`: A boolean indicating if there was an error while fetching the data.
 * 
 * @example
 * const { data: presences, isLoading, isError } = usePresences(selectedCompanyId);
 */
const usePresences = (selectedCompanyId) => {
    return useQuery(
      ["presences", selectedCompanyId], // Query key, uniquely identifying the query by company ID
      async () => {
        // If `selectedCompanyId` is provided, make the API request to fetch presences
        if (selectedCompanyId) {
          const response = await axiosClient.get(`/presences?company=${selectedCompanyId}`);
          return response.data.presences; // Return the presences from the API response
        }
        return []; // If no company ID is provided, return an empty array
      },
      {
        enabled: !!selectedCompanyId, // The query is enabled only if `selectedCompanyId` is valid
      }
    );
  };
  
  export default usePresences;
  