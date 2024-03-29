import { Icon } from "@iconify/react";
import React from "react";
import { NavLink } from "react-router-dom";

const InternCard = ({ vacancy, icon }) => {
  return (
    <NavLink
      to={`/vacancy/${vacancy.id}`}
      className='flex m-3 flex-wrap justify-between gap-1 items-center w-[22rem] md:w-800 min-h-[7rem] h-auto text-neutral-700 dark:text-neutral-200 transition duration-300 dark:hover:text-black hover:bg-light-gray rounded-xl'
    >
      <div className='flex items-center ml-5 w-64 md:w-auto'>
        <img src={vacancy.company.logo_url} alt='' className="w-20 md:w-24" />
        <div className='ml-3 leading-5'>
          <h1 className='font-bold capitalize text-lg leading-none'>{vacancy.name}</h1>
          <p className='capitalize one-line'>{vacancy.company.name}</p>
          <p className='capitalize'>{vacancy.company.city}, {vacancy.company.state}</p>
          <p className='capitalize text-main text-sm font-medium'>
            {vacancy.applied} Pendaftar
          </p>
        </div>
      </div>
      <Icon icon={icon} width={40} className='mr-5' />
    </NavLink>
  );
};

export default InternCard;
