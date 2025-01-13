import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
import Card from './Card'

const Profile = () => {
  const user=useSelector((store)=>store.user)
  return user && (
    <div className='flex justify-center gap-x-7'>
    <div><EditProfile user={user}/></div>
    
    
    </div>
    
  )
}

export default Profile