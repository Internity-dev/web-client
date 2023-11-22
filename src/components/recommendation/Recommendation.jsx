import React, { useEffect } from "react";
import InternCard from "../intern/InternCard";
import Title from "../Title";
import { useStateContext } from "../../context/ContextProvider";

const Recommendation = () => {
  const { recommendations } = useStateContext();
  return (
    <div className='flex flex-col justify-center items-center lg:my-15 my-20  '>
      <Title title='rekomendasi magang' />
      {recommendations.length !== 0 ? (
        <>
          {recommendations.slice(0, 8).map((recommendation) => (
            <InternCard
              key={recommendation.id}
              recommendation={recommendation}
              icon='material-symbols:bookmark-outline-rounded'
            />
          ))}
        </>
      ) : (
        <h1 className="my-24 text-dark dark:text-lightOne text-lg">Tidak ada rekomendasi yang sesuai dengan anda</h1>
      )}
    </div>
  );
};

export default Recommendation;
