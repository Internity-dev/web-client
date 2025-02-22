import PropTypes from "prop-types";

const InputText = ({
  name,
  label,
  placeholder,
  type,
  innerRef,
  value,
  onChange,
}) => {
  return (
    <div className='form-control w-full my-2'>
      <label className='label'>
        <span className='label-text text-dark transition duration-300 dark:text-lightOne text-base capitalize'>
          {label}
        </span>
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        ref={innerRef}
        value={value}
        onChange={onChange}
        className='input input-bordered w-full bg-main-bg transition duration-300 dark:bg-main-dark-bg'
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      />
    </div>
  );
};

InputText.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  innerRef: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default InputText;
