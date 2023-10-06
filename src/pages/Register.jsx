import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { LoginBtn, Input } from "../components";

const Register = () => {

  return (
    <div
    className='min-h-screen flex items-center justify-center overflow-hidden'
    style={{ backgroundImage: "linear-gradient(115deg, #1191FF, #F9F9F9)" }}
  >
    <div className='w-10/12 lg:w-8/12 bg-white rounded-xl shadow-lg overflow-hidden'>
      <div className='flex flex-col lg:flex-row'>
        <div className='w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center'>
            <img src='images/logo-internity.png' alt='' width='200' />
            <h1 className='text-main text-3xl mb-3 font-bold'>Welcome to Internity!</h1>
            <p className='text-main text-2xl'>Ayo mulai karirmu</p>
          </div>
          <div className='w-full lg:w-1/2 py-16 px-12'>
            <h2 className='text-3xl mb-4'>Sign Up</h2>
            <p className='mb-4'>Create your account</p>
            <form action='#'>
              <Input label="Name" icon={<FontAwesomeIcon icon={faUser} showEye={false} />} />
              <Input label="Email" icon={<FontAwesomeIcon icon={faEnvelope} showEye={false}  />} />
              <Input label="Password" icon={<FontAwesomeIcon icon={faLock} />} showEye />
              <Input label="Confirm Password" icon={<FontAwesomeIcon icon={faLock} />} showEye />
              <div className='mt-5'>
                <input type='checkbox' className='border border-gray-400 mr-2' name='terms' id='terms' />
                <label htmlFor='terms'>
                  I accept the{" "}
                  <a href='' className='text-main font-semibold'>
                    Terms
                  </a>{" "}
                  &{" "}
                  <a href='' className='text-main font-semibold'>
                    Conditions
                  </a>
                </label>
              </div>
              <LoginBtn text='Sign Up' />
              <div className='mt-5'>
                <p className='text-center'>
                  Already have an account?{" "}
                  <a href='/login' className='text-main underline font-bold'>
                    Sign in
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
