import React from 'react'
import { useUserContext } from '../../context/authChecked'

const Home_dashboard = () => {
  const {setUser,user} = useUserContext()

  return (
    <div>{user.id}</div>
  )
}

export default Home_dashboard