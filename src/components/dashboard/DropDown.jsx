import React, { useEffect, useState } from 'react';

const DropDown = ({ onStreamChange, widthSize, options }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onStreamChange(selectedValue);
  };
  useEffect(()=>{
    console.log(options);

  },[])

  return (
    <div className={`mb-4 w-${widthSize}`}>
      <label htmlFor="stream" className="block text-gray-950">Education Stream</label>
      <div>
        <select
          className="w-full mt-1 border-gray-950 rounded-md border-2 bg-white  rounded-b-md bg-none py-2 px-3 focus:outline-none focus:border-blue-500"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="" disabled>Select Your Education Stream</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DropDown;
