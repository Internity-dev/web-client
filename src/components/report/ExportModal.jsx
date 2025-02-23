import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Alert, ButtonLoading, InputText } from "../../components";
import { Icon } from "@iconify/react";
import axiosClient from "../../axios-client";

const ExportModal = ({ companyDetails, selectedCompanyId }) => {
  const [director, setDirector] = useState([]);
  const [hrd, setHrd] = useState([]);
  const [schoolMentor, setSchoolMentor] = useState([]);
  const [companyMentor, setCompanyMentor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCompanyPage, setCurrentCompanyPage] = useState(0);
  const [isParentSameAsStudent, setIsParentSameAsStudent] = useState(false);

  const [studentData, setStudentData] = useState({
    nisn: "",
    bloodType: "",
  });

  const [parentData, setParentData] = useState({
    parent_name: "",
    address: "",
  });

  const handleExportJournal = async () => {
    try {
      setLoading(true);
      let url =
        companyDetails.length > 1
          ? "/export-journals"
          : `/export-journal/${selectedCompanyId}`;

      const response = await axiosClient.post(
        url,
        {
          nisn: studentData.nisn,
          blood_type: studentData.bloodType,
          parent_name: parentData.parent_name,
          parent_address: isParentSameAsStudent ? "" : parentData.address,
          directors: director,
          hrds: hrd,
          school_mentors: schoolMentor,
          company_mentors: companyMentor,
        },
        { responseType: "blob" }
      );

      if (response?.data) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        const currentDate = new Date().toISOString().split("T")[0];
        link.href = url;
        link.download = `journal-${currentDate}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setMessage("Report berhasil diunduh!");
        setTimeout(() => document.getElementById("exportModal").close(), 1000);
      }
    } catch (error) {
      setError("Gagal mengekspor jurnal. Silakan coba lagi.");
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

  const renderSection = () => {
    const disableButton = loading;
    if (currentPage === 1) {
      return (
        <>
          <h3 className="font-semibold text-md border-b pb-4">Data Diri</h3>
          <InputText
            name="nisn"
            label="NISN"
            placeholder="Masukkan NISN"
            type="text"
            value={studentData.nisn}
            onChange={(e) =>
              setStudentData({ ...studentData, nisn: e.target.value })
            }
          />
          <InputText
            name="bloodType"
            label="Golongan Darah"
            placeholder="Masukkan Golongan Darah"
            type="text"
            value={studentData.bloodType}
            onChange={(e) =>
              setStudentData({ ...studentData, bloodType: e.target.value })
            }
          />
          <div className="flex justify-end">
            <button
              className="bg-main text-lightOne p-2 rounded-md"
              onClick={() => setCurrentPage(2)}
            >
              Next
            </button>
          </div>
        </>
      );
    } else if (currentPage === 2) {
      return (
        <>
          <InputText
            name="parentName"
            label="Nama Orang Tua/Wali"
            placeholder="Masukkan Nama Orang Tua/Wali"
            type="text"
            value={parentData.parent_name}
            onChange={(e) =>
              setParentData({ ...parentData, parent_name: e.target.value })
            }
          />
          <div className="my-4">
            <label className="label cursor-pointer">
              <span className="label-text ml-2 text-dark dark:text-lightOne">
                Alamat Orang Tua/Wali sama dengan Siswa
              </span>
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-accent"
                checked={isParentSameAsStudent}
                onChange={() =>
                  setIsParentSameAsStudent(!isParentSameAsStudent)
                }
              />
            </label>
          </div>
          {!isParentSameAsStudent && (
            <InputText
              name="parent_address"
              label="Alamat Orang Tua/Wali"
              placeholder="Masukkan Alamat Orang Tua/Wali"
              type="text"
              value={parentData.address}
              onChange={(e) =>
                setParentData({ ...parentData, address: e.target.value })
              }
            />
          )}
          <div className="flex justify-between">
            <button
              className="bg-main text-lightOne p-2 rounded-md"
              onClick={() => setCurrentPage(1)}
            >
              Previous
            </button>
            <button
              className="bg-main text-lightOne p-2 rounded-md"
              onClick={() => setCurrentPage(3)}
            >
              Next
            </button>
          </div>
        </>
      );
    } else {
      const currentCompany = companyDetails[currentCompanyPage];
      return (
        <>
          <h3 className="font-semibold text-md border-b pb-4 mb-2">
            Data Perusahaan
          </h3>
          <div className="mb-4">
            <h4 className="font-semibold">
              {currentCompany.vacancy.company.name}
            </h4>
            <InputText
              name={`director-${currentCompanyPage}`}
              label={`Nama Direktur`}
              placeholder={`Nama Direktur`}
              type="text"
              value={director[currentCompanyPage]?.name || ""}
              onChange={(e) => {
                const updatedDirectors = [...director];
                updatedDirectors[currentCompanyPage] = { name: e.target.value };
                setDirector(updatedDirectors);
              }}
            />
            <InputText
              name={`hrd-${currentCompanyPage}`}
              label={`Nama Hrd`}
              placeholder={`Nama Hrd`}
              type="text"
              value={hrd[currentCompanyPage]?.name || ""}
              onChange={(e) => {
                const updateHrds = [...hrd];
                updateHrds[currentCompanyPage] = { name: e.target.value };
                setHrd(updateHrds);
              }}
            />
            <InputText
              name={`schoolMentor-${currentCompanyPage}`}
              label={`Nama Pembimbing Sekolah`}
              placeholder={`Nama Pembimbing Sekolah`}
              type="text"
              value={schoolMentor[currentCompanyPage]?.name || ""}
              onChange={(e) => {
                const updateSchoolMentors = [...schoolMentor];
                updateSchoolMentors[currentCompanyPage] = {
                  name: e.target.value,
                };
                setSchoolMentor(updateSchoolMentors);
              }}
            />
            <InputText
              name={`companyMentor-${currentCompanyPage}`}
              label={`Nama Pembimbing Industri`}
              placeholder={`Nama Pembimbing Industri`}
              type="text"
              value={companyMentor[currentCompanyPage]?.name || ""}
              onChange={(e) => {
                const updateCompMentors = [...companyMentor];
                updateCompMentors[currentCompanyPage] = {
                  name: e.target.value,
                };
                setCompanyMentor(updateCompMentors);
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-start">
              {currentCompanyPage > 0 ? (
                <button
                  className={`bg-main text-lightOne p-2 rounded-md ${disableButton ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => setCurrentCompanyPage(currentCompanyPage - 1)}
                  disabled={disableButton}
                >
                  Previous
                </button>
              ) : (
                <button
                  className={`bg-main text-lightOne p-2 rounded-md ${disableButton ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => setCurrentPage(2)}
                  disabled={disableButton}
                >
                  Previous
                </button>
              )}
            </div>

            <div className="flex justify-end">
              {currentCompanyPage < companyDetails.length - 1 ? (
                <button
                  className="bg-main text-lightOne p-2 rounded-md"
                  onClick={() => setCurrentCompanyPage(currentCompanyPage + 1)}
                >
                  Next
                </button>
              ) : (
                <button
                  className={`bg-main text-lightOne p-2 rounded-md w-fit ${disableButton ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleExportJournal}
                  disabled={disableButton}
                >
                  {loading ? <ButtonLoading /> : "Submit & Export"}
                </button>
              )}
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <dialog id="exportModal" className="modal">
        <div className="modal-box bg-lightOne dark:bg-dark">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Export Journal</h3>
            <button
              onClick={() => document.getElementById("exportModal").close()}
            >
              <Icon icon="ic:round-close" />
            </button>
          </div>
          {renderSection()}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </dialog>

      {message && <Alert text={message} />}
      {error && <Alert text={error} error />}
    </>
  );
};

ExportModal.propTypes = {
  companyDetails: PropTypes.array.isRequired,
  selectedCompanyId: PropTypes.string.isRequired,
};

export default ExportModal;
