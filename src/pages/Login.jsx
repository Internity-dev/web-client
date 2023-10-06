import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { LoginBtn, Input, LoginBanner } from "../components";

const Login = () => {
  return (
    <div
      className='min-h-screen flex items-center justify-center overflow-hidden'
      style={{ backgroundImage: "linear-gradient(115deg, #1191FF, #F9F9F9)" }}
    >
      <div className='w-10/12 lg:w-8/12 bg-white rounded-xl shadow-lg overflow-hidden'>
        <div className='flex flex-col lg:flex-row'>
          <LoginBanner header="Welcome back" text="Continue your internship" />
          <div className='w-full lg:w-1/2 py-16 px-12'>
            <h2 className='text-3xl mb-4'>Sign In</h2>
            <p className='mb-4'>Sign in to your account</p>
            <form action='#'>
              <Input label='Email' icon={<FontAwesomeIcon icon={faEnvelope} showEye={false} />} />
              <Input label='Password' icon={<FontAwesomeIcon icon={faLock} />} showEye />
              <div className='mt-5'>
                <a href='#' className='text-dark underline'>
                  Forgot Password?
                </a>
              </div>
              <LoginBtn text='Sign In' />
              <div className='mt-5'>
                <p className='text-center'>
                  Don't have an account?{" "}
                  <a href='/register' className='text-main underline font-bold'>
                    Sign Up
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

export default Login;
