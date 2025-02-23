import { useEffect, useState } from "react";
import ActivityNotification from "./ActivityNotification";
import Title from "../Title";
import useCompanyDetails from "../../hooks/useCompanyDetails";
import useActivity from "../../hooks/useActivity";
import { Alert, CompanyDropdown } from "..";
import axiosClient from "../../axios-client";

const Activity = () => {
  const { selectedCompanyId, companyDetails, setSelectedCompanyId } =
    useCompanyDetails();
  const { data: activity } = useActivity(selectedCompanyId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const checkInternshipPeriod = () => {
    const selectedCompany = companyDetails?.find(
      (company) => company.intern_date.company_id === selectedCompanyId
    );
    const endDate = selectedCompany?.intern_date?.end_date;
    if (endDate) {
      const currentDate = new Date().toISOString().split("T")[0];
      return currentDate > endDate;
    }
    return false;
  };

  const handleExportCertificate = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const response = await axiosClient.post(
        `/export-certificate/${selectedCompanyId}`,
        {},
        { responseType: "blob" }
      );

      if (response?.data) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        // random 5 digit number
        const random = Math.floor(Math.random() * 100000)
          .toString()
          .padStart(5, "0");
        link.href = url;
        link.download = `certificate-${random}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setMessage("Sertifikat berhasil diunduh!");
        setTimeout(() => setIsModalOpen(false), 1000);
      }
    } catch (error) {
      const res = error.response;
      if (res.status === 400) {
        setError("Skor belum ada! Silahkan hubungi mentor terlebih dahulu.");
      } else {
        setError("Gagal mengunduh sertifikat. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (message || error) {
      const timeoutId = setTimeout(() => {
        if (message) {
          setMessage(null);
        } else if (error) {
          setError(null);
        }
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [message, error]);

  return (
    <div className="flex flex-col justify-center items-center md:my-15 my-20">
      <Title title="aktivitas hari ini" />
      {activity?.presence && activity.presence.check_in == null ? (
        <ActivityNotification
          title="absen masuk"
          date={activity.presence.date}
          to="/"
        />
      ) : null}

      {activity?.journal ? (
        <ActivityNotification
          title="laporan harian"
          date={activity.journal.date}
          to="/report"
        />
      ) : null}
      {!checkInternshipPeriod() &&
        !activity?.journal &&
        !activity?.presence && (
          <div className="w-full h-40 flex justify-center items-center">
            <h1 className="text-center font-medium transition duration-300 text-xl text-dark dark:text-lightOne capitalize">
              belum ada aktivitas terbaru
            </h1>
          </div>
        )}

      {checkInternshipPeriod() && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Unduh Sertifikat
        </button>
      )}

      {isModalOpen && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <CompanyDropdown
              companyDetails={companyDetails}
              selectedCompanyId={selectedCompanyId}
              handleCompanyChange={(e) => setSelectedCompanyId(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleExportCertificate}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
      {message && <Alert text={message} />}
      {error && <Alert text={error} error />}
    </div>
  );
};

export default Activity;
