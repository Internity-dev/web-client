import { Icon } from "@iconify/react";
import React from "react";
import { NavLink } from "react-router-dom";

const ActivityNotification = ({ title, date, to }) => {
  return (
    <NavLink
      to={to}
      className='flex m-3 flex-wrap justify-between gap-1 items-center border border-gray md:w-800 w-96 h-20 rounded-xl'
    >
      <div className='ml-5'>
        <h1 className='font-bold text-dark transition duration-300 dark:text-lightOne capitalize'>
          {title}
        </h1>
        <p className='text-neutral-700 transition duration-300 dark:text-neutral-200'>
          Sampai {date}
        </p>
      </div>
      <Icon
        icon='pepicons-pencil:exclamation'
        width='60'
        style={{ color: "#E9B207", backgroundColor: "#FFFACD" }}
        className='text-xl rounded-full p-3 hover:bg-light-gray mr-5'
      />
    </NavLink>
  );
};

export default ActivityNotification;
