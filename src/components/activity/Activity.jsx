import React from "react";
import ActivityNotification from "./ActivityNotification";
import Title from "../Title";
import { useStateContext } from "../../context/ContextProvider";

const Activity = () => {
  const { activity } = useStateContext();
  return (
    <div className='flex flex-col justify-center items-center lg:my-15 my-20'>
      <Title title='aktivitas hari ini' />
      {activity.presence && activity.presence.check_in == null ? (
        <ActivityNotification
          title='absen masuk'
          date={activity.presence.date}
          to='/'
        />
      ) : (
        activity.presence && activity.presence.check_in != null && (
          <ActivityNotification
            title='absen keluar'
            date={activity.presence.date}
            to='/'
          />
        )
      )}

      {activity.journal ? (
        <ActivityNotification
          title='laporan harian'
          date={activity.journal.date}
          to='/report'
        />
      ) : null}
    </div>
  );
};

export default Activity;
