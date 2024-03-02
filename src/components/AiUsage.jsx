import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuoteFamiliy from './QuoteFamiliy';

function AiUsage() {
  const { id } = useParams();
  const [AllQ, setAllQ] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState({});

  useEffect(() => {
    function getLocalData() {
      const AllQData = JSON.parse(localStorage.getItem(id)).resp.all_questions;
      setAllQ(AllQData);
    }
    getLocalData();
  }, [id]);

  const handleCheckboxChange = (file, question) => {
    setSelectedQuestions(prevState => ({
      ...prevState,
      [file]: {
        ...(prevState[file] || {}),
        [question]: !prevState[file]?.[question]
      }
    }));
  };

  return (
    <div className='w-full'>
      {/* <QuoteFamiliy/> */}
      <div className="container mx-auto w-full flex">

        <div className='w-full flex gap-2'>
          {Object.keys(AllQ).map((file, index) => (
            <div key={index} className=" w-1/2 bg-white shadow-md rounded-lg p-4 mb-6">
              <h2 className="text-lg font-semibold mb-2">{file}</h2>
              <div className="grid gap-2">
                {AllQ[file].map((question, qIndex) => (
                  <label key={qIndex} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedQuestions[file]?.[question] || false}
                      onChange={() => handleCheckboxChange(file, question)}
                      className="mr-2"
                    />
                    <span>{question}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AiUsage;
