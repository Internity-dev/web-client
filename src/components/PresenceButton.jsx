import React from "react";
import { Icon } from "@iconify/react";

const PresenceButton = ({ name, icon, onClick, disabled }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className='bg-main h-40 text-white transition duration-300 dark:text-neutral-200 w-40 p-4 pt-9 rounded-2xl flex flex-col items-center lg:my-0 mb-6 mx-6'
      onClick={handleClick}
      disabled={disabled ? disabled : false}
    >
      <Icon icon={icon} color='#fff' width='45' />
      <p className='mt-3 text-lg font-semibold capitalize'>{name}</p>
    </button>
  );
};

export default PresenceButton;
