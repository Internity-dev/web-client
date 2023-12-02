import React, { useEffect, useState } from "react";
import {
  PresenceButton,
  UploadCv,
  Activity,
  Recommendation,
  Title,
  News,
  PresenceModal,
} from "../components";
import { useStateContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import axiosClient from "../axios-client";

const Home = () => {
  const { setPresence } = useStateContext();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(null);
  const now = new Date();
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const userQueryKey = "user";
  const companyDetailsQueryKey = "companyDetails";
  const activityQueryKey = ["activity", companyDetails?.intern_date.company_id];
  const presencesQueryKey = [
    "presences",
    companyDetails?.intern_date.company_id,
  ];

  const { data: user } = useQuery(userQueryKey, () =>
    axiosClient.get("/me").then(({ data }) => data)
  );

  const { data: fetchedCompanyDetails } = useQuery(
    companyDetailsQueryKey,
    async () => {
      const response = await axiosClient.get("/appliances/accepted");
      return response.data.appliances[0];
    }
  );

  useEffect(() => {
    if (fetchedCompanyDetails) {
      setCompanyDetails(fetchedCompanyDetails);
    }
  }, [fetchedCompanyDetails]);

  const { data: activity } = useQuery(
    activityQueryKey,
    async () => {
      const response = await axiosClient.get(
        `/today-activities?company=${fetchedCompanyDetails?.intern_date.company_id}`
      );
      return response.data;
    },
    { enabled: !!fetchedCompanyDetails?.intern_date.company_id }
  );

  const { data: presences } = useQuery(
    presencesQueryKey,
    async () => {
      const response = await axiosClient.get(
        `/presences?company=${fetchedCompanyDetails?.intern_date.company_id}`
      );
      return response.data.presences;
    },
    { enabled: !!fetchedCompanyDetails?.intern_date.company_id }
  );

  const presenceMutation = useMutation(
    (payload) => axiosClient.put(`/presences/${activity.presence.id}`, payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("activity");
        queryClient.invalidateQueries(presencesQueryKey);
      },
      onError: (err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setPresence(null);
        }
      },
    }
  );

  const keluarMutation = useMutation(
    (payload) => axiosClient.put(`/presences/${presences[0].id}`, payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("activity");
        queryClient.invalidateQueries(presencesQueryKey);
      },
      onError: (err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setPresence(null);
        }
      },
    }
  );

  const onKeluar = () => {
    const payload = {
      check_out: formattedTime,
      presence_status_id: 1,
    };
    keluarMutation.mutate(payload);
    setMessage("Berhasil absen keluar!");
  };

  const onIzin = () => {
    const payload = {
      check_in: formattedTime,
      presence_status_id: 3,
    };
    presenceMutation.mutate(payload);
    setMessage("Berhasil izin!");
  };

  const onMasuk = () => {
    const payload = {
      check_in: formattedTime,
      presence_status_id: 1,
    };
    presenceMutation.mutate(payload);
    setMessage("Berhasil absen!");
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
      {user?.in_internship ? (
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
                onClick={() =>
                  activity?.presence == null
                    ? document.getElementById("absen").showModal()
                    : onMasuk()
                }
              />
              <PresenceButton
                name='keluar'
                icon='ph:sign-out-bold'
                onClick={() =>
                  activity?.presence == null && presences[0].check_out == null
                    ? onKeluar()
                    : activity.presence
                    ? document.getElementById("masuk").showModal()
                    : document.getElementById("keluar").showModal()
                }
              />
              <PresenceButton
                name='izin'
                icon='basil:clipboard-alt-outline'
                onClick={() =>
                  activity.presence == null
                    ? document.getElementById("absen").showModal()
                    : onIzin()
                }
              />
              <Link to='/presence'>
                <PresenceButton name='kehadiran' icon='ic:round-list' />
              </Link>
            </div>
            <PresenceModal id='absen' message='Anda sudah absen hari ini!' />
            <PresenceModal id='masuk' message='Silakan absen masuk dahulu' />
            <PresenceModal
              id='keluar'
              message='Anda sudah absen keluar hari ini!'
            />
          </div>
          <Activity />
          <News />
          {message && (
            <div
              role='alert'
              className='alert alert-success fixed w-auto top-16 right-10 z-50 flex'
            >
              <Icon icon='icon-park-solid:success' width={30} />
              <span>{message}</span>
            </div>
          )}
          {/* <ExcuseModal setMessage={setMessage} /> */}
        </div>
      ) : user?.resume ? (
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