import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getParamsData } from '../utils/apiCall';
import bg_title from '../assets/title-bg.svg'
import { useUserContext } from '../context/authChecked';
import { quotes } from '../constants';
import Popup from './Popup';
import target from '../assets/targer.svg'
import QuoteFamiliy from './QuoteFamiliy';
const Analayzer = () => {
  const { id } = useParams();
  const [impKey, setImpKey] = useState([]);
  const [impQ, setImpQ] = useState([]);
  const [highFreqQ, setHighFreqQ] = useState([]);
  const [lowFreqQ, setLowFreqQ] = useState([]);
  const [difficulty, setDifficulty] = useState({});
  const [allQ, setAllQ] = useState({})
  const [name, setName] = useState("")
  const [heading, setHeading] = useState("")
  const [stream, setStream] = useState("")
  const [itemPass, setItemPass] = useState([])
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const [showPopup, setShowPopup] = useState(false);

  const handleMorePointsClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const localAnalyzedData = await JSON.parse(localStorage.getItem(id))
        if (!localAnalyzedData) throw new Error
        // getParamsData(id)
        // Assuming responseData.data contains the JSON object directly
        setImpKey(localAnalyzedData.resp.imp_keywords || []);
        setImpQ(localAnalyzedData.resp.imp_qa || [])
        setHighFreqQ(localAnalyzedData.resp.topic_frequency.high)
        setLowFreqQ(localAnalyzedData.resp.topic_frequency.less)
        setDifficulty(localAnalyzedData.resp.exam_difficulty)
        setAllQ(localAnalyzedData.resp.all_questions);

        setName(localAnalyzedData.name || "Exam Details")
        setStream(localAnalyzedData.stream || "PaperBrock.")
        console.log(name, stream, "is here")
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className='w-full bg-gray-200'>
      <QuoteFamiliy/>

      <div className='m-4 flex gap-1'>
        <p className='text-pri-500 font-semibold'>{`Report : `}</p>
        <p className='text-black font-semibold'>{` ${name} | ${stream} `}</p>
      </div>

      {/* analyzed data */}

      <div className='p-4 gap-5 flex  flex-col'>

        {/* col 1 */}
        <div className="grid grid-cols-11 md:grid-cols-12 gap-4">


          <div className="p-3 bg-gray-100 shadow-lg col-span-11 md:col-span-4 h-[350px] rounded-[14px] flex flex-col"> {/* Smaller box */}
            {/* header */}
            <div className='font-semibold text-sm md:text-lg flex gap-2 ml-2'>
              <img src={target} alt="target" />
              Key Points
            </div>
            <hr className='my-2 border-[1.2px] border-black' />
            <div className="overflow-y-auto">
              <ul className="w-full">
                {
                  impKey.slice(0, 8).map((keyword, index) => (
                    <li key={index} className='w-fit flex items-center'>
                      <span className="inline-block w-1 h-1 bg-black rounded-full mr-2"></span> {/* Bullet point */}
                      <p className='text-black font-medium'>{keyword}</p>
                    </li>
                  ))
                }
              </ul>
            </div>
            {/* Button to load more points */}
            {
              impKey.length ? <div className="mt-auto flex justify-center items-center">
                <button onClick={() => {
                  setHeading("Key Points")
                  setItemPass(impKey)
                  handleMorePointsClick()
                }} className="bg-pri-500 hover:bg-pri-400 transition-all  text-white px-4 py-2 rounded-full">More {impKey.length > 8 ? impKey.length - 8 : ''} Point</button>
              </div> : <p></p>
            }

          </div>


          <div className='p-3 bg-gray-100 shadow-lg col-span-11 md:col-span-8 h-[350px] rounded-[14px] flex flex-col'>
            <div className='font-semibold text-sm md:text-lg'>
              Most Asked questions
            </div>
            <hr className='my-2 border-[1.2px] border-black' />
            <div className="overflow-y-auto">
              <ul className="w-full">
                {
                  impQ.slice(0, 8).map((keyword, index) => (
                    <li key={index} className='w-fit flex items-center'>
                      <span className="inline-block w-1 h-1 bg-black rounded-full mr-2"></span> {/* Bullet point */}
                      <p className='text-black font-medium'>{keyword}</p>
                    </li>
                  ))
                }
              </ul>
            </div>
            {/* Button to load more points */}
            {
              impQ.length ? <div className="mt-auto flex justify-center items-center">
                <button onClick={() => {
                  setHeading("Most Asked questions")
                  setItemPass(impQ)
                  handleMorePointsClick()
                }} className="bg-pri-500 hover:bg-pri-400 transition-all  text-white px-4 py-2 rounded-full">More {impQ.length > 8 ? impQ.length - 8 : ''} Point</button>
              </div> : <p></p>
            }
          </div>


        </div>


        <div className='grid grid-cols-11 md:grid-cols-12 gap-4'>

          <div className='p-3 bg-gray-100 shadow-lg col-span-11 md:col-span-6 h-[350px] rounded-[14px] flex flex-col'>

            <div className='font-semibold text-sm md:text-lg'>
              High Frequency topics
            </div>
            <hr className='my-2 border-[1.2px] border-black' />
            <div className="overflow-y-auto">
              <ul className="w-full">
                {
                  highFreqQ.slice(0, 8).map((keyword, index) => (
                    <li key={index} className='w-fit flex items-center'>
                      <span className="inline-block w-1 h-1 bg-black rounded-full mr-2"></span> {/* Bullet point */}
                      <p className='text-black font-medium'>{keyword}</p>
                    </li>
                  ))
                }
              </ul>
            </div>
            {/* Button to load more points */}
            {
              lowFreqQ.length ? <div className="mt-auto flex justify-center items-center">
                <button onClick={() => {
                  setHeading("High Frequency topics")
                  setItemPass(highFreqQ)
                  handleMorePointsClick()
                }} className="bg-pri-500 hover:bg-pri-400 transition-all  text-white px-4 py-2 rounded-full">More {highFreqQ.length > 8 ? highFreqQ.length - 8 : ''} Point</button>
              </div> : <p></p>
            }
          </div>


          {/*  */}
          <div className='p-3 bg-gray-100 shadow-lg col-span-11 md:col-span-6 h-[350px] rounded-[14px] flex flex-col'>

            <div className='font-semibold text-sm md:text-lg'>
              Low Frequency topics
            </div>
            <hr className='my-2 border-[1.2px] border-black' />
            <div className="overflow-y-auto">
              <ul className="w-full">
                {
                  lowFreqQ.slice(0, 8).map((keyword, index) => (
                    <li key={index} className='w-fit flex items-center'>
                      <span className="inline-block w-1 h-1 bg-black rounded-full mr-2"></span> {/* Bullet point */}
                      <p className='text-black font-medium'>{keyword}</p>
                    </li>
                  ))
                }
              </ul>
            </div>
            {/* Button to load more points */}
            {
              lowFreqQ.length ? <div className="mt-auto flex justify-center items-center">
                <button onClick={() => {
                  setHeading("Low Frequency topics")
                  setItemPass(lowFreqQ)
                  handleMorePointsClick()
                }} className="bg-pri-500 hover:bg-pri-400 transition-all  text-white px-4 py-2 rounded-full">More {lowFreqQ.length > 8 ? lowFreqQ.length - 8 : ''} Point</button>
              </div> : <p></p>
            }
          </div>

        </div>
      </div>


      {/* <div className="grid grid-cols-2 gap-4">
 
</div> */}
      {showPopup && (
        <Popup
          heading={`All ${heading}`}
          items={itemPass}
          onClose={handleClosePopup}
        />
      )}

    </div>
  );
};

export default Analayzer;
