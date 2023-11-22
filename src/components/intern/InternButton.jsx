import React from "react";

const InternButton = ({ text, left, vacancy, onClick }) => {

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const normalRight =
    "text-lg rounded-xl p-3 lg:w-400 md:w-72 w-52 hover:drop-shadow-xl font-medium bg-main text-lightOne capitalize";
  const activeRight =
    "text-lg rounded-xl p-3 lg:w-400 md:w-72 w-52 hover:drop-shadow-xl font-medium bg-red-600 text-lightOne capitalize";
  const normalLeft =
    "text-lg rounded-xl p-3 lg:w-400 md:w-72 w-52 hover:drop-shadow-xl font-medium border-2 bg-lightOne text-main capitalize";
  const activeLeft =
    "text-lg rounded-xl p-3 lg:w-400 md:w-72 w-52 hover:drop-shadow-xl font-medium border-2 bg-lightOne text-red-600 capitalize";

  let className;
  if (left) {
    className = vacancy.in_pending ? activeLeft : normalLeft;
  } else {
    className = vacancy.in_pending ? activeRight : normalRight;
  }
  return <button className={className} onClick={handleClick}>{text}</button>;
};

export default InternButton;
