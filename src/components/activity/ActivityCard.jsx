import { Icon } from "@iconify/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ActivityCard = ({ icon, date, title, bg, color, filterKey, to }) => {
  return (
    <Link
      to={to}
      className={`filter-item ${filterKey} flex my-3 justify-start gap-1 items-center w-full h-20 text-neutral-700 dark:text-neutral-200 dark:hover:text-black hover:bg-light-gray rounded-xl transition duration-0 overflow-hidden`}
    >
      <div className='flex items-center md:ml-16 ml-5'>
        <div className='flex gap-5'>
          <div
            className='p-3 rounded-full'
            style={{ color: color, backgroundColor: bg }}
          >
            <Icon icon={icon} width={30} />
          </div>
          <div className='flex flex-col capitalize justify-center'>
            <h1 className='font-bold'>{title}</h1>
            <p className='text-sm'>{date}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

ActivityCard.propTypes = {
  icon: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  bg: PropTypes.string,
  color: PropTypes.string,
  filterKey: PropTypes.string,
  to: PropTypes.string,
};

export default ActivityCard;
