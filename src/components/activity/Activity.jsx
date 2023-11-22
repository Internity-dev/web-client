import React from "react";
import ActivityNotification from "./ActivityNotification";
import Title from "../Title";

const Activity = () => {
  return (
    <div className='flex flex-col justify-center items-center lg:my-15 my-20'>
      <Title title='aktivitas hari ini' />
      <ActivityNotification
        title='absen masuk'
        date='12 Januari 2022 08:20'
        to='/'
      />
      <ActivityNotification
        title='laporan harian'
        date='12 Januari 2022 08:20'
        to='/'
      />
    </div>
  );
};

export default Activity;
