import React from 'react'
import User_nav from '../User_nav'
import { Outlet } from 'react-router-dom'
import { useUserContext } from '../../context/authChecked'
import BottomBar from '../BottomBar'

const Root_layout = () => {
    const { collapsedCon } = useUserContext()
    return (
        <div className='flex flex-1 '>
            <div className={`${collapsedCon ? 'hidden md:block w-[255px]' : 'w-[85px]'}`}>
                <User_nav />
            </div>
            <div className="block md:hidden w-full">
                <BottomBar />
            </div>
            <Outlet />
        </div>

    )
}

export default Root_layout