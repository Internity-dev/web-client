import PropTypes from "prop-types";

const Title = ({ title }) => {
  return (
    <h1 className='title text-3xl transition duration-300 dark:text-white text-dark font-bold after:bg-main capitalize text-center'>
      {title}
    </h1>
  );
};

Title.propTypes = {
  title: PropTypes.string,
};

export default Title;
