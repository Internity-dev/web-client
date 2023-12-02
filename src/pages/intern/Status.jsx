import React from "react";
import { useQuery } from "react-query";
import { StatusCard, Title } from "../../components";
import axiosClient from "../../axios-client";

const Status = () => {
  const { data: statusData, isLoading } = useQuery(
    "appliances",
    async () => {
      const response = await axiosClient.get("/appliances");
      return response.data.appliances;
    }
  );

  return (
    <div className='flex flex-col justify-center items-center lg:my-15 my-20'>
      <Title title='intern status' />
      {isLoading ? (
        <div className='flex items-center justify-center h-72 m-7'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      ) : statusData && statusData.length !== 0 ? (
        <>
          {statusData.map((appliance) => (
            <StatusCard
              key={appliance.id}
              vacancy={appliance.vacancy}
              appliance={appliance}
              icon='material-symbols:bookmark-add-outline-rounded'
            />
          ))}
        </>
      ) : (
        <div className='flex justify-center items-center h-72 m-7'>
          <h1 className='text-dark transition duration-300 dark:text-lightOne text-xl first-letter:capitalize'>
            Belum ada tempat magang terdaftar
          </h1>
        </div>
      )}
    </div>
  );
};

export default Status;
