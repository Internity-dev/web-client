import React, { createRef, useState } from "react";
import { Icon } from "@iconify/react";

const ExcuseModal = ({mutation, time, setMessage}) => {
  const descriptionRef = createRef();
  const attachmentRef = createRef();
  const [description, setDescription] = useState("");
  const [id, setId] = useState(3);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const formData = new FormData();
    formData.append("check_in", time);
    formData.append("attachment", attachmentRef.current.files[0]);
    formData.append("description", descriptionRef.current.value);
    formData.append("presence_status_id", id);

    mutation.mutate(formData);
    document.getElementById("izin").close();
    setMessage("Berhasil izin!");
  };

  return (
    <dialog id='izin' className='modal'>
      <div className='modal-box bg-lightOne dark:bg-dark'>
        <div className='flex justify-between items-center'>
          <h3 className='font-bold text-lg'>Izin</h3>
          <form method='dialog'>
            <button className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray rounded-full'>
              <Icon icon='ic:round-close' color='#99abb4' />
            </button>
          </form>
        </div>
        <form onSubmit={onSubmit} encType='multipart/form-data'>
          <div className='flex items-center gap-5'>
            <div className='form-control'>
              <label className='label cursor-pointer'>
                <span className='label-text mr-3'>Izin</span>
                <input
                  type='radio'
                  name='radio-10'
                  className='radio checked:bg-red-500'
                  onChange={() => setId(3)}
                  checked={id === 3}
                />
              </label>
            </div>
            <div className='form-control'>
              <label className='label cursor-pointer'>
                <span className='label-text mr-3'>Sakit</span>
                <input
                  type='radio'
                  name='radio-10'
                  className='radio checked:bg-blue-500'
                  onChange={() => setId(4)}
                />
              </label>
            </div>
          </div>
          <label className='form-control w-full'>
            <label className='label'>
              <span className='label-text text-dark transition duration-300 dark:text-lightOne text-base'>
                Lampiran
              </span>
            </label>
            <input
              type='file'
              name='attachment'
              accept='image/*'
              className='file-input file-input-bordered w-full'
              ref={attachmentRef}
            />
          </label>
          <div className='form-control my-2'>
            <label className='label'>
              <span className='label-text text-dark transition duration-300 dark:text-lightOne text-base'>
                Keterangan
              </span>
            </label>
            <textarea
              name='description'
              className='textarea textarea-bordered h-24 bg-main-bg transition duration-300 dark:bg-main-dark-bg text-base'
              ref={descriptionRef}
              placeholder='Masukkan Keterangan'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button
            type='submit'
            onClick={(e) => {
              e.stopPropagation();
              document.getElementById("notifications").close();
            }}
            className='bg-main text-lightOne p-2 hover:drop-shadow-xl rounded-md capitalize'
          >
            submit
          </button>
        </form>
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ExcuseModal;
