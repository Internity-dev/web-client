import React from "react";
import ActivityNotification from "./ActivityNotification";
import Title from "../Title";
import { useQuery } from "react-query";
import axiosClient from "../../axios-client";

const Activity = () => {
  const { data: companyDetails } = useQuery("companyDetails", async () => {
    const response = await axiosClient.get("/appliances/accepted");
    return response.data.appliances[0];
  });

  const { data: activity } = useQuery(
    ["activity", companyDetails?.intern_date.company_id],
    async () => {
      const response = await axiosClient.get(
        `/today-activities?company=${companyDetails?.intern_date.company_id}`
      );
      return response.data;
    },
    { enabled: !!companyDetails?.intern_date.company_id }
  );
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
