import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useStateContext } from "../context/ContextProvider";

const Sidelink = ({ name, icon, handler, to }) => {
  const { currentColor, isActive } = useStateContext();
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-neutral-700 transition duration-300 dark:text-neutral-200 transition duration-300 dark:hover:text-black hover:bg-light-gray m-2";
  return (
    <NavLink
      to={`/${to}`}
      onClick={handler}
      style={({ isActive }) => ({
        backgroundColor: isActive ? currentColor : "",
      })}
      className={({ isActive }) => (isActive ? activeLink : normalLink)}
    >
      <Icon icon={icon} className={isActive ? "text-white" : ""} width='22' />
      <span className='capitalize'>{name}</span>
    </NavLink>
  );
};

export default Sidelink;
