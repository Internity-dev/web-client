import React, { createRef, useEffect, useState } from "react";
import { Alert, Header, InputText, PresenceModal, ButtonLoading, CompanyDropdown, Loading  } from "../components";
import ReactPaginate from "react-paginate";
import axiosClient from "../axios-client";
import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useCompanyDetails from "../hooks/useCompanyDetails";
import useActivity from "../hooks/useActivity";
import usePresences from "../hooks/usePresence";

const Report = () => {
  const { companyDetails, selectedCompanyId, setSelectedCompanyId } = useCompanyDetails();
  
  const { data: activity } = useActivity(selectedCompanyId);

  const { data: presences } = usePresences(selectedCompanyId);

  const { data: reports, isLoading } = useQuery(
    ["reports", selectedCompanyId],
    async () => {
      const response = await axiosClient.get(
        `/journals?company=${selectedCompanyId}`
      );
      return response.data.journals;
    },
    { enabled: !!selectedCompanyId }
  );
  const workTypeRef = createRef();
  const descriptionRef = createRef();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const reportsPerPage = 5;
  const [description, setDescription] = useState("");
  const [workType, setWorkType] = useState("");
  const [editableReport, setEditableReport] = useState(null); // Track the report being edited
  const [isEditMode, setIsEditMode] = useState(false);

  const pageCount = Math.ceil(
    reports?.length ? reports.length / reportsPerPage : 5 / reportsPerPage
  );
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const slicedReports = reports?.slice(
    currentPage * reportsPerPage,
    (currentPage + 1) * reportsPerPage
  );

  const queryClient = useQueryClient();

  const addJournalMutation = useMutation(
    (payload) => axiosClient.put(`/journals/${activity?.journal.id}`, payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("activity");
        queryClient.invalidateQueries("reports");
        setMessage("Berhasil mengupdate journal");
      },
      onError: (err) => {
        const response = err.response;
        if (response.status === 422) {
          setError(response.data.message);
          setMessage(null);
        }
      },
    }
  );

  const updateJournalMutation = useMutation(
    (payload) => axiosClient.put(`/journals/${editableReport?.id}`, payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("activity");
        queryClient.invalidateQueries("reports");
        setMessage("Berhasil mengedit journal");
      },
      onError: (err) => {
        const response = err.response;
        if (response.status === 422) {
          setError(response.data.message);
          setMessage(null);
        }
      },
    }
  );

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setWorkType(""); 
    setDescription("");
    document.getElementById("add").showModal();
  };

  const handleRowClick = (report) => {
    const reportDate = report?.date;
    if (!reportDate) {
      return;
    }

    const userPresence = presences.find((presence) => {
      const presenceDate = new Date(presence.date).toISOString().split('T')[0];

      return presenceDate === reportDate && presence.check_in;
    });

    if (userPresence) {
      setEditableReport(report);
      setWorkType(report.work_type);
      setDescription(report.description);
      setIsEditMode(true);
      document.getElementById("add").showModal();
    } else {
      setError("Oops, kamu tidak absen pada tanggal ini.");
    }
  };
  const handleClose = () => {
    document.getElementById("add").close();
    setWorkType(""); 
    setDescription("");
  }
  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      work_type: workTypeRef.current.value,
      description: descriptionRef.current.value,
    };
    if (isEditMode) {
      updateJournalMutation.mutate(payload);
    } else {
      addJournalMutation.mutate(payload);
    }
    document.getElementById("add").close();
  };

  const handleExportJournal = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.post(
        `/export-journal/${selectedCompanyId}`,
        {},
      {
        responseType: "blob",
      });

      if(response?.data){
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;

        const currentDate = new Date().toISOString().split('T')[0];
        const fileName = `journal-${currentDate}.pdf`;

        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setMessage("Report berhasil diunduh!");
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
        }
        else if (error) {
          setError(null);
        }
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [message, error]);

  const handleCompanyChange = (event) => {
    setSelectedCompanyId(event.target.value);
    setCurrentPage(0);
  };

  return (
    <div className='m-2 md:m-10 p-8 md:p-10 bg-white dark:bg-dark rounded-3xl transition duration-300'>
      <div className='md:flex md:items-center md:justify-between mb-5'>
        <Header category='Jurnal' title='PKL' />
        <CompanyDropdown
          companyDetails={companyDetails}
          selectedCompanyId={selectedCompanyId}
          handleCompanyChange={handleCompanyChange}
          />
      </div>
      <div className='w-full flex justify-center'>
        <div className='w-full h-10 flex items-center justify-between'>
        <button
            className='btn btn-outline btn-warning btn-sm text-lightOne font-bold ml-2'
            onClick={handleExportJournal} disabled={loading}>
            {loading ? <ButtonLoading /> : "Export Journal"}
          </button>
          <button
            className='btn btn-outline btn-info btn-sm text-lightOne font-bold'
            onClick={() => !activity?.journal ? document.getElementById("journal").showModal() : handleOpenAdd()}
          >
            add journal
          </button>
        </div>
      </div>
      <div className='overflow-x-auto'>
        {isLoading ? (
          <Loading />
        ) : (
          <table className='table'>
            <thead>
              <tr className='border-b-dark dark:border-b-lightOne uppercase text-dark dark:text-lightOne'>
                <th>tanggal</th>
                <th>bidang pekerjaan</th>
                <th>uraian pekerjaan</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {slicedReports?.map((report) => (
                <tr
                  className='border-b-dark dark:border-b-lightOne cursor-pointer hover:bg-gray-100'
                  key={report.id}
                  onClick={() => handleRowClick(report)}
                >
                  <th>{report.date}</th>
                  <th>{report.work_type}</th>
                  <th>{report.description}</th>
                  <th>
                    <button
                      className={`uppercase text-sm ${
                        report.is_approved
                          ? "bg-[#A3F0D0] p-2 rounded-md text-[#0FB782]"
                          : "bg-[#F5ED8D] p-2 rounded-md text-[#E9B207]"
                      }`}
                      disabled
                    >
                      {report.is_approved ? "disetujui" : "pending"}
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className='flex flex-col justify-between'>
        <div className='flex flex-col items-start justify-center'>
          <p>Total Journals: {reports?.length}</p>
          <p>
            Page: {currentPage + 1} of {pageCount}
          </p>
        </div>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          pageLinkClassName={"pagination__link"}
          activeLinkClassName={"pagination__link--active"}
          breakClassName={"pagination__break"}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
        />
      </div>
      <PresenceModal
        id='journal'
        message='Anda sudah membuat journal hari ini!'
      />
      <dialog id='add' className='modal'>
        <div className='modal-box bg-lightOne dark:bg-dark'>
          <div className='flex justify-between items-center'>
            <h3 className='font-bold text-lg'>{isEditMode ? "Edit Journal" : "Add Journal"}</h3>
              <button className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray rounded-full' onClick={handleClose}>
                <Icon icon='ic:round-close' color='#99abb4' />
              </button>
          </div>
          <form onSubmit={onSubmit}>
            <InputText
              label='Bidang Pekerjaan'
              name='workType'
              type='text'
              innerRef={workTypeRef}
              placeholder={"Masukkan Bidang Pekerjaan"}
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
            />
            <div className='form-control my-2'>
              <label className='label'>
                <span className='label-text text-dark transition duration-300 dark:text-lightOne text-base'>
                  Deskripsi
                </span>
              </label>
              <textarea
                name='description'
                className='textarea textarea-bordered h-24 bg-main-bg transition duration-300 dark:bg-main-dark-bg text-base'
                ref={descriptionRef}
                placeholder='Masukkan Deskripsi'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button
              type='submit'
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById("notifications").close();
              }}
              className='bg-main text-lightOne p-2 hover:drop-shadow-xl rounded-md capitalize'
            >
              {isEditMode ? "Update" : "Submit"}
            </button>
          </form>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
      {message && <Alert text={message} />}
      {error && <Alert text={error} error />}
    </div>
  );
};

export default Report;
