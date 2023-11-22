import { useState, useRef, useEffect } from "react";

const SkillsInput = (props) => {
  const [tags, setTags] = useState(props.tags.split(", "));
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (props.innerRef) {
      props.innerRef.current = inputRef.current;
    }
  }, [props.innerRef]);

  const removeTags = (indexToRemove) => {
    const updatedTags = [...tags];
    updatedTags.splice(indexToRemove, 1);
    setTags(updatedTags);
    props.selectedTags(updatedTags);
  };

  const addTags = (event) => {
    event.preventDefault();

    if (event.key === "Enter" && inputValue.trim() !== "") {
      const newTag = inputValue;
      const newTags = [...tags, newTag];
      setTags(newTags);
      props.selectedTags(newTags);
      setInputValue("");
    }
  };

  return (
    <div className='form-control w-full my-2'>
      <label className='label'>
        <span className='label-text text-dark transition duration-300 dark:text-lightOne text-base capitalize'>
          {props.name}
        </span>
      </label>
      <div className='flex items-center flex-wrap input input-bordered h-auto bg-main-bg transition duration-300 dark:bg-main-dark-bg'>
        <div className='flex flex-wrap justify-start items-center'>
          {tags.map((tag, index) => (
            <li
              key={index}
              className='w-auto h-8 flex justify-center items-center text-white px-2 text-sm rounded-md bg-main my-2 mr-2'
            >
              <span>{tag}</span>
              <span
                className='block w-5 h-5 leading-4 text-center text-md ml-2 text-main rounded-full bg-lightOne cursor-pointer font-bold'
                onClick={() => removeTags(index)}
              >
                x
              </span>
            </li>
          ))}
        </div>
        <input
          ref={props.innerRef}
          name={props.name}
          type='text'
          className='bg-main-bg transition duration-300 dark:bg-main-dark-bg outline-none my-2 flex-1'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={addTags}
          placeholder='Press enter to add tags'
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevent form submission on Enter key press
            }
          }}
        />
      </div>
    </div>
  );
};

export default SkillsInput;
