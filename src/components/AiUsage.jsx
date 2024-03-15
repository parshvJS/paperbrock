import { getAiAnswers } from '../utils/apiCall';
import { useUserContext } from '../context/authChecked';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import expandArr from '../assets/expandArr.svg'
import expandArrRev from '../assets/expandArrRev.svg'
import skeletonImage from '../assets/skeletonImage.svg'

import LoadingPrompt from './LoadingPrompt';
function AiUsage() {
  const { id } = useParams();
  const [allQ, setAllQ] = useState({});
  const [selectedContent, setSelectedContent] = useState([]);
  const [selectedQ, setSelectedQ] = useState([]);
  const [isImp, setIsImp] = useState(false);
  const [imp, setImp] = useState([]);
  const [allAns, setAllAns] = useState([]);
  const { collapsedCon } = useUserContext();
  const [isLoading,setIsLoading] = useState(false)
  const [expandedItem, setExpanedItem] = useState([]);
  useEffect(() => {
    function getLocalData() {
      const allQData = JSON.parse(localStorage.getItem(id)).resp.all_questions;
      setAllQ(allQData);
    }

    function getImp() {
      const imp = JSON.parse(localStorage.getItem(id))?.resp?.imp_qa;
      setSelectedContent(imp)
      setIsImp(true);
      setImp(imp);
    }
    getLocalData();
    getImp();
  }, [id]);

  const handleButtonClick = (key) => {
    if (key === "imp") {
      setSelectedContent(imp);
    } else {
      setSelectedContent(allQ[key]);
    }
  };

  const handleOptionSelect = (option) => {
    const selectedIndex = selectedQ.indexOf(option);
    if (selectedIndex == -1) {
      console.log("if");
      setSelectedQ([...selectedQ, option]);
    } else {
      console.log("else");
      const updatedSelectedQ = [...selectedQ];
      updatedSelectedQ.splice(selectedIndex, 1);
      setSelectedQ(updatedSelectedQ);
    }
  };

  const handleAnswer = async () => {
    // TODO: add apicall function to dummey data
    setIsLoading(true)
    // const array = {
    //   "(a) What is Operating System? Explain needs of Operating System.": "This JSON object contains a single choice, which is the generated text based on the provided prompt. The text provides an explanation of how to create a dictionary in Python and how to concatenate two dictionaries into a new one, along with example Python code snippets.",
    //   "(b) Explain Operating System Services.": "This JSON object contains a single choice, which is the generated text based on the provided prompt. The text provides an explanation of how to create a dictionary in Python and how to concatenate two dictionaries into a new one, along with example Python code snippets.",
    //   "(c) Write shot note on: Multiprogramming O.S and Multithreading O.S.": "This JSON object contains a single choice, which is the generated text based on the provided prompt. The text provides an explanation of how to create a dictionary in Python and how to concatenate two dictionaries into a new one, along with example Python code snippets.",
    //   "(a) Explain Process Life Cycles.": "This JSON object contains a single choice, which is the generated text based on the provided prompt. The text provides an explanation of how to create a dictionary in Python and how to concatenate two dictionaries into a new one, along with example Python code snippets.",
    //   "(b) Explain CPU bound process and IO bound Process with example.": "This JSON object contains a single choice, which is the generated text based on the provided prompt. The text provides an explanation of how to create a dictionary in Python and how to concatenate two dictionaries into a new one, along with example Python code snippets.",
    //   "(c) Calculate  Average  waiting  time  and  average  turnaround  time  for  FCFS  algorithm with gantt chart for following data.": "This JSON object contains a single choice, which is the generated text based on the provided prompt. The text provides an explanation of how to create a dictionary in Python and how to concatenate two dictionaries into a new one, along with example Python code snippets.",
    //   "(a) What is deadlock? Explain four conditions for deadlock to occur.": "This JSON object contains a single choice, which is the generated text based on the provided prompt. The text provides an explanation of how to create a dictionary in Python and how to concatenate two dictionaries into a new one, along with example Python code snippets.",
    //   "(b) Explain Process Control Block in detail.": "This JSON object contains a single choice, which is the generated text based on the provided prompt. The text provides an explanation of how to create a dictionary in Python and how to concatenate two dictionaries into a new one, along with example Python code snippets."
    // }
    const array = await getAiAnswers(selectedQ)

    setAllAns(array?.data);
    setIsLoading(false)

  }
  const handleExpandButton = (key) => {
    if (expandedItem.includes(key)) {
      setExpanedItem(expandedItem.filter(i => i !== key));
      console.log(expandedItem, "is here sdfs!");

    }
    else {
      setExpanedItem([...expandedItem, key]);
      console.log(expandedItem, "is here !");
    }
  }
  return (
    <div className='w-full ml-5 flex'>

      <div className='w-[60%] overflow-y-auto'>
        <div className={`py-1 w-64 h-16 bg-slate-200 rounded-lg overflow-y-auto fixed bottom-2 ${collapsedCon ? "left-60" : "left-21"}`}>
          <div className='flex h-full justify-center items-center gap-3'>
            <button
              className='rounded-md bg-pri-500 hover:bg-pri-400 transition-all text-white text-center h-[85%] w-24'
              onClick={handleAnswer}
            >Answers</button>


            <button className='text-black h-[85%] w-fit bg-white hover:bg-gray-100 transition-all p-1 rounded-md'>Selected Answers</button>
          </div>
        </div>
        <p className='text-[24px] font-semibold text-pri-600 mb-5 mt-5'>Files</p>
        <div className='flex gap-5 my-5'>
          {isImp && (
            <button
              className={`w-5 md:w-36 h-10 rounded-md  font-semibold  border-2 ${selectedContent === imp ? 'text-pri-600 border-pri-600 ' : 'text-black border-black'}`}
              onClick={() => handleButtonClick("imp")}
            >
              Most Asked
            </button>
          )}
          {Object.keys(allQ).map((key, index) => (
            <button
              key={index}
              className={`p-2 w-fit  h-10 rounded-md border-2 font-semibold ${selectedContent === allQ[key] ? 'text-pri-600 border-pri-600' : 'text-black border-black'}`}
              onClick={() => handleButtonClick(key)}
            >
              {key}
            </button>
          ))}
        </div>
        <p className='text-[24px] font-semibold text-pri-600 mb-5 mt-5'>Questions</p>

        <div className='w-[90%] flex flex-col gap-[14px]'>
          {selectedContent.map((option, index) => (
            <div key={index} className={`w-fit  shadow-md p-3 rounded-md ${selectedQ.includes(option) ? "bg-pri-550 text-white" : ""}`}>
              <label>
                <input
                  type='checkbox'
                  value={option}
                  onChange={() => handleOptionSelect(option)}
                  checked={selectedQ.includes(option)}
                />
                {option}
              </label>
            </div>
          ))}
        </div>

      </div>
      <div className='border-l-[3px] border-gray-500 w-[40%] h-screen overflow-y-auto fixed right-0'>
        <div className='border-b-[3px] border-gray-500'>
          <p className='m-4 text-black text-[20px] font-semibold'><span className='text-pri-600'>Answer</span> Book</p>
        </div>
        {
       isLoading ? <LoadingPrompt/> :  allAns.length == 0 ? 
       <div className='flex justify-center items-center flex-col m-20 rounded-md '><img  src={skeletonImage} alt="" /> 
       <p className='font-semibold text-[20px]'>Selected Answers Will Be Shown Here</p>
        </div>
     :                
 allAns ?
   Object.keys(allAns).map((qa, index) => {
     return (
     <div className='m-2'>
         {
            <button onClick={() => handleExpandButton(index)} className='transition-all rounded-[5px] bg-white w-full border-[3px] border-black p-2 '>
               <div className='flex justify-between items-center transition-all'>
                 <p className='text-left font-semibold'>{qa}</p>
                 <img src={expandedItem.includes(index) ? expandArrRev : expandArr} alt="open" />
               </div>

               <div className={`${expandedItem.includes(index) ? "" : "hidden"} mt-5 transition-all p-2 `}>
                 {
                   expandedItem.includes(index) ? <div className='text-left font-normal'>{allAns[qa]}</div> : (<div ></div>)
                 }
               </div>
             </button>

         }


       </div>
     )
   }) : <p></p>
        }
      </div>
    </div>
  );
}

export default AiUsage;
