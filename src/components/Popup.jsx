import React from 'react';
import cross from '../assets/cross.svg'

const Popup = ({ heading, items, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50 overflow-auto">
      <div className="bg-white max-w-screen-md p-6 rounded-lg shadow-lg">
        <div className="mb-4 flex justify-between">
          <h2 className="text-lg font-bold">{heading}</h2>
          <button className="text-gray-500  hover:text-gray-700 flex justify-center items-center rounded-full hover:bg-gray-400 p-3 " onClick={onClose}>
            <img src={cross} alt="close" className='w-2 h-2 ' />
          </button>
        </div>

        <hr className='my-2 border-[1.2px] border-black' />

        <ol className="max-h-80 overflow-auto">
          {items.map((item, index) => (
            <li key={index} className="mb-2 font-medium">{item}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Popup;
