import PropTypes from "prop-types";

const ActivityButton = ({ text, filterKey, setFilterKey, filter }) => {
  const activeLink =
    "text-sm lg:text-lg bg-main text-lightOne rounded-[2rem] border-none outline-none my-[0.45rem] mx-[0.4rem] py-[0.85rem] px-[1rem] lg:px-[1.8rem] uppercase font-medium leading-none cursor-pointer transition duration-300";
  const normalLink =
    "text-sm lg:text-lg bg-transparent text-dark transition duration-300 dark:text-lightOne rounded-[2rem] border-none outline-none my-[0.45rem] mx-[0.4rem] py-[0.85rem] px-[1rem] lg:px-[1.8rem] uppercase font-medium leading-none cursor-pointer transition duration-300";
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

ActivityButton.propTypes = {
  text: PropTypes.string,
  filterKey: PropTypes.string,
  setFilterKey: PropTypes.func,
  filter: PropTypes.string,
};

export default ActivityButton;
