import React from "react";

const InternDetails = ({ vacancy }) => {
  return (
    <div className='flex flex-col'>
      <div className='m-5 md:m-10'>
        <h1 className='text-dark transition duration-300 dark:text-lightOne text-2xl font-medium capitalize text-center md:text-left'>
          {vacancy.name}
        </h1>
        <div className='flex flex-col md:flex-row items-center'>
          <img
            src={vacancy.company.logo_url}
            alt='logo'
            className='my-5 w-36 md:w-40'
          />
          <div className='flex flex-col justify-center flex-wrap md:ml-5'>
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
      <div className='m-5 md:m-10 text-dark transition duration-300 dark:text-lightOne md:text-lg text-base'>
        <h1 className='text-2xl font-medium capitalize'>deskripsi pekerjaan</h1>
        <h1 className='first-letter:uppercase mt-5'>{vacancy.description}</h1>
      </div>
    </div>
  );
};

export default InternDetails;
