import React from 'react';
import { useQuery } from 'react-query';
import { useUserContext } from '../../context/authChecked';
import { getUsageArray } from '../../utils/apiCall';
import { formatTimestamp } from '../../constants';
import { useNavigate } from 'react-router-dom';
import LoadingPrompt from '../LoadingPrompt';
import { QueryClient, QueryClientProvider } from 'react-query';

const AiBook = () => {
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const { data: usageArr, isLoading, isError } = useQuery('usageArray', getUsageArray, {
    onSuccess: (data) => {
      setUser((prevUser) => ({
        ...prevUser,
        usage: data,
      }));
    },
  });

  const handleClick = (id) => {
    navigate(`/aiBook/${id}`);
  };

  return (
    <div className='m-8 w-full'>
      {isLoading ? (
        <div className='w-full h-[540px] flex justify-center items-center'>
          <LoadingPrompt />
        </div>
      ) : isError ? (
        <p>Error fetching data</p>
      ) : usageArr && usageArr.length > 0 ? (
        <div>
          <div>
            <p className='mb-7 text-black text-[24px] font-bold'><span className='text-pri-500'>All Answer</span> Book</p>
          </div>
          <div className='grid md:grid-cols-3 grid-cols-1  gap-4 w-full'>
            {usageArr.slice().reverse().map((item) => {
              const parsedItem = JSON.parse(item);
              const createdAt = new Date(parsedItem.createdAt); // Convert createdAt to Date object
              return (
                <div className="border border-black rounded-md" key={parsedItem.id}>
                  <button
                    onClick={() => handleClick(parsedItem.id)}
                    style={{
                      borderRight: parsedItem.color ? `7px solid ${parsedItem.color}` : 'none', // Conditionally set border-right style
                    }}
                    className='rounded-[7px] bg-white p-3 w-full flex items-center justify-between'
                  >
                    <div>
                      <p className='text-left w-fit font-semibold text-[18px]'>{parsedItem.name}</p>
                      <p className='text-left font-semibold'>{formatTimestamp(createdAt)}</p> {/* Pass createdAt as Date object */}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>No content available</p>
      )}
    </div>
  );
};

export default AiBook;
