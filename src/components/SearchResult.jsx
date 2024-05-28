import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ results, loading, error }) => {
  return (
    <div>
      <div className='mx-auto max-w-7xl'>
        <div className='rounded-b-lg bg-white shadow-lg drop-shadow-lg'>
          <div className='flex w-full flex-col gap-3 px-4 py-2 text-sm'>
            {error ? (
              <p>{error}</p>
            ) : loading ? (
              <p>loading...</p>
            ) : (
              <>
                <p>Hasil Pencarian...</p>
                {results?.map((result) => (
                  <Link className='flex gap-2' to={`/vacancy/${result.id}`} key={result.id}>
                    <img
                      className='h-full w-12 rounded-lg object-scale-down'
                      alt='Captain Tsubasa: Ace'
                      src={result.company.logo_url}
                    />
                    <div>
                      <p className='font-bold'>{result.company.name}</p>
                      <p className='text-sm text-black'>{result.name}</p>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
