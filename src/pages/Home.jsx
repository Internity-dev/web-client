import React from "react";
import {
  PresenceButton,
  UploadCv,
  Activity,
  Recommendation,
  Title,
  News,
} from "../components";
import { useStateContext } from "../context/ContextProvider";

const Home = () => {
  const { user } = useStateContext();

  return (
    <div>
      {user.in_internship ? (
        <div className='lg:my-15 my-20'>
          <div className='flex flex-col justify-center items-center'>
            <Title title='presensi' />
            <div className='flex m-3 mb-9 flex-wrap justify-center gap-1 items-center'>
              <PresenceButton name='masuk' icon='ph:sign-in-bold' to='/masuk' />
              <PresenceButton
                name='keluar'
                icon='ph:sign-out-bold'
                to='/keluar'
              />
              <PresenceButton
                name='izin'
                icon='basil:clipboard-alt-outline'
                to='/izin'
              />
              <PresenceButton
                name='kehadiran'
                icon='ic:round-list'
                to='/presence'
              />
            </div>
          </div>
          <Activity />
          <News />
        </div>
      ) : user.resume_url ? (
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
