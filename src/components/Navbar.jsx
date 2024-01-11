import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Notification, Searchbar, UserProfile } from ".";
import { useStateContext } from "../context/ContextProvider";
import { useQuery } from "react-query";
import axiosClient from "../axios-client";

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

const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, setScreenSize, screenSize } =
    useStateContext();

  const { data: user, isLoading } = useQuery("user", () =>
    axiosClient.get("/me").then(({ data }) => data)
  );

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

  return (
    <div className='flex justify-between p-2 md:ml-6 md:mr-6 relative'>
      <NavButton
        title='Menu'
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      {/* {isLoading ? null : !user?.in_internship && <Searchbar />} */}
      <div className='flex'>
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
            className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg'
            onClick={() => document.getElementById("profile").showModal()}
          >
            <div className='avatar static'>
              <div className='w-8 rounded-full'>
                <img
                  src={
                    user?.avatar_url
                      ? user.avatar_url
                      : "/images/placeholder-profile.png"
                  }
                  alt={`Avatar of ${user?.name}`}
                />
              </div>
            </div>
            <p>
              <span className='text-neutral-400 text-14'>Hi,</span>{" "}
              <span className='text-neutral-400 font-bold ml-1 text-14'>
                {isLoading
                  ? "Loading..."
                  : user?.name?.split(" ")[0] || "Guest"}
              </span>
            </p>
            <MdKeyboardArrowDown className='text-neutral-400 text-14' />
          </div>
        </TooltipComponent>
        <Notification />
        <UserProfile />
      </div>
    </div>
  );
};

export default Navbar;
