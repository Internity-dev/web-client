import PropTypes from "prop-types";

const InternButton = ({ text, left, vacancy, onClick }) => {

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const normalRight =
    "text-lg rounded-xl p-3 lg:w-400 md:w-72 w-36 hover:drop-shadow-xl font-medium bg-main text-lightOne capitalize";
  const activeRight =
    "text-lg rounded-xl p-3 lg:w-400 md:w-72 w-36 hover:drop-shadow-xl font-medium bg-red-600 text-lightOne capitalize";
  const normalLeft =
    "text-lg rounded-xl p-3 lg:w-400 md:w-72 w-36 hover:drop-shadow-xl font-medium border-2 bg-lightOne text-main capitalize";
  const activeLeft =
    "text-lg rounded-xl p-3 lg:w-400 md:w-72 w-36 hover:drop-shadow-xl font-medium border-2 bg-lightOne text-red-600 capitalize";

  let className;
  if (left) {
    className = vacancy.is_saved ? activeLeft : normalLeft;
  } else {
    className = vacancy.in_pending ? activeRight : normalRight;
  }
  return <button className={className} onClick={handleClick} disabled={text == "Processing" ? true : false}>{text}</button>;
};

InternButton.propTypes = {
  text: PropTypes.string,
  left: PropTypes.bool,
  vacancy: PropTypes.object,
  onClick: PropTypes.func,
};

export default InternButton;
