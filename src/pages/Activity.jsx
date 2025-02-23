import { useEffect, useState } from "react";
import { ActivityButton, ActivityCard, NoActivity, Title } from "../components";
import Isotope from "isotope-layout";
import useCompanyDetails from "../hooks/useCompanyDetails";
import useActivity from "../hooks/useActivity";
import useUser from "../hooks/useUser";

const Activity = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const day = currentDate.getDate();
  const monthIndex = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const month = months[monthIndex];
  const formattedDate = `${day} ${month} ${year}`;

  const { data: user } = useUser();
  
  const { selectedCompanyId } = useCompanyDetails();

  const { data: activity } = useActivity(selectedCompanyId);
  
  const [isotope, setIsotope] = useState(null);
  const [filterKey, setFilterKey] = useState(
    user?.resume && !user?.in_internship ? "registrasi" : "absensi"
  );
  useEffect(() => {
    if (activity) {
      setIsotope(
        new Isotope(".filter-container", {
          itemSelector: ".filter-item",
          layoutMode: "vertical",
        })
      );
    }
  }, [activity]);
  
  useEffect(() => {
    if (isotope) {
      filterKey === "*"
        ? isotope.arrange({ filter: `*` })
        : isotope.arrange({ filter: `.${filterKey}` });
    }
  }, [isotope, filterKey, activity]);
  return (
    <div className='lg:my-15 my-20'>
      <div className='flex flex-col justify-center items-center'>
        <Title title='activity' />
      </div>

      <div className='flex w-full justify-center flex-col'>
        <div className='w-full flex items-center justify-center flex-wrap'>
          <ActivityButton
            text='absensi'
            filterKey={filterKey}
            setFilterKey={setFilterKey}
            filter='absensi'
          />
          <ActivityButton
            text='laporan'
            filterKey={filterKey}
            setFilterKey={setFilterKey}
            filter='laporan'
          />
          <ActivityButton
            text='registrasi'
            filterKey={filterKey}
            setFilterKey={setFilterKey}
            filter='registrasi'
          />
        </div>
        {user?.in_internship ? (
          <div className='w-full lg:my-8 my-3 filter-container'>
            {activity?.presence && activity.presence.check_in == null ? (
              <>
                <ActivityCard
                  filterKey='absensi'
                  title='masuk'
                  date={formattedDate}
                  icon='ph:sign-in-bold'
                  to='/'
                  bg='#a3f0d0'
                  color='#0fb782'
                />
                <ActivityCard
                  filterKey='absensi'
                  title='izin'
                  date={formattedDate}
                  icon='basil:clipboard-alt-outline'
                  to='/'
                  bg='#FFFACD'
                  color='#E9B207'
                />
              </>
            ) : (
              <ActivityCard
                filterKey='absensi'
                title='keluar'
                date={formattedDate}
                icon='ph:sign-out-bold'
                to='/'
                bg='#f9cad1'
                color='#F03E61'
              />
            )}
            <NoActivity filterKey='registrasi' />
            {activity?.journal ? (
              <ActivityCard
                filterKey='laporan'
                title='laporan harian'
                date={formattedDate}
                icon='basil:clipboard-alt-outline'
                to='/report'
                bg='#BABABA'
                color='#5B5B5B'
              />
            ) : (
              <NoActivity filterKey='laporan' />
            )}
          </div>
        ) : user?.resume ? (
          <div className='w-full lg:my-8 my-3 filter-container'>
            <ActivityCard
              filterKey='registrasi'
              title='daftar PKL'
              date={formattedDate}
              icon='ci:suitcase'
              to='/intern'
              bg='#BADFFF'
              color='#1191FF'
            />
            {/* <NoActivity filterKey='absensi' /> */}
            {/* <NoActivity filterKey='laporan' /> */}
          </div>
        ) : (
          <NoActivity />
        )}
      </div>
    </div>
  );
};

export default Activity;
