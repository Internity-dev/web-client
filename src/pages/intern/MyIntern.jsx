import React, { useEffect, useState } from "react";
import { Title } from "../../components";
import axiosClient from "../../axios-client";

const MyIntern = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [appliance, setAppliance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/appliances/accepted");
        setAppliance(response.data.appliances);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='flex flex-col justify-center items-center lg:my-15 my-20  '>
      <Title title='magangku' />
      {isLoading ? (
        <div className='flex items-center justify-center h-72 m-7'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      ) : appliance.length !== 0 ? (
        <div></div>
      ) : (
        <div className='flex justify-center items-center h-72 m-7'>
          <h1 className='text-dark transition duration-300 dark:text-lightOne text-xl first-letter:capitalize'>
            belum ada tempat magang terdaftar
          </h1>
        </div>
      )}
    </div>
  );
};

export default MyIntern;
