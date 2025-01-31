import React from "react";
import ActivityNotification from "./ActivityNotification";
import Title from "../Title";
import useCompanyDetails from "../../hooks/useCompanyDetails";
import useActivity from "../../hooks/useActivity";

const Activity = () => {
  const { selectedCompanyId } = useCompanyDetails();

  const { data: activity } = useActivity(selectedCompanyId);
  return (
    <div className='flex flex-col justify-center items-center md:my-15 my-20'>
      <Title title='aktivitas hari ini' />
      {activity?.presence && activity.presence.check_in == null ? (
        <ActivityNotification
          title='absen masuk'
          date={activity.presence.date}
          to='/'
        />
      ) : null}

      {activity?.journal ? (
        <ActivityNotification
          title='laporan harian'
          date={activity.journal.date}
          to='/report'
        />
      ) : null}
      {!activity?.journal && !activity?.presence && (
        <div className='w-full h-40 flex justify-center items-center'>
          <h1 className='text-center font-medium transition duration-300 text-xl text-dark dark:text-lightOne capitalize'>
            belum ada aktivitas terbaru
          </h1>
        </div>
      )}
    </div>
  );
};

export default Activity;
