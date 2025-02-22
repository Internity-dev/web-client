import PropTypes from "prop-types";

const LoginBanner = ({ header, text }) => {
  return (
    <div className='w-full lg:w-1/2 flex flex-row gap-3 sm:flex-col items-center justify-center py-5 px-12 bg-no-repeat bg-cover bg-center'>
      <img src='images/logo-internity.png' alt='' width='200' className="w-24 md:w-48" />
      <div>
        <h1 className='text-main md:text-center text-2xl md:text-3xl font-bold'>
          {header}
        </h1>
        <p className='text-main md:text-center text-xl md:text-2xl'>{text}</p>
      </div>
    </div>
  );
};

LoginBanner.propTypes = {
  header: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default LoginBanner;
