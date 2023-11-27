import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import { useEffect } from "react";
import { Icon } from "@iconify/react";

import { Navbar, Footer, Sidebar } from "..";
import "../../index.css";
import axiosClient from "../../axios-client";

export default function DefaultLayout() {
  const {
    token,
    setMode,
    setCurrentMode,
    currentMode,
    activeMenu,
    isLoading,
    setUser,
    setIsLoading,
    setNotifications,
    setNews,
    setVacancies,
    setActivity,
    setAppliances,
    setReports,
    setPresences,
    setRecommendations,
  } = useStateContext();

  if (!token) {
    window.location.href = "https://internity.smkn1cibinong.sch.id";
  }

  useEffect(() => {
    const storedMode = localStorage.getItem("currentMode");
    if (storedMode) {
      setCurrentMode(storedMode);
    }
  }, []);

  useEffect(() => {
    axiosClient.get("/me").then(({ data }) => {
      setUser(data);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/notifications");
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/news");
        setNews(response.data.news.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/appliances/accepted");
        const firstAppliance = response.data.appliances[0];

        if (
          firstAppliance &&
          firstAppliance.intern_date &&
          firstAppliance.intern_date.company_id
        ) {
          const todayActivitiesResponse = await axiosClient.get(
            `/today-activities?company=${firstAppliance.intern_date.company_id}`
          );
          const journalsResponse = await axiosClient.get(
            `/journals?company=${firstAppliance.intern_date.company_id}`
          );
          const presencesResponse = await axiosClient.get(
            `/presences?company=${firstAppliance.intern_date.company_id}`
          );
          setAppliances(firstAppliance);
          setActivity(todayActivitiesResponse.data);
          console.log(todayActivitiesResponse.data);
          setReports(journalsResponse.data.journals);
          setPresences(presencesResponse.data.presences);
          console.log(presencesResponse.data.presences);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/vacancies");
        setVacancies(response.data.vacancies);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className='flex relative transition duration-300 dark:bg-main-dark-bg'>
        <div className='fixed right-4 bottom-4' style={{ zIndex: "1000" }}>
          <label className='relative inline-grid select-none place-content-center cursor-pointer'>
            <input
              className='appearance-none'
              type='checkbox'
              onChange={setMode}
              checked={currentMode === "Dark"}
            />
            {currentMode === "Light" ? (
              <Icon icon='ph:sun-bold' color='#eab308' width='40' />
            ) : (
              <Icon icon='ph:moon-bold' color='#eab308' width='40' />
            )}
          </label>
        </div>
        {activeMenu ? (
          <div className='w-72 fixed sidebar transition duration-300 dark:bg-secondary-dark-bg bg-white '>
            <Sidebar />
          </div>
        ) : (
          <div className='w-0 transition duration-300 dark:bg-secondary-dark-bg'>
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "transition duration-300 dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "bg-main-bg transition duration-300 dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div className='fixed z-50 md:static bg-main-bg transition duration-300 dark:bg-main-dark-bg w-full '>
            <Navbar />
          </div>
          <div>
            {isLoading ? (
              <div className='flex items-center justify-center h-screen'>
                <span className='loading loading-spinner loading-lg'></span>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
