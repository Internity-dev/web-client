import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axiosClient from "../axios-client";

/**
 * Custom hook to fetch company details and manage the selected company state.
 * 
 * This hook uses React Query's `useQuery` to fetch the list of accepted appliances
 * and then determines the appropriate company to select based on the unfinished status.
 * It tracks the selected company ID and provides functionality to update it.
 * 
 * @returns {Object} - An object containing:
 *   - `companyDetails`: The list of company details (fetched data).
 *   - `selectedCompanyId`: The ID of the currently selected company.
 *   - `setSelectedCompanyId`: A function to update the selected company ID.
 *   - `isLoading`: A boolean indicating if the query is still loading.
 * 
 * @example
 * const { companyDetails, selectedCompanyId, setSelectedCompanyId, isLoading } = useCompanyDetails();
 */

const useCompanyDetails = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const { data: companyDetails, isLoading } = useQuery("companyDetails", async () => {
    const response = await axiosClient.get("/appliances/accepted");
    return response.data.appliances;
  });

  useEffect(() => {
    if (companyDetails?.length) {
      const unfinishedCompany = companyDetails.find(
        (company) => company.intern_date.finished === 0
      );
      if (unfinishedCompany) {
        setSelectedCompanyId(unfinishedCompany.intern_date.company_id);
      } else {
        setSelectedCompanyId(companyDetails[0].intern_date.company_id);
      }
    }
  }, [companyDetails]);

  return { companyDetails, selectedCompanyId, setSelectedCompanyId, isLoading };
};

export default useCompanyDetails;