import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { addConnections } from '../utils/connectionSlice'
import { useDispatch, useSelector } from 'react-redux'

const Connections = () => {
    const dispatch = useDispatch()
    const connections = useSelector((store) => store.connections)
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections",
                { withCredentials: true }
            )
            dispatch(addConnections(res.data.data))
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchConnections()
    }, [])


    if (!connections) return


    const ConnectionsList = ({ connections }) => {
        return (
            <div className="flex flex-col items-center justify-center  mt-5 space-y-5 pb-24">
                <h2 className="text-3xl mb-3 text-sky-50">Connections</h2>
                {connections.length == 0 ? (
                    <p className="text-center text-gray-500">No connections found.</p>
                ) : (
                    connections.map((connection, index) => {
                        const { firstName, lastName, photoUrl, about, age, gender, } = connection;
                        return (
                            <div
                                key={index}
                                className="flex items-center bg-base-200 shadow-lg rounded-lg overflow-hidden w-full max-w-xl mx-auto h-40"
                            >
                                <figure className="w-2/6 flex justify-center items-center h-full">

                                    <img
                                        src={photoUrl}
                                        alt={`${firstName}'s profile`}
                                        className="h-24 w-24 object-cover rounded-full"
                                    />
                                </figure>
                                <div className="w-3/5 p-4 text-sky-50">
                                    <h2 className="text-xl font-semibold">{firstName + " " + lastName}</h2>
                                    {(age || gender) && <p>{age + " " + gender}</p>}
                                    {about && <p className="mb-4 max-h-20 overflow-y-auto">{about}</p>}
                                </div>
                            </div>


                        );
                    })
                )}
            </div>
        );



    };
    return (
        <ConnectionsList connections={connections} />
    )
}

export default Connections