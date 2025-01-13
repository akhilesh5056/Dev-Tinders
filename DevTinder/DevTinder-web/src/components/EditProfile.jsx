import React from 'react'
import { useState } from 'react'
import Card from './Card'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const [age, setAge] = useState(user.age||"")
    const [gender, setGender] = useState(user.gender)
    const [about, setAbout] = useState(user.about)
    const [showToast, setShowToast] = useState(false)
    const [error, setError] = useState()
    const dispatch = useDispatch()

    

    const saveProfile = async () => {

        try {
            const res = await axios.patch(BASE_URL + "/profile/edit",
                {
                    firstName,
                    lastName,
                    photoUrl,
                    age,
                    gender,
                    about
                },
                { withCredentials: true }
            )
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 2000)
            dispatch(addUser(res.data))

        } catch (error) {
            setError(error)
        }
    }


    return (
        <div className='flex justify-center gap-5'>
            <div className='flex justify-center mt-5 mb-16'>
                <div className="card bg-base-300 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title flex justify-center">Edit Profile</h2>
                        <div>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">First Name</span>
                                </div>
                                <input className="input input-bordered w-full max-w-xs"
                                    type="text"
                                    value={firstName}
                                    placeholder=""
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs mt-3">
                                <div className="label">
                                    <span className="label-text">Last Name</span>
                                </div>
                                <input className="input input-bordered w-full max-w-xs"
                                    type="text"
                                    value={lastName}
                                    placeholder=""
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs mt-3">
                                <div className="label">
                                    <span className="label-text">Photo URL</span>
                                </div>
                                <input className="input input-bordered w-full max-w-xs"
                                    type="text"
                                    value={photoUrl}
                                    placeholder=""
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs mt-3">
                                <div className="label">
                                    <span className="label-text">Age</span>
                                </div>
                                <input className="input input-bordered w-full max-w-xs"
                                    type="number"
                                    value={age}
                                    placeholder=""
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs mt-3">
                                <div className="label">
                                    <span className="label-text">Gender</span>
                                </div>
                                <select className="select select-bordered w-full max-w-xs"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}>
                                    <option disabled >Select gender</option>
                                    <option >male</option>
                                    <option >female</option>
                                </select>
                            </label>
                            <label className="form-control w-full max-w-xs mt-3">
                                <div className="label">
                                    <span className="label-text">About</span>
                                </div>
                                <input className="input input-bordered w-full max-w-xs"
                                    type="text"
                                    value={about}
                                    placeholder=""
                                    onChange={(e) => setAbout(e.target.value)}
                                />
                            </label>
                            <p className="text-red-700">{error?.response?.data}</p>
                        </div>
                        <div className="card-actions justify-center mt-3">
                            <button
                                onClick={saveProfile}
                                className="btn btn-primary">Save Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            <div><Card user={{ firstName, lastName, photoUrl, age, gender, about }} /></div>
            {showToast && <div className="toast toast-top toast-center">
                <div
                    className="alert alert-success">
                    <span>Profile saved successfully.</span>
                </div>
            </div>}
        </div>
    )
}

export default EditProfile