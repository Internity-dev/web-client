import React, { useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from ".";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { Icon } from "@iconify/react";

const Notification = () => {
  const { currentColor, notifications } = useStateContext();

  return (
    <div className='nav-item absolute right-5 md:right-40 top-16 bg-white transition duration-300 dark:bg-[#42464D] p-8 rounded-lg w-96'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-3'>
          <p className='font-semibold text-lg transition duration-300 dark:text-neutral-200'>
            Notifications
          </p>
          <button
            type='button'
            className='text-white text-xs rounded p-1 px-2 bg-orange-theme '
          >
            99+ Unread Message
          </button>
        </div>
        <Button
          icon={<MdOutlineCancel />}
          color='rgb(153, 171, 180)'
          bgHoverColor='light-gray'
          size='2xl'
          borderRadius='50%'
        />
      </div>
      <div className='mt-5 '>
        {notifications.slice(0, 3).map((notification) => (
          <div
            key={notification.id}
            className='flex items-center leading-8 gap-4 border-b-1 border-color p-3'
          >
            <div
              className='p-3 rounded-full bg-main text-lightOne'
            >
              <Icon icon='mi:notification' width={30} />
            </div>
            <div>
              <p className='font-semibold transition duration-300 dark:text-neutral-200'>
                {notification.title}
              </p>
              <p className='text-neutral-500 text-sm transition duration-300 dark:text-neutral-400'>
                {" "}
                {notification.body}{" "}
              </p>
            </div>
          </div>
        ))}
        <div className='mt-5'>
          <Button
            color='white'
            bgColor={currentColor}
            text='See all notifications'
            borderRadius='10px'
            width='full'
          />
        </div>
      </div>
    </div>
  );
};

export default Notification;
