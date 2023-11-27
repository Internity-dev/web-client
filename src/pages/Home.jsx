import React, { useEffect, useState } from "react";
import {
  PresenceButton,
  UploadCv,
  Activity,
  Recommendation,
  Title,
  News,
} from "../components";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const Home = () => {
  const { user, activity, setActivity, presence, setPresence, presences } =
    useStateContext();
  const [message, setMessage] = useState(null);
  const now = new Date();
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const onKeluar = () => {
    const payload = {
      check_out: formattedTime,
      presence_status_id: 1,
    };
    axiosClient
      .put(`/presences/${presences[0].id}`, payload)
      .then((response) => {
        const newActivity = {
          ...activity,
          presence: response.data.presence,
        };
        setPresence(response.data.presence);
        setActivity(newActivity);
        setMessage("Berhasil absen keluar");
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setPresence(null);
        }
      });
  };

  const onMasuk = () => {
    const payload = {
      check_in: formattedTime,
      presence_status_id: 1,
    };
    axiosClient
      .put(`/presences/${activity.presence.id}`, payload)
      .then((response) => {
        const newActivity = {
          ...activity,
          presence: response.data.presence,
        };
        setPresence(response.data.presence);
        setActivity(newActivity);
        setMessage("Berhasil absen masuk");
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setPresence(null);
        }
      });
  };

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        setMessage(null);
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [message, setMessage]);

  return (
    <div>
      {user.in_internship ? (
        <div className='lg:my-15 my-20'>
          <div
            className='flex flex-col justify-center items-center'
            id='presence'
          >
            <Title title='presensi' />
            <div className='flex m-3 mb-9 flex-wrap justify-center gap-1 items-center'>
              <PresenceButton
                name='masuk'
                icon='ph:sign-in-bold'
                onClick={() => onMasuk()}
                disabled={activity.presence == null ? true : false}
              />
              <PresenceButton
                name='keluar'
                icon='ph:sign-out-bold'
                onClick={() => onKeluar()}
              />
              <PresenceButton
                name='izin'
                icon='basil:clipboard-alt-outline'
                presence={presence}
              />
              <Link to='/presence'>
                <PresenceButton name='kehadiran' icon='ic:round-list' />
              </Link>
            </div>
          </div>
          <Activity />
          <News />
          {message && (
            <div
              role='alert'
              className='alert alert-success fixed w-auto top-16 right-10 z-50'
            >
              <Icon icon='icon-park-solid:success' width={30} />
              <span>{message}</span>
            </div>
          )}
        </div>
      ) : user.resume ? (
        <div>
          <News />
          <Recommendation />
        </div>
      ) : (
        <div>
          <News />
          <div className='flex items-center justify-center'>
            <UploadCv />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
