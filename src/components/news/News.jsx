import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";
import Title from "../Title";
import NewsCard from "./NewsCard";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axiosClient from "../../axios-client";

const fetchNews = async () => {
  const response = await axiosClient.get("/news");
  return response.data.news.data;
};

const News = () => {
  const { data: news } = useQuery("news", fetchNews);

  return (
    <div className='flex flex-col justify-center items-center lg:my-15 my-20'>
      <Title title='berita terbaru' />
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        slidesperv
        modules={[FreeMode, Pagination]}
        className='max-w-xs md:max-w-3xl'
      >
        {news?.map((item) => (
          <SwiperSlide key={item.id}>
            <NewsCard news={item} />
          </SwiperSlide>
        ))}
        <div className='slider-controler m-5'>
          <div className='swiper-button-prev slider-arrow'>
            <ion-icon name='arrow-back-outline'></ion-icon>
          </div>
          <div className='swiper-button-next slider-arrow'>
            <ion-icon name='arrow-forward-outline'></ion-icon>
          </div>
          <div className='swiper-pagination'></div>
        </div>
      </Swiper>
      <Link to='/news' className='text-lightOne font-bold'>
        <button className='btn btn-outline btn-info capitalize'>see all</button>
      </Link>
    </div>
  );
};

export default News;
