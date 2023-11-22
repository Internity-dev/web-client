import React from "react";
import { Header } from "../components";
import { Link } from "react-router-dom";

const Report = () => {
  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-dark rounded-3xl'>
      <Header category='My' title='Reports' />
      <div className='w-full flex justify-center'>
        <div className='w-full h-10 flex items-center justify-end'>
          <Link to='/' className='text-lightOne font-bold'>
            <button className='btn btn-outline btn-info btn-sm'>add report</button>
          </Link>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr className='border-b-dark dark:border-b-lightOne'>
              <th>No.</th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b-dark border-b-lightOne'>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
