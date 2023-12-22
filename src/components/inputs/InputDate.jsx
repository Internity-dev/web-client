import React from "react";

const InputDate = ({ label, name, innerRef, placeholder, value, onChange }) => {
  return (
    <div className='form-control my-2'>
      <label className='label'>
        <span className='label-text text-dark transition duration-300 dark:text-lightOne text-base'>
          {label}
        </span>
      </label>
      <input
        type='date'
        name={name}
        className='input input-bordered w-full bg-main-bg transition duration-300 dark:bg-main-dark-bg'
        ref={innerRef}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      />
    </div>
  );
};

export default InputDate;
