import React from "react";
import { NewsCard, Title } from "../../components";
import axiosClient from "../../axios-client";
import { useQuery } from "react-query";

const fetchNews = async () => {
  const response = await axiosClient.get("/news");
  return response.data.news.data;
};

const News = () => {
  const { data: news, isError } = useQuery("news", fetchNews);

  return (
    <div className='lg:my-15 my-20'>
      <div className='flex flex-col justify-center items-center'>
        <Title title='news' />
        <div className='flex w-full justify-center flex-wrap'>
          {news?.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
        {isError && <div>Error fetching news data</div>}
      </div>
    </div>
  );
};

export default News;
