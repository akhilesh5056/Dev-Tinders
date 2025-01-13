import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';

const Request = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.request); 
    const reviewRequest = async (status, _id) => {
        try {
            await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {
                withCredentials: true,
            });
            dispatch(removeRequest(_id)); 
        } catch (error) {
            console.error("Error reviewing request:", error);
        }
    };

    const fetchRequest = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/request/received", {
                withCredentials: true,
            });
            dispatch(addRequest(res.data.data)); 
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    useEffect(() => {
        fetchRequest();
    }, []);

    if (!requests || requests.length === 0) {
        return (
            <div className="flex items-center justify-center mt-5">
                <p className="text-center text-gray-500">No requests found.</p>
            </div>
        );
    }

    const RequestsList = ({ requests }) => (
        <div className="flex flex-col items-center justify-center mt-5 space-y-5 pb-24">
            <h2 className="text-3xl mb-3 text-sky-50">Requests</h2>
            {requests.map((request) => {
                const { firstName, lastName, photoUrl, about, age, gender } = request.fromUserId;
                return (
                    <div
                        key={request._id}
                        className="flex items-center bg-base-200 shadow-lg rounded-lg overflow-hidden w-full max-w-xl mx-auto h-40 space-y-4"
                    >
                        <figure className="w-2/6 flex justify-center h-full items-center">
                            <img
                                src={photoUrl}
                                alt={`${firstName}'s profile`}
                                className="h-24 w-24 object-cover rounded-full"
                            />
                        </figure>
                        <div className="w-3/5 p-4 text-sky-50">
                            <h2 className="text-xl font-semibold">
                                {firstName + " " + lastName}
                            </h2>
                            {(age || gender) && <p>{age + " " + gender}</p>}
                            {about && <p className="mb-4">{about}</p>}
                        </div>
                        <div className="w-1/5 flex flex-col space-y-2 pr-4 items-center">
                            <button
                                className="bg-primary hover:bg-primary-focus text-white py-2 px-4 rounded-lg"
                                onClick={() => reviewRequest("accepted", request._id)}
                            >
                                Accept
                            </button>
                            <button
                                className="bg-secondary hover:bg-secondary-focus text-white py-2 px-4 rounded-lg"
                                onClick={() => reviewRequest("rejected", request._id)}
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    return <RequestsList requests={requests} />;
};

export default Request;
