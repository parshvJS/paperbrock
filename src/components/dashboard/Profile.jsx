import React from 'react'

const Profile = () => {
    const {id} = useParams()
  return (
    <div>{id}</div>
  )
}

export default Profile