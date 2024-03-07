import React, { useState } from 'react';
import { useTrail, animated } from 'react-spring';
import QuoteFamiliy from './QuoteFamiliy';
import { homeOptions } from '../constants.js';
import { Link } from 'react-router-dom';

const Home = () => {
  const [show, setShow] = useState(false);

  const trail = useTrail(homeOptions.length, {
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0px)' : 'translateY(50px)',
    config: { duration: 300 },
    delay: 85 
  });

  React.useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className='w-full'>
      <QuoteFamiliy />
      <div className='ml-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4  m-5'>
          {trail.map((style, index) => (
            <animated.div key={homeOptions[index].label} style={style}>
              <Link
                to={homeOptions[index].route}
                className='border border-black rounded-md hover:bg-gray-50 transition-all bg-white p-3 w-full flex items-center justify-between hover:bg-gradient-to-r'
              >
                <div>
                  <div className='flex gap-2'>
                    <p className='text-left w-fit font-semibold text-[18px]'>{homeOptions[index].label}</p>
                    <p className='text-left w-fit font-semibold text-[18px] text-pri-600'>{homeOptions[index].labelB}</p>
                  </div>
                  <p className='text-left font-medium text-gray-600'>{homeOptions[index].desc}</p>
                </div>
              </Link>
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
