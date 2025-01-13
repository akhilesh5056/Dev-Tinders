import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { removeFeed } from '../utils/feedSlice'
import { useDispatch } from 'react-redux'

const Card = ({ user }) => {

    const dispatch=useDispatch()
    if (!user) return
    const { _id, firstName, lastName, photoUrl, age, gender, about } = user

    const handleSendRequest = async(status, userId) => {
       try {
        const res=await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,
            {},
            {withCredentials:true})
            dispatch(removeFeed(userId))
       } catch (error) {
        console.log(error)
       }
    }


    return (
        <div className='flex justify-center pb-20'>
            <div className="card card-compact bg-base-300 w-96 shadow-xl mt-5 ">
                <figure>
                    <img
                        src={photoUrl}
                        alt="User photo" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    {(age || gender) && <p>{age + " " + gender}</p>}
                    {about && <p>{about}</p>}
                    <div className="card-actions justify-center mt-3">
                        <button
                            onClick={() => { handleSendRequest("ignored", _id) }}
                            className="btn btn-primary"
                        >ignore</button>
                        <button
                        onClick={()=>{handleSendRequest("interested",_id)}}
                            className="btn btn-secondary"
                        >Interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card