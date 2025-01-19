import React, { createRef, useEffect, useState } from "react";
import InputDate from "../inputs/InputDate";
import axiosClient from "../../axios-client";
import { useMutation, useQuery } from "react-query";
import InputText from "../profile/InputText";
import LoginBtn from "../login/LoginBtn";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert";
import useUser from "../../hooks/useUser";

const MyInternDetail = ({ vacancy, internDate }) => {
  const navigate = useNavigate();
  const startDateRef = createRef();
  const [startDate, setStartDate] = useState(internDate?.start_date || "");
  const endDateRef = createRef();
  const [endDate, setEndDate] = useState(internDate?.end_date || "");
  const extendRef = createRef();
  const [extend, setExtend] = useState(internDate?.extend || 0);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const { data: user } = useUser();
  
  const { data: appliancesData } = useQuery(
    "internDates",
    async () => {
      const response = await axiosClient.get("/appliances/accepted");
      return response.data.intern_date[0];
    },
    {
      enabled: !!user?.id,
    }
  );

  const { mutate } = useMutation(
    (payload) =>
      axiosClient.put(
        `/appliances/${internDate.company_id}/edit-date`,
        payload
      ),
    {
      onSuccess: () => {
        setMessage("Tanggal berhasil diubah");
        setError(null);
      },
      onError: (err) => {
        const response = err.response;
        if (response.status === 500) {
          setError(response.data.message);
          setMessage(null);
        }
      },
    }
  );

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      start_date: startDateRef.current.value,
      end_date: endDateRef.current.value,
      extend: extendRef.current.value,
    };

    mutate(payload);
  };

  useEffect(() => {
    if (message || error) {
      const timeoutId = setTimeout(() => {
        setMessage(null);
        setError(null);
        navigate("/intern");
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [message, error]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
  };

  return (
    <div className="flex flex-col m-2 md:m-10 mt-8 shadow-xl transition duration-300 dark:bg-secondary-dark-bg bg-white rounded-3xl max-w-5xl w-[95%]">
      <div className="m-5 md:m-10">
        <h1 className="text-dark transition duration-300 dark:text-lightOne text-2xl font-medium capitalize text-center md:text-left">
          {vacancy.name}
        </h1>
        <div className="flex flex-col md:flex-row items-center">
          <img
            src={
              vacancy.company.logo_url
                ? vacancy.company.logo_url
                : "/images/placeholder-company.webp"
            }
            alt="logo"
            width={90}
            className="my-5 w-36 md:w-40"
          />
          <div className="flex flex-col justify-center flex-wrap md:ml-5">
            <h1 className="text-dark transition duration-300 dark:text-lightOne font-semibold">
              {vacancy.company.name}
            </h1>
            {vacancy.company.city && (
              <p className="text-dark transition duration-300 dark:text-lightOne font-medium">
                {vacancy.company.address}, {vacancy.company.city},{" "}
                {vacancy.company.state}
              </p>
            )}
            <a
              className="text-dark transition duration-300 dark:text-lightOne underline"
              href={vacancy.company.website}
              target="blank"
            >
              {vacancy.company.website}
            </a>
          </div>
        </div>
        <div className="flex gap-5 text-sm">
          <h1 className="text-main">{vacancy.applied} pendaftar</h1>
          <h1 className="text-gray-600 transition duration-300 dark:text-slate-300">
            {formatDate(vacancy.created_at)}
          </h1>
        </div>
      </div>
      {!internDate.finished && (
        <div className='m-5 md:m-10 text-dark transition duration-300 dark:text-lightOne md:text-lg text-base'>
          <h1 className='text-2xl font-medium capitalize'>deskripsi pekerjaan</h1>
          <div
            className='first-letter:uppercase mt-5'
            dangerouslySetInnerHTML={{ __html: vacancy.description }}
          />
        </div>
      )}
      <div className="m-5 md:m-10 text-dark transition duration-300 dark:text-lightOne md:text-lg text-base">
        {internDate.finished ? (
          <div>
            <div className="flex gap-2 mb-4">
              <img
                src="/images/checkmark-icon.svg"
                alt="checkmark icon"
                className="h-8 w-8"
              />
              <h1 className="text-2xl font-medium capitalize text-green-500">
                Selesai
              </h1>
            </div>
            <div className="w-full">
              <p className="text-gray-700 transition duration-300 dark:text-lightOne">
                <strong>Tanggal Mulai:</strong>{" "}
                {formatDate(internDate.start_date)}
              </p>
              <p className="text-gray-700 transition duration-300 dark:text-lightOne">
                <strong>Tanggal Selesai:</strong>{" "}
                {formatDate(internDate.end_date)}
              </p>
              <p className="text-gray-700 transition duration-300 dark:text-lightOne">
                <strong>Lama Perpanjangan:</strong> {internDate.extend} bulan
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <h1 className="text-2xl font-medium capitalize">edit tanggal</h1>
            <InputDate
              label="Tanggal Mulai"
              name="start_date"
              innerRef={startDateRef}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <InputDate
              label="Tanggal Selesai"
              name="end_date"
              innerRef={endDateRef}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <InputText
              label="Lama Perpanjang (Bulan)"
              name="extend"
              type="number"
              innerRef={extendRef}
              placeholder="Perpanjang waktu PKL"
              value={extend}
              onChange={(e) => setExtend(e.target.value)}
            />
            {message && <Alert text={message} />}
            {error && <Alert text={error} error />}
            <LoginBtn text="Save" />
          </form>
        )}
      </div>
    </div>
  );
};

export default MyInternDetail;
