import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios-client";

const NewsDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(`/news/${id}`);
        setNews(response.data.news);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const originalDateString = news.created_at;
  const originalDate = new Date(originalDateString);
  const formattedDate = originalDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className='m-2 md:m-10 mt-24 shadow-xl transition duration-300 dark:bg-secondary-dark-bg bg-white rounded-3xl'>
      {isLoading ? (
        <div className='flex items-center justify-center h-screen'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      ) : (
        <div className='flex flex-col w-full justify-center items-center'>
          <h1 className='text-2xl font-bold mt-5'>{news.title}</h1>
          <h1 className="mb-5">{formattedDate}</h1>
          <img src={news.image} alt='' className='m-5 w-400 max-h-96' />
          <div
            className='m-5 text-justify'
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </div>
      )}
    </div>
  );
};

export default NewsDetail;
