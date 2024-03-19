import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import PracticePaper from './PracticePaper.jsx';
import { getPacticePaperDetails } from '../../utils/apiCall.js';
import ButtonGroup from '../ButtonGroup.jsx';
import { practiceDiff } from '../../constants.js';
import FieldAdded from '../FieldAdded.jsx';

const PracticeUsage = () => {
  const { id } = useParams();

  const [sdata, setData] = useState({});
  const [prop, setProp] = useState('');
  const [diff, setDiff] = useState("easy");
  const [loading, setLoading] = useState(false);
  const [initNodes, setInitNodes] = useState([]);
  const [initEdges, setInitEdges] = useState([]);
  const [addTopicArr, setAddTopicArr] = useState([])
  const [removeTopicArr, setRemoveTopicArr] = useState([])
  const { data, isLoading, isError } = useQuery(
    'practicePaperUsageDetail',
    getPacticePaperDetails,
    {
      onSuccess: (data) => {
        setData(data);
        setProp(Object.keys(data.data)[0]);
        setLoading(false);
      },
    }
  );

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  // Update initNodes and initEdges when prop changes
  useEffect(() => {
    if (sdata.data && sdata.data[prop]) {
      setInitNodes(sdata.data[prop].nodes);
      setInitEdges(sdata.data[prop].edges);
    }
    console.log(prop, initEdges, initNodes, "is proppp");
  }, [prop, sdata]);



  return (
    <div className='w-full m-8 mt-3'>
      {loading ? (
        <p>loading</p>
      ) : (
        <div className="w-full h-screen flex">
          <div className='w-[60%] flex flex-col '>
            <div className="text-black text-[20px] font-bold">
              <span className="text-pri-500">Subject : </span>
              {` ${JSON.parse(localStorage.getItem(id)).name}`}
            </div>
            <div className='flex gap-2 items-center'>
              <p className='text-black text-[18px] font-semibold'>Blueprint</p>
              <ButtonGroup object={sdata.data} state={setProp} />
            </div>

            <div className='w-[80%] mr-36'>
              {initNodes.length > 0 && initEdges.length > 0 ? (
                <PracticePaper
                  initNodes={initNodes}
                  initEdges={initEdges}
                />
              ) : (
                <p>No data available</p>
              )}
            </div>
          </div>
          <div className='border-l-[3px] border-gray-500 w-[40%] h-full -mt-3 overflow-y-auto fixed right-0 '>
            <div className='ml-3'>
              <div className="text-black text-[20px] font-bold mb-10 mt-3 ">
                <span className="text-pri-500">Refine </span>
                And Customize
              </div>

              {/* all Questions */}
              <div className='flex flex-col gap-4'>
                <div className=' justify-start items-center '>
                  <p className='text-[18px] font-medium'>Difficulty :</p>
                  <div className='-m-2'>
                    <ButtonGroup object={practiceDiff} state={setDiff} />
                  </div>
                </div>
                <FieldAdded heading={"Add Topic"} dataSetter={setAddTopicArr} data={addTopicArr} />
                <FieldAdded heading={"Remove Topic"} dataSetter={setRemoveTopicArr} data={removeTopicArr} />

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}
export default PracticeUsage
