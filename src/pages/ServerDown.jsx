import React from "react";

const ServerDown = () => {
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <div className='flex flex-col items-center gap-6'>
        <img src='images/logo-internity.png' width={200} alt='' />
        <h1 className='text-2xl font-bold'>
          Server sedang down. Kembali lagi saat server sudah pulih.
        </h1>
      </div>
    </div>
  );
};

export default ServerDown;
