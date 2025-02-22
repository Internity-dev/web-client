import { Icon } from "@iconify/react";
import PropTypes from "prop-types";

const Info = ({ icon, title }) => {
  return (
    <div className='flex text-dark transition duration-300 dark:text-lightOne my-3 items-center flex-wrap'>
      <Icon icon={icon} width={30} />
      <h1 className='ml-5 text-2xl'>{title}</h1>
    </div>
  );
};

Info.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Info;
