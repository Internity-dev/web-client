import React from "react";

const Title = ({ title }) => {
  return (
    <h1 className='title text-3xl transition duration-300 dark:text-white text-dark font-bold after:bg-main capitalize text-center'>
      {title}
    </h1>
  );
};

export default Title;
