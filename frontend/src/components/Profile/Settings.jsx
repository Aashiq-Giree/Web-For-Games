import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TimeSpend from '../TimeSpend/TimeSpend';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Settings() {
  const [Value, setValue] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState();
  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    id: localStorage.getItem("id")
  };

  const change = (e) =>{
    const {name, value} = e.target;
    setValue({...Value, [name]: value})
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:1000/api/user/user-info", { headers });
      setProfileData(response.data);
      setValue({address:response.data.address});
    };
    getData();
  }, [])


  const submitAddress = async () =>{
    const response = await axios.put("http://localhost:1000/api/user/update-address", Value, {headers})
    toast.success(response.data.message);
  };

  return (
    <>
      {!ProfileData && (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      )
      }{" "}
      {ProfileData && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-2xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            Settings
          </h1>
          <div className='flex gap-12'>
            <div>
              <label htmlFor="">Username</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
                {ProfileData.username}
              </p>
            </div>
            <div className=''>
              <label htmlFor="">Email</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
                {ProfileData.email}
              </p>
            </div>
            <div>
              <label htmlFor="">Total Time Spent</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
                {<TimeSpend/>}
              </p>
            </div>
          </div>
          <div className='mt-4 flex flex-col'>
            <label htmlFor="">
              Address
            </label>
            <textarea
              className='p-2 rounded bg-zinc-800 mt-2 font-semibold'
              row-5
              placeholder='Address'
              name="address"
              value={Value.address}
              onChange={change} />
          </div>
          <div className='mt-4 flex justify-end'>
            <button className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300'
            onClick={submitAddress}>
              Update
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Settings
