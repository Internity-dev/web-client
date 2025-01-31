import React from "react";
import { Title, UploadCv, InternCard, InternLink } from "../../components";
import { useQuery } from "react-query";
import axiosClient from "../../axios-client";
import useUser from "../../hooks/useUser";

const Saved = () => {
  const { data: user } = useUser();

  const { data: vacanciesData } = useQuery("savedvacancies", () =>
    axiosClient.get("/savedvacancies").then(({ data }) => data.vacancies)
  );

  return (
    <div>
      {user?.resume ? (
        <div className='lg:my-15 my-20'>
          <div className='flex flex-col justify-center items-center'>
            <Title title='saved intern' />
          </div>
          <div className='flex flex-col justify-center items-center lg:my-5 my-10  '>
            {vacanciesData?.map((vacancy) => (
              <InternCard
                key={vacancy.id}
                vacancy={vacancy.vacancy}
                icon='material-symbols:bookmark-remove'
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

export default Saved;
