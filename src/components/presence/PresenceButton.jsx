import PropTypes from "prop-types";
import { Icon } from "@iconify/react";

const PresenceButton = ({ name, icon, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className='bg-main h-32 w-32 lg:h-40 lg:w-40 text-white transition duration-300 dark:text-neutral-200 p-4 pt-9 rounded-2xl flex flex-col items-center lg:my-0 mb-2 mx-2 lg:mb-6 lg:mx-6'
      onClick={handleClick}
    >
      <Icon icon={icon} color='#fff' width='45' />
      <p className='mt-3 text-lg font-semibold capitalize'>{name}</p>
    </button>
  );
};

PresenceButton.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default PresenceButton;
