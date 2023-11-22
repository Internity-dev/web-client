import React from "react";
import { Link } from "react-router-dom";

const StatusCard = ({ appliance }) => {
  return (
    <Link
      to={`/vacancy/${appliance.vacancy.id}`}
      className='flex m-3 flex-wrap justify-between gap-1 items-center md:w-800 w-[480px] h-28 text-neutral-700 transition duration-300 dark:text-neutral-200 transition duration-300 dark:hover:text-black hover:bg-light-gray rounded-xl'
    >
      <div className='flex items-center ml-5'>
        <img src={appliance.vacancy.company.logo_url} alt='' width={90} />
        <div className='ml-3 leading-5'>
          <h1 className='font-bold capitalize text-lg'>
            {appliance.vacancy.name}
          </h1>
          <p className='capitalize'>{appliance.vacancy.company.name}</p>
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
            appliance.status == "rejected"
              ? "#F9CAD1"
              : appliance.status == "processed" || "pending"
              ? "#F5ED8D"
              : "#A3F0D0",
          color:
            appliance.status == "rejected"
              ? "#F03E61"
              : appliance.status == "processed" || "pending"
              ? "#E9B207"
              : "#0FB782",
        }}
        className='py-1 px-2 rounded-lg capitalize w-20 text-center mr-5 font-semibold'
      >
        <h1>
          {appliance.status == "rejected"
            ? "ditolak"
            : appliance.status == "processed" || "pending"
            ? "diproses"
            : "diterima"}
        </h1>
      </div>
    </Link>
  );
};

export default StatusCard;
