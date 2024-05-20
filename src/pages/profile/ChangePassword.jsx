import React, { createRef, useEffect, useState } from "react";
import { Alert, Input, LoginBtn } from "../../components";
import axiosClient from "../../axios-client";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const oldPasswordRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const { D, data } = useMutation(
    (payload) => axiosClient.put("/change-password", payload),
    {
      onSuccess: () => {
        setMessage("Password berhasil diubah");
        setError(null);
      },
      onError: (err) => {
        const response = err.response;
        if ((response && response.status === 401) || response.status === 422) {
          setError(response.data.message);
          setMessage(null);
        }
      },
    }
  );

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      old_password: oldPasswordRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    mutate(payload);
  };

  useEffect(() => {
    if (data) {
      const timeoutId = setTimeout(() => {
        navigate("/profile");
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [data, navigate]);

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
              <Alert text={message} />
            )}
            {error && (
              <Alert text={error} error />
            )}
            <LoginBtn text='Save' />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
