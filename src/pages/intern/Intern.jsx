import React from "react";
import { Title, UploadCv, InternCard, InternLink } from "../../components";
import { useQuery } from "react-query";
import axiosClient from "../../axios-client";

const Intern = () => {
  const { data: user } = useQuery("user", () =>
    axiosClient.get("/me").then(({ data }) => data)
  );

  const { data: vacanciesData } = useQuery("vacancies", () =>
    axiosClient.get("/vacancies").then(({ data }) => data.vacancies)
  );

  return (
    <div>
      {user?.resume ? (
        <div className='lg:my-15 my-20'>
          <div className='flex flex-col justify-center items-center'>
            <Title title='intern' />
          </div>
          <div className='flex w-full justify-center flex-col md:my-5 my-10'>
            <div className='w-full flex items-center justify-center flex-wrap'>
              {/* <InternLink
                to='/saved'
                title='tersimpan'
                icon='material-symbols:bookmark-outline-rounded'
              /> */}
              <InternLink
                to='/status'
                title='status pendaftaran'
                icon='mdi:clipboard-text-multiple-outline'
              />
              <InternLink to='/myintern' title='magangku' icon='ci:suitcase' />
            </div>
          </div>
          <div className='flex flex-col justify-center items-center lg:my-5 my-10  '>
            {vacanciesData?.map((vacancy) => (
              <InternCard
                key={vacancy.id}
                vacancy={vacancy}
                // icon='material-symbols:bookmark-add-outline-rounded'
              />
            ))}
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center h-screen'>
          <UploadCv />
        </div>
      )}
    </div>
  );
};

export default Intern;
