import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import axios from "axios"
import Card from './Card'

const Feed = () => {
  const dispatch = useDispatch()
  const feed = useSelector((store) => store.feed)

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true })
      dispatch(addFeed(res.data.user))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getFeed()
  }, [])

  if(!feed) return 
  if(feed.length<=0){
    
    return (<div className=' flex justify-center items-center text-xl mt-10'>
      No more user are  present !
    </div>)
  }
  return (feed && (
    <>
      <Card user={feed[0]} />
    </>
  ))
}

export default Feed