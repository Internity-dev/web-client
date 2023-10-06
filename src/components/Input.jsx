import React, { useState } from "react";

const Input = ({ label, icon, showEye }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState(showEye ? 'password' : 'text')

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(inputValue !== "");
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    setInputType(isPasswordVisible ? "password" : "text");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={`input-div mt-0 grid-cols-10 ${isFocus ? "focus" : ""}`}>
      <div className='col-span-1 flex justify-center items-center text-gray transition duration-300'>{icon}</div>
      <div className='div col-span-8'>
        <h5>{label}</h5>
        <input
          type={inputType}
          className='input'
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleInputChange}
          value={inputValue}
        />
      </div>
      <div className='col-span-1 flex justify-center items-center'>
        {showEye && (
          <button type='button' onClick={togglePasswordVisibility}>
            <img src={isPasswordVisible ? "images/eye-open.svg" : "images/eye-close.svg"} alt='' width='20' />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
