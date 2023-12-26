import { Icon } from "@iconify/react";
import React from "react";

const Info = ({ icon, title }) => {
  return (
    <div className='flex text-dark transition duration-300 dark:text-lightOne my-3 items-center flex-wrap'>
      <Icon icon={icon} width={30} />
      <h1 className='ml-5 text-2xl'>{title}</h1>
    </div>
  );
};

export default Info;
