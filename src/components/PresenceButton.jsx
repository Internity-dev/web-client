import React from "react";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

const PresenceButton = ({ name, icon, to }) => {
  return (
    <NavLink
      to={to}
      className='bg-main h-40 text-white transition duration-300 dark:text-neutral-200 w-40 p-4 pt-9 rounded-2xl flex flex-col items-center lg:my-0 mb-6 mx-6'
    >
      <Icon icon={icon} color='#fff' width='45' />
      <p className='mt-3 text-lg font-semibold capitalize'>{name}</p>
    </NavLink>
  );
};

export default PresenceButton;
