import { useQuery } from "react-query";
import axiosClient from "../../axios-client";
import { Loading, MyInternDetail, Title } from "../../components";
import useUser from "../../hooks/useUser";

const MyIntern = () => {
  const { data: user } = useUser();

  const {
    data: appliancesData,
    isLoading
  } = useQuery(
    "acceptedAppliances",
    async () => {
      const response = await axiosClient.get("/appliances/accepted");
      return response.data;
    },
    {
      enabled: !!user?.id,
    }
  );

  return (
    <div className='flex flex-col justify-center items-center lg:my-15 my-20'>
      <Title title='PKL-ku' />
      {isLoading ? (
        <Loading />
      ) : user?.in_internship ? (
        <>
          {appliancesData?.appliances && (
            appliancesData.appliances.map((appliance) => (
              <MyInternDetail key={appliance.id} vacancy={appliance.vacancy} internDate={appliance.intern_date}/>
            ))
          )}
        </>
      ) : (
        <div className='flex justify-center items-center h-72 m-7'>
          <h1 className='text-dark transition duration-300 dark:text-lightOne text-xl first-letter:capitalize'>
            Belum ada tempat PKL terdaftar
          </h1>
        </div>
      )}
    </div>
  );
};

export default MyIntern;
