import React from "react";

/**
 * A reusable dropdown component to select a company.
 * @param {Array} companyDetails - Array of company data.
 * @param {String} selectedCompanyId - The currently selected company ID.
 * @param {Function} handleCompanyChange - Callback function to update selected company.
 */
const CompanySelectDropdown = ({ companyDetails, selectedCompanyId, handleCompanyChange }) => {
  const isSingleCompany = companyDetails?.length === 1;
  return (
    <div className="mb-4">
      <select
        id="company"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white dark:bg-dark rounded-md shadow-sm focus:outline-none sm:text-sm"
        onChange={handleCompanyChange}
        value={selectedCompanyId || ""}
        disabled={isSingleCompany}
      >
        {companyDetails?.map((company) => (
          <option key={company.id} value={company.intern_date.company_id}>
            {company.vacancy.company.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CompanySelectDropdown;
