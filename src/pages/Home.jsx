import { useEffect, useState } from "react";
import {
  PresenceButton,
  UploadCv,
  Activity,
  Recommendation,
  Title,
  News,
  PresenceModal,
  Alert,
  PresenceCamera,
  ExcuseModal,
} from "../components";
import { useStateContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "react-query";
import axiosClient from "../axios-client";
import useCompanyDetails from "../hooks/useCompanyDetails";
import useActivity from "../hooks/useActivity";
import useUser from "../hooks/useUser";

const Home = () => {
  const { setPresence } = useStateContext();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState(null);
  const [presenceCam, setPresenceCam] = useState(false);
  const now = new Date();
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const { companyDetails, selectedCompanyId } = useCompanyDetails();

  const presencesQueryKey = ["presences", selectedCompanyId];

  const { data: user } = useUser();

  const { data: activity } = useActivity(selectedCompanyId);

  const { data: presences } = useQuery(
    presencesQueryKey,
    async () => {
      const response = await axiosClient.get(
        `/presences?company=${selectedCompanyId}`
      );
      return response.data.presences;
    },
    { enabled: !!selectedCompanyId }
  );

  const presenceMutation = useMutation(
    (payload) =>
      axiosClient.post(
        `/presences/${activity.presence.id}?_method=PUT`,
        payload
      ),
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
    (payload) => axiosClient.put(`/presences/${presences[0]?.id}`, payload),
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

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        setMessage(null);
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [message, setMessage]);

  useEffect(() => {
    if (presenceCam) {
      document.getElementById("checkin").showModal();
    }
  }, [presenceCam]);

  const checkInternshipPeriod = () => {
    const selectedCompany = companyDetails?.find(
      (company) => company.intern_date.company_id === selectedCompanyId
    );
    const endDate = selectedCompany.intern_date.end_date;
    if (endDate) {
      return now.toISOString().split('T')[0] > endDate;
    }
    return false;
  };

  const handlePresenceButtonClick = (action) => {
    if (checkInternshipPeriod()) {
      document.getElementById("overdue").showModal();
    } else {
      if (action === "masuk") {
        if (!companyDetails?.length || !companyDetails[0]?.intern_date?.start_date) {
          document.getElementById("date").showModal();
        } else if (activity?.presence == null) {
          document.getElementById("absen").showModal();
        } else {
          setPresenceCam(true);
        }
      } else if (action === "keluar") {
        if (
          !companyDetails?.length ||
          !companyDetails[0]?.intern_date.start_date
        ) {
          document.getElementById("date").showModal();
        } else if (activity?.presence == null && presences[0]?.check_out == null) {
          onKeluar();
        } else {
          activity?.presence ? document.getElementById("masuk").showModal() : document.getElementById("keluar").showModal();
        }
      } else if (action === "izin") {
        if (!companyDetails?.length || !companyDetails[0]?.intern_date.start_date) {
          document.getElementById("date").showModal();
        } else if (activity?.presence == null) {
          document.getElementById("absen").showModal();
        } else {
          document.getElementById("izin").showModal();
        }
      }
    }
  };

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
                onClick={() => handlePresenceButtonClick("masuk")}
              />
              <PresenceButton
                name='keluar'
                icon='ph:sign-out-bold'
                onClick={() => handlePresenceButtonClick("keluar")
                }
              />
              <PresenceButton
                name='izin'
                icon='basil:clipboard-alt-outline'
                onClick={() => handlePresenceButtonClick("izin")}
              />
              <Link to='/presence'>
                <PresenceButton name='kehadiran' icon='ic:round-list' />
              </Link>
            </div>
            <PresenceModal
              id='date'
              message='Kamu belum menentukan tanggal PKL!'
            />
            <PresenceModal id='absen' message='Kamu sudah absen hari ini!' />
            <PresenceModal id='masuk' message='Silakan absen masuk dahulu' />
            <PresenceModal
              id='keluar'
              message='Kamu sudah absen keluar hari ini!'
            />
            <PresenceModal id='overdue' message='Kamu sudah melewati periode PKL!' />

            {presenceCam && ( // Conditionally render the camera
              <PresenceCamera
                onClose={() => setPresenceCam(false)}
                mutation={presenceMutation}
                time={formattedTime}
                setMessage={setMessage}
              />
            )}
          </div>
          <Activity />
          <News />
          {message && <Alert text={message} />}
          <ExcuseModal mutation={presenceMutation} time={formattedTime} setMessage={setMessage} />
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
