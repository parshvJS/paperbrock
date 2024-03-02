import React from 'react'
import { quotes } from '../constants';
import bg_title from '../assets/title-bg.svg'
import { useUserContext } from '../context/authChecked';

const QuoteFamiliy = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const { user } = useUserContext()



    return (
        <div className={`bg-cover bg-center w-full h-32 flex justify-center items-center`} style={{ backgroundImage: `url(${bg_title})` }}>
            <p className=' text-[16px] md:text-[26px] text-white font-semibold text-center'>{`${user.fullName ? user.fullName.split(' ')[0] + "," : ""}  ${randomQuote}`}</p>
        </div>)
}

export default QuoteFamiliy