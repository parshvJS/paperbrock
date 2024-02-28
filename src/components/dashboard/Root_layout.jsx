import React from 'react'
import User_nav from '../User_nav'
import { Outlet } from 'react-router-dom'
import { useUserContext } from '../../context/authChecked'

const Root_layout = () => {
  const { collapsedCon } = useUserContext()
  return (
    <div className='flex flex-1'>
      <div className={`${collapsedCon ? 'w-[310px]' : 'w-20'}`}>
        <User_nav />
      </div>
      <Outlet />
    </div>

  )
}

export default Root_layout