import PropTypes from "prop-types";

const InputDate = ({ label, name, innerRef, placeholder, value, onChange }) => {
  return (
    <div className='form-control my-2'>
      <label className='label'>
        <span className='label-text text-dark transition duration-300 dark:text-lightOne text-base'>
          {label}
        </span>
      </label>
      <input
        type='date'
        name={name}
        className='input input-bordered w-full bg-main-bg transition duration-300 dark:bg-main-dark-bg [color-scheme:light] dark:[color-scheme:dark]'
        ref={innerRef}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      />
    </div>
  );
};

InputDate.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  innerRef: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default InputDate;
