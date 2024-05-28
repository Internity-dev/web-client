import React from "react";

const SearchResult = ({ results, loading, error }) => {
  return (
    <div>
      <div className='lg:pr-24 xl:pr-[5.5rem] 2xl:pr-[5.5rem] absolute inset-x-0 z-50 mx-auto max-w-7xl lg:pl-28 xl:pl-28 2xl:pl-28'>
        <div className='rounded-b-lg bg-white shadow-lg drop-shadow-lg'>
          <div className='flex w-full flex-col gap-3 px-4 py-2 text-sm'>
            <p>Hasil Pencarian...</p>
            {results?.map((result) => (
              <div className='flex cursor-pointer gap-2'>
                <img
                  className='h-full w-12 rounded-lg object-scale-down'
                  alt='Captain Tsubasa: Ace'
                  src={result.company.logo_url}
                />
                <div>
                  <p className='font-bold'>{result.company.name}</p>
                  <p className='text-sm text-black'>{result.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
