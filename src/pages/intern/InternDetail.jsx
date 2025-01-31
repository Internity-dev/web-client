import React, { useEffect, useState } from "react";
import { Alert, InternButton, InternDetails, Loading } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import axiosClient from "../../axios-client";
import useUser from "../../hooks/useUser";

const InternDetail = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const { data: user } = useUser();

  const { data: status } = useQuery(
    "appliances",
    async () => {
      const response = await axiosClient.get("/appliances");
      return response.data.appliances;
    },
    {
      enabled: true,
    }
  );

  const { data: vacancy, isLoading } = useQuery(["vacancy", id], () =>
    axiosClient.get(`/vacancies/${id}`).then(({ data }) => data.vacancy)
  );

  const lastIndex = status?.length - 1;

  const onBatal = () => {
    axiosClient
      .put(`/appliances/${status?.[lastIndex]?.id}/cancel`)
      .then((response) => {
        queryClient.invalidateQueries("appliances");
        setMessage(response.data.message);
      })
      .catch((err) => {
        const response = err.response;
        if (
          response &&
          (response.status === 401 ||
            response.status === 500 ||
            response.status === 403)
        ) {
          console.error(response.data.message);
        }
      });
  };

  const onDaftar = () => {
    const payload = {
      vacancy_id: vacancy?.id,
    };

    axiosClient
      .post("/appliances", payload)
      .then((response) => {
        queryClient.invalidateQueries("appliances");
        setMessage(response.data.message);
      })
      .catch((err) => {
        const response = err.response;
        if (
          response &&
          (response.status === 401 ||
            response.status === 500 ||
            response.status === 403)
        ) {
          setError(response.data.message);
        }
      });
  };

  const onSave = () => {
    const payload = {
      vacancy_id: vacancy?.id,
    };

    axiosClient
      .post("/savedvacancies", payload)
      .then((response) => {
        queryClient.invalidateQueries("savedvacancies");
        queryClient.invalidateQueries("vacancies");
        setMessage(response.data.message);
      })
      .catch((err) => {
        const response = err.response;
        if (
          response &&
          (response.status === 401 ||
            response.status === 500 ||
            response.status === 403)
        ) {
          setError(response.data.message);
        }
      });
  };

  const onUnsave = () => {
    axiosClient
      .delete(`/savedvacancies/${vacancy.id}`)
      .then((response) => {
        queryClient.invalidateQueries("savedvacancies");
        queryClient.invalidateQueries("vacancies");
        setMessage(response.data.message);
      })
      .catch((err) => {
        const response = err.response;
        if (
          response &&
          (response.status === 401 ||
            response.status === 500 ||
            response.status === 403)
        ) {
          setError(response.data.message);
        }
      });
  };

  useEffect(() => {
    if (message || error) {
      const timeoutId = setTimeout(() => {
        navigate("/intern");
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [message, error, navigate]);

  return (
    <div className='m-2 md:m-5 mt-24 shadow-xl transition duration-300 dark:bg-secondary-dark-bg bg-white rounded-3xl'>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {message && <Alert text={message} />}
          {error && <Alert text={error} error />}
          <InternDetails vacancy={vacancy} />
          <div className='flex justify-center'>
            <div className='flex justify-between gap-2 md:gap-7 mb-5'>
              {vacancy?.is_saved ? (
                <InternButton
                  vacancy={vacancy}
                  text='Batal simpan'
                  left
                  onClick={() => onUnsave()}
                />
              ) : (
                <InternButton
                  vacancy={vacancy}
                  text='Simpan'
                  left
                  onClick={() => onSave()}
                />
              )}
              {vacancy?.in_pending ? (
                <InternButton
                  vacancy={vacancy}
                  text='batal daftar'
                  onClick={() => onBatal()}
                />
              ) : vacancy?.in_processed ? (
                <InternButton vacancy={vacancy} text='Processing' />
              ) : (
                <InternButton
                  vacancy={vacancy}
                  text='daftar'
                  onClick={() =>
                    user?.in_pending ||
                    user?.in_processed ||
                    user?.in_internship
                      ? document.getElementById("warning").showModal()
                      : onDaftar()
                  }
                />
              )}
            </div>
          </div>
        </>
      )}
      <dialog id='warning' className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Warning!</h3>
          <p className='py-4'>
            Batalkan pendaftaran PKL anda sebelum mendaftar ke tempat PKL lain
          </p>
          <div className='modal-action'>
            <form method='dialog'>
              <button className='btn'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default InternDetail;
