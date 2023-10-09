import {React, createRef, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { LoginBtn, Input, LoginBanner } from "../components";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

const Login = () => {
  const emailRef = createRef()
  const passwordRef = createRef()
  const { setUser, setToken } = useStateContext()
  const [message, setMessage] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.access_token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message)
        }
      })
  }

  return (
    <div
      className='min-h-screen flex items-center justify-center overflow-hidden'
      style={{ backgroundImage: "linear-gradient(115deg, #1191FF, #F9F9F9)" }}
    >
      <div className='w-10/12 lg:w-8/12 bg-white rounded-xl shadow-lg overflow-hidden'>
        <div className='flex flex-col lg:flex-row'>
          <LoginBanner header="Welcome back" text="Continue your internship" />
          <div className='w-full lg:w-1/2 py-10 px-12'>
            <h2 className='text-3xl mb-4'>Sign In</h2>
            <p className='mb-4'>Sign in to your account</p>
            {message &&
            <div className="alert">
              <p>{message}</p>
            </div>
            }
            <form onSubmit={onSubmit} method="POST">
              <Input innerRef={emailRef} name='email' label='Email' icon={<FontAwesomeIcon icon={faEnvelope} showeye='false' />} />
              <Input innerRef={passwordRef} name='password' label='Password' icon={<FontAwesomeIcon icon={faLock} />} showeye />
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
