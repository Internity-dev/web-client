import React, { useEffect, useState } from "react";
import { Alert, Header } from "../components";
import { useStateContext } from "../context/ContextProvider";
import ReactPaginate from "react-paginate";
import axiosClient from "../axios-client";
import { useQuery } from "react-query";

const Notifications = () => {
  const { setNotifications } = useStateContext();

  const {
    data: notifications = [],
    isLoading,
    isError,
  } = useQuery("notifications", async () => {
    const response = await axiosClient.get("/notifications");
    return response.data.notifications;
  });

  const [message, setMessage] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const notificationsPerPage = 7;
  const pageCount = Math.ceil(notifications.length / notificationsPerPage);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const slicedNotifications = notifications.slice(
    currentPage * notificationsPerPage,
    (currentPage + 1) * notificationsPerPage
  );

  const getCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const currentTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return currentTime;
  };

  const onRead = () => {
    const payload = {
      ids: notifications.map((notification) => notification.id),
    };
    axiosClient
      .put("/notifications/mark-as-read", payload)
      .then((response) => {
        const newNotifications = notifications.map((notification) => ({
          ...notification,
          read_at: getCurrentTime(),
        }));
        setMessage(response.data.message);
        setNotifications(newNotifications);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data);
        }
      });
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
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-dark rounded-3xl'>
      <Header category='My' title='Notifications' />
      <div className='w-full flex justify-center'>
        <div className='w-full h-10 flex items-center justify-end'>
          <button
            className='btn btn-outline btn-info btn-sm text-lightOne font-bold'
            onClick={() => onRead()}
          >
            mark all as read
          </button>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='table'>
          <tbody>
            {slicedNotifications.map((notification) => {
              const originalDate = new Date(notification.created_at);
              const formattedDate = originalDate.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              return (
                <tr
                  className={`border-b-dark dark:border-b-lightOne ${
                    notification.read_at == null &&
                    "bg-slate-100 dark:bg-slate-600"
                  }`}
                  key={notification.id}
                >
                  <th>{formattedDate}</th>
                  <th>
                    <div className='flex flex-col '>
                      <h1 className='text-xl text-dark dark:text-lightOne transition duration-300'>
                        {notification.title}
                      </h1>
                      <p>{notification.body}</p>
                    </div>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className='flex flex-col items-start justify-center'>
        <p>Total Messages: {notifications.length}</p>
        <p>
          Page: {currentPage + 1} of {pageCount}
        </p>
      </div>

      <div className='flex justify-end items-center'>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          pageLinkClassName={"pagination__link"}
          activeLinkClassName={"pagination__link--active"}
          breakClassName={"pagination__break"}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
        />
      </div>

      {message && <Alert text={message} />}
    </div>
  );
};

export default Notifications;
