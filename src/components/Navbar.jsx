import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Notification, Searchbar, UserProfile } from ".";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { Icon } from "@iconify/react";
import SearchResult from "./SearchResult";
import useUser from "../hooks/useUser";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position='BottomCenter'>
    <button
      type='button'
      onClick={() => customFunc()}
      style={{ color }}
      className='relative text-xl rounded-full p-3 hover:bg-light-gray'
    >
      <span
        style={{ background: dotColor }}
        className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = ({ mobileSearch, setMobileSearch }) => {
  const { currentColor, activeMenu, setActiveMenu, setScreenSize, screenSize } =
    useStateContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { data: user } = useUser();

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults(null);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await axiosClient.get(`/search/${searchTerm}`);
        setSearchResults(data.vacancies);
      } catch (err) {
        const response = err.response;
        if (response) {
          setError(response.data.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  return (
    <nav className='w-full bg-main-bg dark:bg-main-dark-bg'>
      <div className='mx-auto max-w-7xl px-4 sm:items-center sm:px-6 lg:px-8'>
        <div className='relative flex items-center justify-between py-1.5 lg:gap-4 lg:py-2'>
          <NavButton
            title='Menu'
            customFunc={handleActiveMenu}
            color={currentColor}
            icon={<AiOutlineMenu />}
          />
          <div className='mx-auto hidden w-full sm:block md:px-8 lg:px-0 xl:col-span-6 xl:w-full'>
            <div className='flex items-center md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0'>
              <Searchbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
              />
            </div>
          </div>
          {user && (
            <div className='flex justify-center items-center'>
              <div className='flex items-center space-x-5 lg:hidden hover:bg-light-gray rounded-full p-2'>
                <div className='h-6 sm:hidden'>
                  {mobileSearch ? (
                    <button onClick={() => setMobileSearch(false)}>
                      <Icon
                        icon='ic:round-close'
                        width='30'
                        className='h-7 w-7'
                        color={currentColor}
                      />
                    </button>
                  ) : (
                    <button onClick={() => setMobileSearch(true)}>
                      <Icon
                        icon='ion:search-outline'
                        width='30'
                        className='h-6 w-6'
                        color={currentColor}
                      />
                    </button>
                  )}
                </div>
              </div>
              <NavButton
                title='Notification'
                dotColor='rgb(254, 201, 15)'
                customFunc={() =>
                  document.getElementById("notifications").showModal()
                }
                color={currentColor}
                icon={<RiNotification3Line />}
              />
              <TooltipComponent content='Profile' position='BottomCenter'>
                <div
                  className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-full'
                  onClick={() => document.getElementById("profile").showModal()}
                >
                  <div className='avatar static'>
                    <div className='w-8 rounded-full'>
                      <img
                        src={
                          user?.avatar_url
                            ? user.avatar_url
                            : `https://ui-avatars.com/api/?name=${user?.name}&amp;background=277bc0&amp;color=fff`
                        }
                        alt={`Avatar of ${user?.name}`}
                      />
                    </div>
                  </div>
                </div>
              </TooltipComponent>
              <Notification />
              <UserProfile />
            </div>
          )}
        </div>
        {mobileSearch ? (
          <div className='block pb-2 sm:hidden mx-auto w-full md:px-8 lg:px-0 xl:col-span-6 xl:w-full'>
            <div className='opacity-100'>
              <div className='flex items-center md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0'>
                <Searchbar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className='hidden sm:block mx-auto w-full md:px-8 lg:px-0'></div>
        )}
        {isSearchFocused && (
          <SearchResult
            results={searchResults}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
