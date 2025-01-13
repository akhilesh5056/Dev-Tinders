import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from "../utils/constants"

const Login = () => {
  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setisFirstName] = useState()
  const [lastName, setisLastName] = useState()
  const [isLogged, setisLogged] = useState(true)
  const [error, setError] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true })
      dispatch(addUser(res.data.data))
      return navigate("/profile")
    } catch (error) {
      setError(error)
      console.log(error?.response?.data)
    }
  }

  const handleLoginClick = async () => {
    setError("")
    try {
      const res = await axios.post(BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log(res)
      dispatch(addUser(res.data))
      return navigate("/")
    } catch (error) {
      setError(error)
      console.log(error?.response?.data)
    }
  }



  return (
    <div className='flex justify-center mt-5 pb-24'>
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title flex justify-center">{isLogged ? "Login" : "Sign Up"}</h2>
          <div>
            {!isLogged &&
              <>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input className="input input-bordered w-full max-w-xs"
                    type="text"
                    value={firstName}
                    placeholder=""
                    onChange={(e) => setisFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">last Name</span>
                  </div>
                  <input className="input input-bordered w-full max-w-xs"
                    type="text"
                    value={lastName}
                    placeholder=""
                    onChange={(e) => setisLastName(e.target.value)}
                  />
                </label>
              </>
            }
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input className="input input-bordered w-full max-w-xs"
                type="text"
                value={emailId}
                placeholder=""
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs mt-3">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input className="input input-bordered w-full max-w-xs"
                type="text"
                value={password}
                placeholder=""
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <p className="text-red-700">{error?.response?.data}</p>
          </div>

          <div className="card-actions justify-center mt-3">
            <button
              onClick={isLogged ? handleLoginClick : handleSignUp}
              className="btn btn-primary">{isLogged ? "Login" : "Sign Up"}</button>
          </div>
          <p
            onClick={() => setisLogged(value =>!value)}
            className="cursor-pointer flex justify-center items-center mt-5">{isLogged ? "New User? Sign Up" : "Existing User? Login here!"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login