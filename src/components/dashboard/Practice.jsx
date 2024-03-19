import { useQuery } from 'react-query';
import { getPracticePaperUsage } from '../../utils/apiCall.js';
import React from 'react';
import { Link } from 'react-router-dom';

const Practice = () => {
    const SkeletonLoading = () => (
        <div className='animate-pulse  w-full'>


            <div className='my-5'>

                <div className='mt-3 flex gap-4 flex-wrap'>
                    {[...Array(4).keys()].map(index => (
                        <div key={index} className='bg-gray-200 rounded-md p-2 pl-5 border-2 border-gray-400 w-60 h-36 flex items-start justify-start flex-col mb-4'>
                            <div className='flex items-center'>
                                <div className='bg-gray-300 rounded-full w-4 h-4 mr-2'></div>
                                <div className='bg-gray-200 rounded-md h-5 w-20'></div>
                            </div>
                            <div className='w-fit mt-2'>
                                <ul className='pl-4 space-y-2'>
                                    <li className='bg-gray-200 rounded-md h-5 w-36'></li>
                                    <li className='bg-gray-200 rounded-md h-5 w-24'></li>
                                    <li className='bg-gray-200 rounded-md h-5 w-32'></li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const { data, isLoading, isError } = useQuery('practicePaperUsage', getPracticePaperUsage);

    if (isLoading) return <div>{SkeletonLoading()}</div>;
    if (isError) return <div>Error fetching data</div>;
    console.log(data)
    return (
        <div className='m-8 w-full'>
            <div>
                <p className='text-black text-[24px] font-bold'><span className='text-pri-500'>Practice</span> Exam Papers</p>
            </div>

            <div className='my-5'>
                <div>
                    <p className='text-black text-[17px] font-semibold'> Your  <span className='text-pri-500'>Blueprint</span></p>
                </div>


                <div className='mt-3 flex gap-4 flex-wrap'>
                    {
                        isLoading && SkeletonLoading()
                    }
                    {data && data.data?.array?.map((usage, index) => (
                        <Link to={`/practice/${usage.id}`}>
                            <div key={index}
                                className='rounded-md p-2 pl-5 border-2 border-gray-400 hover:border-pri-550 transition-all w-60 h-fit flex items-start justify-start flex-col'>
                                <div className='flex items-center'>
                                    <span className='w-2 h-2 rounded-full' style={{ backgroundColor: usage.color }}></span>
                                    <span className='ml-2 font-semibold'>{usage.name}</span>
                                </div>
                                <div className='w-fit mt-[12px]'>
                                    <ul className=' pl-[17px] list-disc font-medium text-gray-600'>
                                        <li>{usage.totalFile} Exam Papers</li>
                                        <li>{usage.totalTopics} Topic</li>
                                        <li>{usage.totalQuestion} Sections</li>
                                    </ul>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Practice;
