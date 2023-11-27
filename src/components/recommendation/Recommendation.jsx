import React, { useEffect, useState } from "react";
import InternCard from "../intern/InternCard";
import Title from "../Title";
import axiosClient from "../../axios-client";

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/vacancies/recommended");
        setRecommendations(response.data.vacancies);
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='flex flex-col justify-center items-center lg:my-15 my-20  '>
      <Title title='rekomendasi magang' />
      {isLoading ? (
        <div className='flex items-center justify-center h-52'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      ) : recommendations && recommendations.length !== 0 ? (
        <>
          {recommendations.slice(0, 8).map((recommendation) => (
            <InternCard
              key={recommendation.id}
              vacancy={recommendation}
              icon='material-symbols:bookmark-outline-rounded'
            />
          ))}
        </>
      ) : (
        <h1 className='my-24 text-dark dark:text-lightOne text-lg'>
          Tidak ada rekomendasi yang sesuai dengan anda
        </h1>
      )}
    </div>
  );
};

export default Recommendation;
