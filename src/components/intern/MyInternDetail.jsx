import React, { createRef, useEffect, useState } from "react";
import InputDate from "../inputs/InputDate";
import axiosClient from "../../axios-client";
import { useQuery } from "react-query";
import InputText from "../profile/InputText";

const MyIntern = ({ vacancy }) => {
  const startDateRef = createRef();
  const [startDate, setStartDate] = useState("");
  const endDateRef = createRef();
  const [endDate, setEndDate] = useState("");
  const extendRef = createRef();
  const [extend, setExtend] = useState();
  const { data: user } = useQuery("user", () =>
    axiosClient.get("/me").then(({ data }) => data)
  );
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
  console.log(appliancesData)
  useEffect(() => {
    if (appliancesData) {
      setStartDate(appliancesData.start_date || "");
      setEndDate(appliancesData.end_date || "");
    }
  }, [appliancesData]);
  return (
    <div className='flex flex-col'>
      <div className='m-10'>
        <h1 className='text-dark transition duration-300 dark:text-lightOne text-2xl font-medium capitalize'>
          {vacancy.name}
        </h1>
        <div className='flex'>
          <img
            src={vacancy.company.logo_url}
            alt='logo'
            width={90}
            className='my-5'
          />
          <div className='flex flex-col justify-center ml-5'>
            <h1 className='text-dark transition duration-300 dark:text-lightOne font-semibold'>
              {vacancy.company.name}
            </h1>
            <p className='text-dark transition duration-300 dark:text-lightOne font-medium'>
              {vacancy.company.address}, {vacancy.company.city},{" "}
              {vacancy.company.state}
            </p>
            <a
              className='text-dark transition duration-300 dark:text-lightOne underline'
              href={vacancy.company.website}
              target='blank'
            >
              {vacancy.company.website}
            </a>
          </div>
        </div>
        <div className='flex gap-5 text-sm'>
          <h1 className='text-main'>{vacancy.applied} pendaftar</h1>
          <h1 className='text-gray transition duration-300 dark:text-slate-300'>
            9 september 2006
          </h1>
        </div>
      </div>
      <div className='mx-10 mb-10 text-dark transition duration-300 dark:text-lightOne md:text-lg text-base'>
        <h1 className='text-2xl font-medium capitalize'>deskripsi pekerjaan</h1>
        <h1 className='first-letter:uppercase mt-5'>{vacancy.description}</h1>
      </div>
      <div className='mx-10 mb-10 text-dark transition duration-300 dark:text-lightOne md:text-lg text-base'>
        <h1 className='text-2xl font-medium capitalize'>edit tanggal</h1>
        {/* {appliancesData?.appliances &&
          appliancesData.intern_date.map((appliance) => (
            <> */}
        <InputDate
          label='Tanggal Mulai'
          name='start_date'
          innerRef={startDateRef}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <InputDate
          label='Tanggal Selesai'
          name='end_date'
          innerRef={endDateRef}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <InputText
          label='Lama Perpanjang (Bulan)'
          name='extend'
          type='number'
          innerRef={extendRef}
          placeholder='Perpanjang waktu magang'
          value={extend}
          onChange={(e) => setExtend(e.target.value)}
        />
        {/* </>
          ))} */}
      </div>
    </div>
  );
};

export default MyIntern;
