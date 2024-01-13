import React from "react";
import { useQuery } from "react-query";
import axiosClient from "../../axios-client";
import { MyInternDetail, Title } from "../../components";

const MyIntern = () => {
  const { data: user } = useQuery("user", () =>
    axiosClient.get("/me").then(({ data }) => data)
  );

  const {
    data: appliancesData,
    isLoading
  } = useQuery(
    "acceptedAppliances",
    async () => {
      const response = await axiosClient.get("/appliances/accepted");
      return response.data;
    },
    {
      enabled: !!user?.id,
    }
  );

  return (
    <div className='flex flex-col justify-center items-center lg:my-15 my-20'>
      <Title title='magangku' />
      {isLoading ? (
        <div className='flex items-center justify-center h-72'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      ) : user?.in_internship ? (
        <div className='m-2 md:m-10 mt-8 shadow-xl transition duration-300 dark:bg-secondary-dark-bg bg-white rounded-3xl'>
          {appliancesData?.appliances && (
            appliancesData.appliances.map((appliance) => (
              <MyInternDetail key={appliance.id} vacancy={appliance.vacancy} />
            ))
          )}
        </div>
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

export default MyIntern;
