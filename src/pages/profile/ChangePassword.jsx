import React, { createRef, useEffect, useState } from "react";
import { Input, LoginBtn } from "../../components";
import axiosClient from "../../axios-client";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const oldPasswordRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      old_password: oldPasswordRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    axiosClient
      .put("/change-password", payload)
      .then(() => {
        setMessage("Password berhasil diubah");
        setError(null);
      })
      .catch((err) => {
        const response = err.response;
        if ((response && response.status === 401) || response.status === 422) {
          setError(response.data.message);
          setMessage(null);
        }
      });
  };

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        navigate("/profile");
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [message, navigate]);
  return (
    <div className='m-2 md:m-10 mt-24 shadow-xl transition duration-300 dark:bg-secondary-dark-bg bg-white rounded-3xl'>
      <form onSubmit={onSubmit}>
        <div className='flex flex-col'>
          <div className='mx-10 my-5'>
            <Input
              innerRef={oldPasswordRef}
              name='old_password'
              label='Old Password'
              icon='mdi:lock-outline'
              showeye
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
            {message && (
              <div
                role='alert'
                className='alert alert-success fixed w-auto top-16 right-10'
              >
                <Icon icon='icon-park-solid:success' width={30} />
                <span>{message}</span>
              </div>
            )}
            {error && (
              <div
                role='alert'
                className='alert alert-error fixed w-auto top-16 right-10'
              >
                <Icon icon='mingcute:alert-fill' width={30} />
                <span>{error}</span>
              </div>
            )}
            <LoginBtn text='Save' />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
