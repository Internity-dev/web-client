import { React, createRef, useEffect, useState } from "react";
import { LoginBtn, Input, LoginBanner, Alert } from "../components";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

const Register = () => {
  const nameRef = createRef();
  const emailRef = createRef();
  const phoneRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const courseCodeRef = createRef();
  const { setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
      course_code: courseCodeRef.current.value,
    };
    axiosClient
      .post("/register", payload)
      .then(({ data }) => {
        setToken(data.access_token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.data && response.data.errors) {
          setErrors(response.data.errors);
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
      <div className='w-11/12 md:w-8/12 bg-white rounded-xl shadow-lg overflow-hidden my-5'>
        <div className='flex flex-col lg:flex-row'>
          <LoginBanner
            header='Welcome to Internity'
            text='Ayo mulai karirmu!'
          />
          <div className='w-full lg:w-1/2 py-5 px-12'>
            <h2 className='text-xl md:text-2xl mb-1'>Sign Up</h2>
            <p className='mb-5 md:text-lg'>Create your account</p>
            {errors &&
              Object.keys(errors).map((key, index) =>
                errors[key].map((error, idx) => (
                  <Alert
                    key={`${key}-${idx}`}
                    text={error}
                    error
                    index={index + idx}
                  />
                ))
              )}
            <form onSubmit={onSubmit} method='POST'>
              <Input
                innerRef={nameRef}
                name='name'
                label='Name'
                icon='mdi:user'
              />
              <Input
                type='email'
                innerRef={emailRef}
                name='email'
                label='Email'
                icon='tabler:mail'
              />
              <Input
                type='number'
                innerRef={phoneRef}
                name='phone'
                label='Phone Number'
                icon='tabler:phone'
              />
              <Input
                innerRef={passwordRef}
                name='password'
                label='Password'
                icon='mdi:lock-outline'
                showeye
              />
              <Input
                innerRef={passwordConfirmationRef}
                name='password_confirmation'
                label='Confirm Password'
                icon='mdi:lock-outline'
                showeye
              />
              <Input
                innerRef={courseCodeRef}
                name='course_code'
                label='Course Code'
                icon='tabler:code'
              />
              <div className='mt-5'>
                <input
                  type='checkbox'
                  className='border border-gray-400 mr-2'
                  name='terms'
                  id='terms'
                  required
                />
                <label htmlFor='terms'>
                  I accept the{" "}
                  <label className='text-main font-semibold'>Terms</label> &{" "}
                  <label className='text-main font-semibold'>Conditions</label>
                </label>
              </div>
              <LoginBtn text='Sign Up' />
              <div className='mt-5'>
                <p className='text-center'>
                  Already have an account?{" "}
                  <Link to='/' className='text-main underline font-bold'>
                    Sign In
                  </Link>
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
