import { useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useQuery } from "react-query";
import { Loading } from "../../components";

const fetchNewsDetail = async (id) => {
  const response = await axiosClient.get(`/news/${id}`);
  return response.data.news;
};

const NewsDetail = () => {
  const { id } = useParams();

  const { data: news, isLoading } = useQuery(["newsDetail", id], () =>
    fetchNewsDetail(id)
  );

  const originalDateString = news?.created_at;
  const originalDate = new Date(originalDateString);
  const formattedDate = originalDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className='m-2 md:m-10 mt-24 shadow-xl transition duration-300 dark:bg-secondary-dark-bg bg-white rounded-3xl'>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='flex flex-col w-full justify-center items-center'>
          <h1 className='text-2xl font-bold mt-5'>{news?.title}</h1>
          <h1 className='mb-5'>{formattedDate}</h1>
          <img src={news?.image_url} alt='' className='m-5 w-400 max-h-96' />
          <div
            className='m-5 text-justify'
            dangerouslySetInnerHTML={{ __html: news?.content }}
          />
        </div>
      )}
    </div>
  );
};

export default NewsDetail;
