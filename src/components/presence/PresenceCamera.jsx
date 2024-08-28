import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Icon } from "@iconify/react";

const PresenceCamera = ({ onClose, mutation, time, setMessage }) => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  // Convert base64 string to Blob
  const base64ToBlob = (base64, mime) => {
    const byteString = atob(base64.split(",")[1]);
    const mimeString = mime || base64.split(";")[0].split(":")[1];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webcamRef]);

  const onSubmit = (ev) => {
    ev.preventDefault(); // Prevent the default form submission behavior

    const blob = base64ToBlob(imageSrc, "image/jpeg");
    const file = new File([blob], "capture.jpg", { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("check_in", time);
    formData.append("attachment", file); // Use the File object
    formData.append("presence_status_id", 1);

    mutation.mutate(formData);
    document.getElementById("checkin").close();
    setMessage("Berhasil absen masuk!");
  };

  return (
    <dialog id='checkin' className='modal'>
      <div className='modal-box bg-lightOne dark:bg-dark'>
        <div className='flex justify-between items-center mb-3'>
          <h3 className='font-bold text-lg'>Absen Masuk</h3>
          <form method='dialog'>
            <button
              className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray rounded-full'
              onClick={onClose}
            >
              <Icon icon='ic:round-close' color='#99abb4' />
            </button>
          </form>
        </div>

        {imageSrc ? (
          <img src={imageSrc} alt='Captured' />
        ) : (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat='image/jpeg'
              width={640}
              height={480}
              mirrored={false}
            />
          </>
        )}
        <div className='modal-action'>
          <form onSubmit={onSubmit} method='dialog'>
            {imageSrc ? (
              <div>
                <button
                  className='btn bg-red-700 text-lightOne hover:drop-shadow-xl rounded-md'
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageSrc(null);
                  }}
                >
                  Retake photo
                </button>
                <button
                  type='submit'
                  className='btn bg-main text-lightOne hover:drop-shadow-xl rounded-md'
                >
                  submit
                </button>
              </div>
            ) : (
              <button
                type='button'
                className='btn bg-main text-lightOne hover:drop-shadow-xl rounded-md'
                onClick={(e) => {
                  e.stopPropagation();
                  capture();
                }}
              >
                Take photo
              </button>
            )}
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default PresenceCamera;
