import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../context/authChecked';
import { getUsageArray } from '../../utils/apiCall';
import { formatTimestamp } from '../../constants';
import { useNavigate } from 'react-router-dom';

const AiBook = () => {
  const { user, setUser } = useUserContext();
  const [isContentInLocal, setIsContentInLocal] = useState(false);
  const [usageArr, setUsageArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clicked, setClicked] = useState(1)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      const Usage = await getUsageArray();
      setUser((prevUser) => ({
        ...prevUser,
        usage: Usage,
      }));
      if (Usage === undefined || Usage.length === 0) {
        setIsContentInLocal(false);
      } else {
        setUsageArr(Usage);
        setIsContentInLocal(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [setUser]); // Add setUser to dependency array
  const handleClick = (id, index) => {
    setClicked(clicked + 1)
    if (clicked == 2) {
      navigate(`/aiBook/${id}`)
    }
  }
  return (
    <div className='m-8 w-full'>
      {isLoading ? (
        <p>Loading...</p>
      ) : isContentInLocal ? (
        <div>
          <div>
            <p className='mb-7 text-black text-[24px] font-bold'><span className='text-pri-500'>All Answer</span> Book</p>
          </div>
          <div className='grid md:grid-cols-3 grid-cols-1  gap-4 w-full'>
            {usageArr.slice().reverse().map((item, index) => {
              const parsedItem = JSON.parse(item);
              const createdAt = new Date(parsedItem.createdAt); // Convert createdAt to Date object
              console.log(parsedItem.id);
              return (
                <button
                  onClick={() => handleClick(parsedItem.id, index)}
                  className={` border border-black rounded-md bg-white shadow-lg p-3 w-full flex items-center justify-between`} key={parsedItem.id}>
                  <div>
                    <p className='text-left w-fit font-semibold text-[18px]'>{parsedItem.name}</p>
                    <p className='text-left'>{formatTimestamp(createdAt)}</p> {/* Pass createdAt as Date object */}
                  </div>
                  <span
                    className='rounded-full block w-8 h-8 mt-2'
                    style={{
                      backgroundColor: parsedItem.color,
                      filter: 'blur(5px)' // Apply blur effect
                    }}
                  ></span>
                </button>
              );
            })}

          </div>




        </div>
      ) : (
        <p>No content available</p>
      )
      }
    </div >
  );
};

export default AiBook;
