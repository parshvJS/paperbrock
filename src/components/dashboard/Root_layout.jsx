import React from 'react'
import User_nav from '../User_nav'
import { Outlet } from 'react-router-dom'

const Root_layout = () => {
  return (
    <div className='flex flex-1'>
        <User_nav/>
        <Outlet/>
    </div>
  )
}

export default Root_layout