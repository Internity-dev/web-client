import PropTypes from "prop-types";

const Header = ({ category, title }) => (
  <div className='mb-10'>
    <p className='text-lg text-gray-400'>{category}</p>
    <p className='text-3xl font-extrabold tracking-tight text-slate-900 dark:text-lightOne'>
      {title}
    </p>
  </div>
);

Header.propTypes = {
  category: PropTypes.string,
  title: PropTypes.string,
};

export default Header;
