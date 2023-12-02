import { React, createRef, useState } from "react";
import { LoginBtn, Input, LoginBanner } from "../components";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";
import { Icon } from "@iconify/react";

const Register = () => {
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const courseCodeRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
      course_code: courseCodeRef.current.value,
    };
    axiosClient
      .post("/register", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.access_token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div
      className='min-h-screen flex items-center justify-center overflow-hidden'
      style={{ backgroundImage: "linear-gradient(115deg, #1191FF, #F9F9F9)" }}
    >
      <div className='w-10/12 lg:w-8/12 bg-white rounded-xl shadow-lg overflow-hidden'>
        <div className='flex flex-col lg:flex-row'>
          <LoginBanner
            header='Welcome to Internity!'
            text='Ayo mulai karirmu!'
          />
          <div className='w-full lg:w-1/2 py-10 px-12'>
            <h2 className='text-3xl mb-4'>Sign Up</h2>
            <p className='mb-4'>Create your account</p>
            {errors &&
              Object.keys(errors).map((key) => (
                <div className='alert alert-error fixed w-auto top-16 right-10 z-50 flex' key={key}>
                  <Icon icon='mingcute:alert-fill' width={30} />
                  <p>{errors[key][0]}</p>
                </div>
              ))}
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
