import React from "react";
import axiosClient from "../axios-client.js";
import { Icon } from "@iconify/react";
import { useStateContext } from "../context/ContextProvider";
import { NavLink } from "react-router-dom";

const UserProfile = () => {
  const { user, setUser, setToken } =
    useStateContext();

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  return (
    <dialog id='profile' className='modal'>
      <div className='modal-box bg-white dark:bg-[#42464D] w-96 absolute top-16 right-5 transition duration-300'>
        <div className='flex justify-between items-center'>
          <p className='font-semibold text-lg transition duration-300 dark:text-neutral-200'>
            User Profile
          </p>
          <form method='dialog'>
            <button
              className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray rounded-full'
            >
              <Icon icon='ic:round-close' color='#99abb4' />
            </button>
          </form>
        </div>
        <div className='flex gap-5 items-center mt-6 border-color border-b-1 pb-6'>
          <img
            className='rounded-full h-24 w-24'
            src={user.avatar_url}
            alt='user-profile'
          />
          <div>
            <p className='font-semibold text-xl transition duration-300 dark:text-neutral-200'>
              {" "}
              {user.name}{" "}
            </p>
            <p className='text-neutral-500 text-sm transition duration-300 dark:text-neutral-400'>
              {" "}
              {user.in_internship ? "Intern" : "Pre Intern"}{" "}
            </p>
            <p className='text-neutral-500 text-sm font-semibold transition duration-300 dark:text-neutral-400'>
              {" "}
              rafie0917@gmail.com{" "}
            </p>
          </div>
        </div>
        <div>
          <NavLink
            to='/profile'
            onClick={() => document.getElementById("profile").close()}
            className='flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  transition duration-300 dark:hover:bg-[#42464D]'
          >
            <button
              type='button'
              style={{ color: "#03C9D7", backgroundColor: "#E5FAFB" }}
              className=' text-xl rounded-lg p-3 hover:bg-light-gray'
            >
              <Icon icon='mdi:user-outline' width='25' />
            </button>

            <div>
              <p className='font-semibold transition duration-300 dark:text-neutral-200 '>
                My Profile
              </p>
              <p className='text-neutral-500 text-sm transition duration-300 dark:text-neutral-400'>
                {" "}
                Account Settings{" "}
              </p>
            </div>
          </NavLink>
        </div>
        <div className='mt-5'>
          <button
            className='w-full rounded-xl bg-main text-white p-3 hover:drop-shadow-xl'
            onClick={onLogout}
          >
            logout
          </button>
        </div>
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  );
};

export default UserProfile;
