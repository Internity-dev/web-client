import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const InternLink = ({ title, icon, to }) => {
  return (
    <Link
      to={to}
      className='flex justify-center items-center md:mx-12 mx-4 text-dark transition duration-300 dark:text-lightOne'
    >
      <h1 className='capitalize md:text-xl text-base font-medium mr-1'>
        {title}
      </h1>
      <Icon icon={icon} width={30} />
    </Link>
  );
};

InternLink.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  to: PropTypes.string,
};

export default InternLink;
