import { useQuery } from "react-query";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

const Notification = () => {

  const { data: unreads = [] } = useQuery(
    "unreads",
    async () => {
      const response = await axiosClient.get("/notifications");
      const filteredNotifications = response.data.notifications.filter(
        (notification) => notification.read_at === null
      );
      return filteredNotifications;
    }
  );

  return (
    <dialog id='notifications' className='modal'>
      <div className='modal-box bg-white dark:bg-[#42464D] md:w-96 absolute top-16 right-5 transition duration-300'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-2'>
            <p className='font-semibold text-lg transition duration-300 dark:text-neutral-200'>
              Notifications
            </p>
            <Link
              to='/notifications'
              className='text-dark dark:text-lightOne text-xs rounded p-1 px-2 bg-orange-theme '
              onClick={() => document.getElementById("notifications").close()}
            >
              {unreads.length > 99 ? (
                <p>99+ Unread Message</p>
              ) : (
                <p>{unreads.length} Unread Message</p>
              )}
            </Link>
          </div>
          <form method='dialog'>
            <button className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray rounded-full'>
              <Icon icon='ic:round-close' color='#99abb4' />
            </button>
          </form>
        </div>
        <div className='mt-5 '>
          {unreads.slice(0, 3).map((notification) => (
            <div
              key={notification.id}
              className='flex items-center leading-8 gap-4 border-b-1 border-color p-3'
            >
              <div className='p-3 rounded-full bg-main text-lightOne'>
                <Icon icon='mi:notification' width={30} />
              </div>
              <div>
                <p className='font-semibold transition duration-300 dark:text-neutral-200 leading-snug'>
                  {notification.title}
                </p>
                <p className='text-neutral-500 text-sm transition duration-300 dark:text-neutral-400 three-line'>
                  {" "}
                  {notification.body}{" "}
                </p>
              </div>
            </div>
          ))}
          <div className='mt-5 flex text-center'>
            <Link
              to='/notifications'
              className='p-3 w-full hover:drop-shadow-xl bg-main text-lightOne rounded-xl'
              onClick={() => document.getElementById("notifications").close()}
            >
              See all notifications
            </Link>
          </div>
        </div>
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Notification;
