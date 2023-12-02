import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { Icon } from "@iconify/react";

const UploadCv = () => {
  const [message, setMessage] = useState(null);
  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        setMessage(null);
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [message, setMessage]);
  return (
    <div className='flex flex-col justify-center items-center w-400 text-center'>
      <h1 className='text-dark transition duration-300 dark:text-lightOne text-2xl font-bold'>
        Upload CV mu yuk!
      </h1>
      <p className='text-dark transition duration-300 dark:text-lightTwo text-lg m-3'>
        Biar kami bisa kasih rekomendasi tempat magang sesuai dengan skill yang
        kamu punya, <span className='font-bold'>pastiin CV nya ATS ya :)</span>
      </p>
      <button
        className='btn btn-info'
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Upload CV
      </button>
      <Modal setMessage={setMessage} />
      {message && (
        <div
          role='alert'
          className='alert alert-success fixed w-auto top-16 right-10 z-50 flex'
        >
          <Icon icon='icon-park-solid:success' width={30} />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default UploadCv;
