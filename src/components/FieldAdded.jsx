import React, { useState } from 'react';
import add from '../assets/components/add.svg';
import remove from '../assets/components/remove.svg';
import info from '../assets/comment-info.svg'
const FieldAdded = ({ heading, dataSetter, data }) => {
    const [input, setInput] = useState("");

    const handleRemoveItem = (indexToRemove) => {
        const updatedData = data.filter((_, index) => index !== indexToRemove);
        dataSetter(updatedData);
    };

    return (
        <div>
            <div>
                <p className='text-[14px] font-medium'>{heading} <span className='font-thin text-[16px] text-center'> (Optional)</span></p>
                   
            </div>
            <div className='w-full h-9 border-2 border-black rounded-sm flex justify-end p-[2px] '>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className='w-full border-none outline-none'
                />
                <button
                    className='w-7 h-7 bg-pri-500 flex items-center justify-center rounded-sm p-[2px]'
                    onClick={() => {
                        if (input.length !== 0) {
                            dataSetter([...data, input]);
                            setInput("");
                        }
                    }}
                >
                    <img src={add} alt="Add" />
                </button>
            </div>
            <div className='flex flex-col gap-1 mt-3'>
                {data.map((item, index) => (
                    <div key={index} className='h-10 bg-pri-500 w-full flex justify-between items-center  rounded-sm'>
                        <p className='text-white ml-2 '>{item}</p>
                        <button onClick={() => handleRemoveItem(index)}  >
                            <img
                                src={remove}
                                alt="remove"
                                className='h-4 w-4 mr-2'
                            />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FieldAdded;
