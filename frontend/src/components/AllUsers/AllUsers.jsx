import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader';
import { FaUserLarge } from "react-icons/fa6";
function AllUsers() {

    const [users, setUsers] = useState([]);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };    

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get("http://localhost:1000/api/user/all-users",
                { headers }
            );
            setUsers(response.data);     

        };
        getData();
    });

    return (
        <>
            {!users && (
                <div className='h-[100%] flex items-center justify-center'>{" "}
                    <Loader />{" "}
                </div>
            )}
            {users && users.length > 0 && (
                <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
                    <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
                        All Users
                    </h1>
                    <div className='mt-4 bg-zinc-800 w-full rounded px-4 py-2 flex gap-2'>
                        <div className='w-[3%]'>
                            <h1 className='text-center'>Sr.</h1>
                        </div>
                        <div className='w-[40%] md:w-[22%]'>
                            <h1>Name</h1>
                        </div>
                        <div className='w-[40%] md:w-[25%]'>
                            <h1>Email</h1>
                        </div>
                        <div className='w-0 md:w-[45%] hidden md:block'>
                            <h1>Address</h1>
                        </div>
                        <div className='w-0 md:w-[30%] hidden md:block'>
                            <h1>Time Spent</h1>
                        </div>
                        <div className='w-[17%] md:w-[9%]'>
                            <h1>Role</h1>
                        </div>
                        <div className='w-[10%] md:w-[5%]'>
                            <h3>
                                <FaUserLarge />
                            </h3>
                        </div>
                    </div>
                    {users.map((user, index) => (
                <div
                    key={user._id}
                    className="mt-4 bg-zinc-900 w-full rounded px-4 py-2 flex gap-2"
                >
                    <div className="w-[3%]">
                        <h1 className="text-center">{index + 1}</h1>
                    </div>
                    <div className="w-[40%] md:w-[22%]">
                        <h1>{user.username || 'N/A'}</h1>
                    </div>
                    <div className="w-[40%] md:w-[25%]">
                        <h1>{user.email || 'N/A'}</h1>
                    </div>
                    <div className="w-0 md:w-[45%] hidden md:block">
                        <h1>{user.address || 'N/A'}</h1>
                    </div>
                    <div className="w-0 md:w-[30%] hidden md:block">
                        <h1>{user.duration || 'N/A'}</h1>
                    </div>
                    <div className="w-[17%] md:w-[9%]">
                        <h1>{user.roles || 'N/A'}</h1>
                    </div>
                    <div className="w-[10%] md:w-[5%]">
                        {user.roles === "user" && <FaUserLarge  />}
                        {user.roles === "admin" && <FaUserLarge className='text-red-500'  />}
                        
                    </div>
                </div>
            ))}
                </div>
            )}
        </>
    )
}

export default AllUsers
