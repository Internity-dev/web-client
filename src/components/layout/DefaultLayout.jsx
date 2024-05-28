import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Navbar, Footer, Sidebar } from "..";
import "../../index.css";

export default function DefaultLayout() {
  const [mobileSearch, setMobileSearch] = useState(false);
  const {
    token,
    setMode,
    setCurrentMode,
    currentMode,
    activeMenu
  } = useStateContext();

  if (!token) {
    return <Navigate to='/login' />;
  }

  useEffect(() => {
    const storedMode = localStorage.getItem("currentMode");
    if (storedMode) {
      setCurrentMode(storedMode);
    }
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
          <div
            className={`${
              mobileSearch ? "ease-in mb-11" : "ease-out"
            } z-50 bg-main-bg dark:bg-main-dark-bg transition-all duration-1000`}
          >
            <Navbar
              mobileSearch={mobileSearch}
              setMobileSearch={setMobileSearch}
            />
          </div>
            <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
}
