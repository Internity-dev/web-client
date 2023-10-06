import React from 'react';

const LoginBtn = ({ text }) => {
  return (
    <div className='mt-5'>
        <button className='w-full py-3 text-center text-lightTwo text-lg rounded-md font-normal loginBtn hover:text-main border border-main transition duration-500'>
            {text}
        </button>
    </div>
  );
};

export default LoginBtn;