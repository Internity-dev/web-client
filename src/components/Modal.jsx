import React, { createRef, useState } from "react";
import { Icon } from "@iconify/react";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

const Modal = ({ setMessage }) => {
  const { user, setUser } = useStateContext();
  const resumeRef = createRef();
  const [filename, setFileName] = useState("No selected file");

  const handleInputClick = () => {
    document.querySelector(".input-field").click();
  };

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      resume: resumeRef.current.files[0],
    };

    axiosClient
      .post("/resumes", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(response => {
        const newUser = {
          ...user,
          resume: response.data.resume
        };
        setUser(newUser);
        document.querySelector("#my_modal_2").close();
        setMessage("Berhasil mengupload CV");
      })
      .catch((err) => {
        const response = err.response;
        if (response && (response.status === 401 || response.status === 500)) {
          setMessage(response.data.message);
        }
      });
  };

  return (
    <dialog id='my_modal_2' className='modal'>
      <div className='modal-box flex flex-col justify-center items-center bg-lightOne dark:bg-dark'>
        <form
          className='flex flex-col justify-center items-center border-2 border-dashed border-main h-72 w-400 cursor-pointer rounded-md'
          onClick={handleInputClick}
          onSubmit={onSubmit}
          encType='multipart/form-data'
        >
          <input
            type='file'
            name='resume'
            ref={resumeRef}
            accept='.doc, .docx, .pdf'
            className='input-field'
            hidden
            onChange={({ target: { files } }) => {
              files[0] && setFileName(files[0].name);
            }}
          />
          {filename == "No selected file" ? (
            <>
              <Icon icon='ic:round-cloud-upload' color='#1191ff' width='60' />
              <p className='text-main'>Browse files to upload</p>
            </>
          ) : (
            <h1>{filename}</h1>
          )}
          <button
            type='submit'
            onClick={(e) => {
              e.stopPropagation();
            }}
            className='absolute bottom-12 right-20 bg-main text-lightOne p-2 hover:drop-shadow-xl rounded-md capitalize'
          >
            submit
          </button>
        </form>
        <section className='my-3 flex items-center py-4 px-5 rounded-md bg-slate-300 dark:bg-main-dark-bg w-400'>
          <Icon icon='pepicons-print:cv' color='#1191ff' width={30} />
          <h1 className='text-dark dark:text-lightOne'> - {filename}</h1>
        </section>
      </div>

      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
