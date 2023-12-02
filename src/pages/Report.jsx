import React, { createRef, useEffect, useState } from "react";
import { Header, InputText, PresenceModal } from "../components";
import ReactPaginate from "react-paginate";
import axiosClient from "../axios-client";
import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const Report = () => {
  const { data: companyDetails } = useQuery("companyDetails", async () => {
    const response = await axiosClient.get("/appliances/accepted");
    return response.data.appliances[0];
  });

  const { data: activity } = useQuery(
    ["activity", companyDetails?.intern_date.company_id],
    async () => {
      const response = await axiosClient.get(
        `/today-activities?company=${companyDetails?.intern_date.company_id}`
      );
      return response.data;
    },
    { enabled: !!companyDetails?.intern_date.company_id }
  );

  const { data: reports } = useQuery(
    ["reports", companyDetails?.intern_date.company_id],
    async () => {
      const response = await axiosClient.get(
        `/journals?company=${companyDetails?.intern_date.company_id}`
      );
      return response.data.journals;
    },
    { enabled: !!companyDetails?.intern_date.company_id }
  );
  const workTypeRef = createRef();
  const descriptionRef = createRef();
  const [message, setMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const reportsPerPage = 5;
  const [description, setDescription] = useState("");
  const [workType, setWorkType] = useState("");
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

  const updateJournalMutation = useMutation(
    (payload) =>
      axiosClient.put(`/journals/${activity?.journal.id}`, payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("activity");
        queryClient.invalidateQueries("reports");
        setMessage("Berhasil mengupdate journal");
      },
    }
  );

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      work_type: workTypeRef.current.value,
      description: descriptionRef.current.value,
    };
    updateJournalMutation.mutate(payload);
    document.getElementById("add").close();
  };

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        setMessage(null);
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-dark rounded-3xl transition duration-300'>
      <Header category='Jurnal' title='Magang' />
      <div className='w-full flex justify-center'>
        <div className='w-full h-10 flex items-center justify-end'>
          <button
            className='btn btn-outline btn-info btn-sm text-lightOne font-bold'
            onClick={() =>
              !activity?.journal
                ? document.getElementById("journal").showModal()
                : document.getElementById("add").showModal()
            }
          >
            add journal
          </button>
        </div>
      </div>
      <div className='overflow-x-auto'>
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
                className='border-b-dark dark:border-b-lightOne'
                key={report.id}
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
      </div>
      <div className='flex justify-between items-center'>
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
            <h3 className='font-bold text-lg'>Add journal</h3>
            <form method='dialog'>
              <button className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray rounded-full'>
                <Icon icon='ic:round-close' color='#99abb4' />
              </button>
            </form>
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
                  Tentang Saya
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
              submit
            </button>
          </form>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
      {message && (
        <div
          role='alert'
          className='alert alert-success fixed w-auto top-16 right-10 z-50 flex'
        >
          <Icon icon='icon-park-solid:success' width={30} />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default Report;
