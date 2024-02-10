import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='w-full h-5 md:h-7'>
            <div className='bg-blue-800  h-4 md:h-6 flex justify-center items-center '>
                <p className='text-white m-2'>copyright | <Link to="paperbrock.vercel.com">paperbrock</Link> @ all right reserved  </p>
            </div>
        </footer>
    )
}

export default Footer