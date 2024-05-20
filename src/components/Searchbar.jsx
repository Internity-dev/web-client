import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import axiosClient from "../axios-client";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSearchResults = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.get(`/search/${searchTerm}`);
      console.log(response.data)
    } catch (err) {
      const response = err.response;
      if (
        response &&
        (response.status === 401 ||
          response.status === 500 ||
          response.status === 403)
      ) {
        setError(response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <form
      action=''
      className='md:w-[30rem] w-52 h-10 overflow-hidden flex items-center rounded-full bg-lightOne transition duration-300 dark:bg-main-dark-bg border border-gray'
    >
      <div className='relative w-full'>
        <input
          type='search'
          name=''
          placeholder='cari tempat PKL...'
          id='search-box'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='md:text-xl text-xs px-5 w-full h-full transform-none rounded-full bg-lightOne dark:bg-main-dark-bg text-neutral-700 dark:text-neutral-200 outline-none placeholder-neutral-700 transition duration-300 dark:placeholder-neutral-200'
        />
        <div className='absolute inset-y-0 flex items-center pl-2 pointer-events-none'></div>
      </div>
      <Icon
        icon='ic:baseline-search'
        width='30'
        className='mr-6 text-neutral-700 transition duration-300 dark:text-neutral-200 cursor-pointer'
      />
    </form>
  );
};

export default Searchbar;
