import React from "react";

const ActivityButton = ({ text, filterKey, setFilterKey, filter }) => {
  const activeLink =
    "text-lg bg-main text-lightOne rounded-[2rem] border-none outline-none my-[0.45rem] mx-[0.4rem] py-[0.85rem] px-[1.8rem] uppercase font-medium leading-none cursor-pointer transition duration-300";
  const normalLink =
    "text-lg bg-transparent text-dark transition duration-300 dark:text-lightOne rounded-[2rem] border-none outline-none my-[0.45rem] mx-[0.4rem] py-[0.85rem] px-[1.8rem] uppercase font-medium leading-none cursor-pointer transition duration-300";
  return (
    <button
      onClick={() => setFilterKey(filter)}
      type='button'
      className={filterKey === filter ? activeLink : normalLink}
    >
      {text}
    </button>
  );
};

export default ActivityButton;
