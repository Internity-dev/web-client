import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import axiosClient from "../axios-client.js";
import { Button } from ".";
import { Icon } from "@iconify/react";
import { useStateContext } from "../context/ContextProvider";
import { NavLink } from "react-router-dom";

const UserProfile = () => {
  const { user, setUser, setToken, setIsClicked, initialState } = useStateContext();

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  return (
    <div className='nav-item absolute right-1 top-16 bg-white transition duration-300 dark:bg-[#42464D] p-8 rounded-lg w-96'>
      <div className='flex justify-between items-center'>
        <p className='font-semibold text-lg transition duration-300 dark:text-neutral-200'>
          User Profile
        </p>
        <Button
          icon={<MdOutlineCancel />}
          color='rgb(153, 171, 180)'
          bgHoverColor='light-gray'
          size='2xl'
          borderRadius='50%'
        />
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
          onClick={() => setIsClicked(initialState)}
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
  );
};

export default UserProfile;
