// ButtonGroup.jsx
import React, { useState } from 'react';

const ButtonGroup = ({ object, state }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!object) {
        return null; // Return null or render an empty div if object is undefined or null
    }

    return (
        <div className='border-2 border-gray-600 w-fit p-[2px] m-2 rounded-sm'>
            {
                Object.keys(object).map((item, index) =>
                    <button
                        key={index}
                        onClick={() => {
                            setActiveIndex(index); // Update active index
                            state(item);
                        }}
                        className={`rounded-sm ${activeIndex === index ? "bg-pri-500 text-white" : ""} p-1 px-3 transition-all`}
                    >
                        {item}
                    </button>
                )
            }
        </div>
    );
};

export default ButtonGroup;
