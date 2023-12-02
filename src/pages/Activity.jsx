import React, { useEffect, useState } from "react";
import { ActivityButton, ActivityCard, Title } from "../components";
import Isotope from "isotope-layout";
import axiosClient from "../axios-client";
import { useQuery } from "react-query";

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

  const { data: user } = useQuery("user", () =>
    axiosClient.get("/me").then(({ data }) => data)
  );
  const { data: companyDetails } = useQuery("companyDetails", async () => {
    const response = await axiosClient.get("/appliances/accepted");
    return response.data.appliances[0];
  });

  const { data: activity } = useQuery(
    ["activity", companyDetails?.intern_date.company_id],
    async () => {
      const response = await axiosClient.get(
        `/today-activities?company=${companyDetails?.intern_date.company_id}`
      );
      return response.data;
    },
    { enabled: !!companyDetails?.intern_date.company_id }
  );
  const [isotope, setIsotope] = useState(null);
  const [filterKey, setFilterKey] = useState(
    user?.resume && !user?.in_internship ? "registrasi" : "absensi"
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

            {activity?.journal && activity?.journal == null ? (
              <ActivityCard
                filterKey='laporan'
                title='laporan harian'
                date={formattedDate}
                icon='basil:clipboard-alt-outline'
                to='/report'
                bg='#BABABA'
                color='#5B5B5B'
              />
            ) : null}
          </div>
        ) : user?.resume ? (
          <div className='w-full lg:my-8 my-3 filter-container'>
            <ActivityCard
              filterKey='registrasi'
              title='daftar magang'
              date={formattedDate}
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
