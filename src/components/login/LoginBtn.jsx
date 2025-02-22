import PropTypes from "prop-types";

const LoginBtn = ({ text }) => {
  return (
    <button className='mt-5 w-full py-3 text-center text-lightTwo text-lg rounded-md font-normal loginBtn hover:text-main border border-main transition duration-500'>
      {text}
    </button>
  );
};

LoginBtn.propTypes = { text: PropTypes.string };

export default LoginBtn;
