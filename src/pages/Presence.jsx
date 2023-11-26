import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";

const Presence = () => {
  const { user } = useStateContext();
  const [isLoading, setIsLoading] = useState(true);
  const [presence, setPresence] = useState([]);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(`/presence-statuses`);
        setPresence(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        navigate("/intern");
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [message, navigate]);

  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-dark rounded-3xl'>
      <Header category='My' title='Presences' />
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr className='border-b-dark dark:border-b-lightOne'>
              <th>No.</th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b-dark dark:border-b-lightOne'>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Presence;
