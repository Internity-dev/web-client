import React from "react";
import { Title, UploadCv, InternCard, InternLink } from "../../components";
import { useStateContext } from "../../context/ContextProvider";
import { Navigate } from "react-router-dom";

const Intern = () => {
  const { user, vacancies } = useStateContext();
  if (user.in_internship) {
    return <Navigate to='/myintern' />;
  }
  return (
    <div>
      {user.resume_url ? (
        <div className='lg:my-15 my-20'>
          <div className='flex flex-col justify-center items-center'>
            <Title title='intern' />
          </div>
          <div className='flex w-full justify-center flex-col md:my-5 my-10'>
            <div className='w-full flex items-center justify-center flex-wrap'>
              <InternLink
                to='/saved'
                title='tersimpan'
                icon='material-symbols:bookmark-outline-rounded'
              />
              <InternLink
                to='/status'
                title='status pendaftaran'
                icon='mdi:clipboard-text-multiple-outline'
              />
              <InternLink to='/myintern' title='magangku' icon='ci:suitcase' />
            </div>
          </div>
          <div className='flex flex-col justify-center items-center lg:my-5 my-10  '>
            {vacancies.map((vacancy) => (
              <InternCard
                key={vacancy.id}
                vacancy={vacancy}
                icon='material-symbols:bookmark-add-outline-rounded'
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
