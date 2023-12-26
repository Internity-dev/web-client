import React from "react";
import { Link } from "react-router-dom";

const StatusCard = ({ appliance }) => {
  return (
    <Link
      to={`/vacancy/${appliance.vacancy.id}`}
      className='flex m-3 flex-wrap justify-between gap-1 items-center w-[22rem] md:w-800 h-28 text-neutral-700 dark:text-neutral-200 transition duration-300 dark:hover:text-black hover:bg-light-gray rounded-xl'
    >
      <div className='flex items-center ml-2 md:ml-5 w-64 md:w-auto'>
        <img
          src={appliance.vacancy.company.logo_url}
          alt={appliance.vacancy.company.logo_url}
          className='w-20 md:w-24'
        />
        <div className='ml-3 leading-5'>
          <h1 className='font-bold capitalize text-lg'>
            {appliance.vacancy.name}
          </h1>
          <p className='capitalize one-line'>{appliance.vacancy.company.name}</p>
          <p className='capitalize'>
            {appliance.vacancy.company.city}, {appliance.vacancy.company.state}
          </p>
          <p className='capitalize text-main text-sm font-medium'>
            {appliance.vacancy.applied} Pendaftar
          </p>
        </div>
      </div>
      <div
        style={{
          backgroundColor:
            appliance.status == "rejected" || appliance.status == "canceled"
              ? "#F9CAD1"
              : appliance.status == "accepted"
              ? "#A3F0D0"
              : "#F5ED8D",
          color:
            appliance.status == "rejected" || appliance.status == "canceled"
              ? "#F03E61"
              : appliance.status == "accepted"
              ? "#0FB782"
              : "#E9B207",
        }}
        className='py-1 px-2 rounded-lg capitalize md:w-20 text-center mr-2 md:mr-5 font-semibold text-sm md:text-base'
      >
        <h1>{appliance.status}</h1>
      </div>
    </Link>
  );
};

export default StatusCard;
