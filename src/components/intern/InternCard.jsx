import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { NavLink } from "react-router-dom";
import axiosClient from "../../axios-client";
import Alert from "../Alert";

const InternCard = ({ vacancy, icon }) => {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const onSave = (e) => {
    e.preventDefault();

    const payload = {
      vacancy_id: vacancy?.id,
    };

    axiosClient
      .post("/savedvacancies", payload)
      .then((response) => {
        queryClient.invalidateQueries("savedvacancies");
        queryClient.invalidateQueries("vacancies");
        setMessage(response.data.message);
      })
      .catch((err) => {
        const response = err.response;
        if (
          response &&
          (response.status === 401 ||
            response.status === 500 ||
            response.status === 403)
        ) {
          setError(response.data.message);
        }
      });
  };

  const onUnsave = (e) => {
    e.preventDefault();

    axiosClient
      .delete(`/savedvacancies/${vacancy.id}`)
      .then((response) => {
        queryClient.invalidateQueries("savedvacancies");
        queryClient.invalidateQueries("vacancies");
        setMessage(response.data.message);
      })
      .catch((err) => {
        const response = err.response;
        if (
          response &&
          (response.status === 401 ||
            response.status === 500 ||
            response.status === 403)
        ) {
          setError(response.data.message);
        }
      });
  };

  useEffect(() => {
    if (message || error) {
      const timeoutId = setTimeout(() => {
        setMessage(null)
        setError(null)
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [message, error, setMessage, setError]);

  return (
    <>
      {message && <Alert text={message} />}
      {error && <Alert text={error} error />}
      <NavLink
        to={`/vacancy/${vacancy.id}`}
        className='flex m-3 flex-wrap justify-between gap-1 items-center w-[22rem] md:w-800 min-h-[7rem] h-auto text-neutral-700 dark:text-neutral-200 transition duration-300 dark:hover:text-black hover:bg-light-gray rounded-xl'
      >
        <div className='flex items-center ml-5 w-64 md:w-auto'>
          <img src={vacancy.company.logo_url} alt='' className='w-20 md:w-24' />
          <div className='ml-3 leading-5'>
            <h1 className='font-bold capitalize text-lg leading-none'>
              {vacancy.name}
            </h1>
            <p className='capitalize one-line'>{vacancy.company.name}</p>
            <p className='capitalize'>
              {vacancy.company.city}, {vacancy.company.state}
            </p>
            <p className='capitalize text-main text-sm font-medium'>
              {vacancy.applied} Pendaftar
            </p>
          </div>
        </div>
        <Icon
          icon={icon}
          width={40}
          className='mr-5'
          onClick={vacancy.is_saved ? onUnsave : onSave}
        />
      </NavLink>
    </>
  );
};

export default InternCard;
