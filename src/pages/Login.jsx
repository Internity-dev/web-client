import { React, createRef, useEffect, useState } from "react";
import { LoginBtn, Input, LoginBanner, Alert } from "../components";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

const Login = () => {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setToken(data.access_token);
      })
      .catch((err) => {
        const response = err.response;
        if (
          (response && response.status === 401) ||
          (response && response.status === 422)
        ) {
          setErrors(response.data.message);
        }
      });
  };

  useEffect(() => {
    if (errors) {
      const timeoutId = setTimeout(() => {
        setErrors(null);
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [errors, setErrors]);

  return (
    <div
      className='min-h-screen flex items-center justify-center overflow-hidden'
      style={{ backgroundImage: "linear-gradient(115deg, #1191FF, #F9F9F9)" }}
    >
      <div className='w-11/12 lg:w-8/12 bg-white rounded-xl shadow-lg overflow-hidden my-5'>
        <div className='flex flex-col sm:flex-row'>
          <LoginBanner header='Welcome back!' text='Continue your internship' />
          <div className='w-full lg:w-1/2 py-5 px-12'>
            <h2 className='text-xl md:text-2xl mb-1'>Sign In</h2>
            <p className='mb-5 text-lg'>Sign in to your account</p>
            {errors && <Alert text={errors} error />}
            <form onSubmit={onSubmit} method='POST'>
              <Input
                innerRef={emailRef}
                name='email'
                label='Email'
                icon='tabler:mail'
              />
              <Input
                innerRef={passwordRef}
                name='password'
                label='Password'
                icon='mdi:lock-outline'
                showeye
              />
              <div className='mt-5'>
                <a
                  href='https://wa.me/6282112631356?text=Halo%20min%2C%20tolong%20reset%20password%20saya%20atas%20nama%20(nama%20anda)'
                  target='blank'
                  className='text-dark underline'
                >
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
