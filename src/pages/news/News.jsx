import React from "react";
import { NewsCard, Title } from "../../components";
import { useStateContext } from "../../context/ContextProvider";

const News = () => {
  const { news } = useStateContext();

  return (
    <div className='lg:my-15 my-20'>
      <div className='flex flex-col justify-center items-center'>
        <Title title='news' />
        <div className='flex w-full justify-center flex-wrap'>
          {news.map((item) => (
            <NewsCard news={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
