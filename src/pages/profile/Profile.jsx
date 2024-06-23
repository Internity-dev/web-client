import React from "react";
import { Info, ProfileHeader } from "../../components";
import { useStateContext } from "../../context/ContextProvider";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useQuery, useQueryClient } from "react-query";

const Profile = () => {
  const { setToken, setCurrentMode } = useStateContext();
  const queryClient = useQueryClient();
  const { data: user} = useQuery("user", () =>
    axiosClient.get("/me").then(({ data }) => data)
  );
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(user?.date_of_birth).toLocaleDateString('en-GB', options);

  const splitskills = user?.skills || "";
  const skills = splitskills.split(",");

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      queryClient.invalidateQueries("user");
      setToken(null);
      window.location.reload();
    });
  };

  return (
    <div className='m-2 md:m-10 mt-24 shadow-xl transition duration-300 dark:bg-secondary-dark-bg bg-white rounded-3xl'>
      <ProfileHeader />
      <div className='flex flex-col my-5'>
        <div className='mx-10 my-5'>
          <h1 className='text-dark transition duration-300 dark:text-lightOne text-2xl font-bold'>
            Info Saya
          </h1>
          <div className='my-5 flex flex-col flex-wrap'>
            <Info
              title={
                user?.gender === "male"
                  ? "Laki-Laki"
                  : user?.gender === "female"
                  ? "Perempuan"
                  : "-"
              }
              icon='mdi:gender-male'
            />
            <Info
              title={user?.address ? user.address : "-"}
              icon='mdi:location-on-outline'
            />
            <Info title={user?.phone ? user.phone : "-"} icon='mdi:phone' />
            <Info
              title={user?.date_of_birth ? formattedDate : "-"}
              icon='mdi:cake-variant-outline'
            />
          </div>
        </div>
        <div className='mx-10 my-5'>
          <h1 className='text-dark transition duration-300 dark:text-lightOne text-2xl font-bold'>
            Info Saya
          </h1>
          <p className='my-5 text-dark transition duration-300 dark:text-lightOne text-xl'>
            {user?.bio ? user.bio : "-"}
          </p>
        </div>
        <div className='mx-10 my-5'>
          <h1 className='text-dark transition duration-300 dark:text-lightOne text-2xl font-bold'>
            Skills
          </h1>
          {user?.skills ? (
            <div className='flex flex-wrap items-center gap-5 my-5'>
              {skills.map((skill, index) => (
                <h1
                  key={index}
                  className='bg-stone-300 p-2 text-dark rounded-2xl text-xl'
                >{`${skill}`}</h1>
              ))}
            </div>
          ) : (
            <p className='my-5 text-dark transition duration-300 dark:text-lightOne text-xl'>
              -
            </p>
          )}
        </div>
        <div className='mx-10 my-5'>
          <Link
            to='/change-password'
            className='flex justify-between items-center text-dark dark:text-lightOne dark:hover:text-black hover:bg-light-gray rounded-xl w-full h-12 mb-4'
          >
            <div className='flex justify-center items-center text-xl font-bold capitalize gap-3'>
              <Icon icon='mdi:lock-outline' width={30} />
              <h1>ganti password</h1>
            </div>
            <Icon icon='octicon:chevron-right-16' width={30} />
          </Link>
          <button
            onClick={onLogout}
            to='/change-password'
            className='flex justify-between items-center text-red-500 hover:bg-light-gray rounded-xl w-full h-12 mb-10'
          >
            <div className='flex justify-center items-center text-xl font-bold capitalize gap-3'>
              <Icon icon='ph:sign-out-bold' width={30} />
              <h1>keluar</h1>
            </div>
            <Icon icon='octicon:chevron-right-16' width={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
