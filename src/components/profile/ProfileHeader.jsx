import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import Modal from "../Modal";
import axiosClient from "../../axios-client";
import Alert from "../Alert";

const ProfileHeader = () => {
  const { data: user} = useQuery("user", () =>
    axiosClient.get("/me").then(({ data }) => data)
  );

  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        setMessage(null);
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [message, setMessage]);

  return (
    <div className='w-full bg-main rounded-3xl flex flex-col'>
      <div className='my-6 flex flex-col justify-center items-center'>
        <div className='avatar static'>
          <div className='w-28 rounded-full'>
            <img src={user?.avatar_url ? user.avatar_url : '/images/placeholder-profile.png'} alt={`Avatar of ${user?.name}`} />
          </div>
        </div>
        <div className='text-lightOne mt-5 text-center'>
          <h1 className='capitalize text-2xl font-bold'>{user?.name}</h1>
          <h1 className='text-lg'>{user?.email}</h1>
        </div>
        <div className='flex mt-5 gap-5'>
          <NavLink
            to='/change-profile'
            className='flex text-lightOne justify-center items-center'
          >
            <Icon icon='mdi:pencil' width={27} />
            <h1 className='underline text-lg font-bold'>Edit Profile</h1>
          </NavLink>
          <button
            className='flex text-lightOne justify-center items-center'
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            <Icon icon='mdi:file-edit-outline' width={27} />
            <h1 className='underline text-lg font-bold'>Edit CV</h1>
          </button>
          <Modal setMessage={setMessage} />
          {message && (
            <Alert text={message} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
