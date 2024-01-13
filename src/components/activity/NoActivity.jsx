import React from 'react'

const NoActivity = ({ filterKey }) => {
  return (
    <div className={`filter-item ${filterKey} flex items-center justify-center w-full h-64`}>
      <div className='filter-container'>
        <h1 className='text-dark transition duration-300 dark:text-lightOne text-xl'>
          Belum ada aktivitas terbaru
        </h1>
      </div>
    </div>
  );
};

export default NoActivity