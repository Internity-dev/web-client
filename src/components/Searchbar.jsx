import PropTypes from "prop-types";
import { Icon } from "@iconify/react";

const Searchbar = ({ searchTerm, setSearchTerm, onFocus, onBlur }) => {
  return (
    <form action='' className='w-full'>
      <div className='relative'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4'>
          <Icon
            icon='ion:search-outline'
            width='30'
            className='h-5 w-5 text-gray-400'
          />
        </div>
        <input
          type='search'
          placeholder='Cari tempat PKL ...'
          id='search-box'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          name='keyword'
          autoComplete='off'
          className='block w-full rounded-full border-none bg-secondary py-2 pl-12 pr-3 text-xs placeholder:text-gray-500 focus:border-primary-400 focus:text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary-400 focus:placeholder:text-gray-400 sm:py-2 sm:text-sm'
        />
      </div>
    </form>
  );
};

Searchbar.propTypes = {
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default Searchbar;
