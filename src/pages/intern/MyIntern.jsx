import React, { useEffect, useState } from "react";
import { InternDetails, Title } from "../../components";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../context/ContextProvider";

const MyIntern = () => {
  const { appliances, user } = useStateContext();

  return (
    <div className='flex flex-col justify-center items-center lg:my-15 my-20  '>
      <Title title='magangku' />
      {user.in_internship ? (
        <div className='m-2 md:m-10 mt-24 shadow-xl transition duration-300 dark:bg-secondary-dark-bg bg-white rounded-3xl'>
            <InternDetails key={appliances.id} vacancy={appliances.vacancy} />
        </div>
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
