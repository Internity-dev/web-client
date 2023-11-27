import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { ActivityButton, ActivityCard, Title } from "../components";
import Isotope from "isotope-layout";

const Activity = () => {
  const { user, activity } = useStateContext();
  const [isotope, setIsotope] = useState(null);
  const [filterKey, setFilterKey] = useState(
    user.resume && !user.in_internship ? "registrasi" : "absensi"
  );
  useEffect(() => {
    setIsotope(
      new Isotope(".filter-container", {
        itemSelector: ".filter-item",
        layoutMode: "vertical",
      })
    );
  }, []);
  useEffect(() => {
    if (isotope) {
      filterKey === "*"
        ? isotope.arrange({ filter: `*` })
        : isotope.arrange({ filter: `.${filterKey}` });
    }
  }, [isotope, filterKey]);
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
        {user.in_internship ? (
          <div className='w-full lg:my-8 my-3 filter-container'>
            {activity.presence && activity.presence.check_in == null ? (
              <>
                <ActivityCard
                  filterKey='absensi'
                  title='masuk'
                  date='17 September 2006 07:30'
                  icon='ph:sign-in-bold'
                  to='/'
                  bg='#a3f0d0'
                  color='#0fb782'
                />
                <ActivityCard
                  filterKey='absensi'
                  title='izin'
                  date='17 September 2006 07:30'
                  icon='basil:clipboard-alt-outline'
                  to='/izin'
                  bg='#FFFACD'
                  color='#E9B207'
                />
              </>
            ) : (
              <ActivityCard
                filterKey='absensi'
                title='keluar'
                date='17 September 2006 07:30'
                icon='ph:sign-out-bold'
                to='/keluar'
                bg='#f9cad1'
                color='#F03E61'
              />
            )}

            {activity.journal && activity.journal == null ? (
              <ActivityCard
                filterKey='laporan'
                title='laporan harian'
                date='17 September 2006 07:30'
                icon='basil:clipboard-alt-outline'
                to='/report'
                bg='#BABABA'
                color='#5B5B5B'
              />
            ) : null}
          </div>
        ) : user.resume ? (
          <div className='w-full lg:my-8 my-3 filter-container'>
            <ActivityCard
              filterKey='registrasi'
              title='daftar magang'
              date='17 September 2006 07:30'
              icon='ci:suitcase'
              to='/intern'
              bg='#BADFFF'
              color='#1191FF'
            />
          </div>
        ) : (
          <div className='flex items-center justify-center w-full h-64'>
            <div className='filter-container'>
              <h1 className='text-dark transition duration-300 dark:text-lightOne text-xl'>
                Belum ada aktivitas terbaru
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activity;
