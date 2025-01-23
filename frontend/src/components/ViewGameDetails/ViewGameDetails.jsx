import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function ViewGameDetails() {
    const { id } = useParams();
    const [Data, setData] = useState();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(`http://localhost:1000/api/game/game-by-id/${id}`);
            setData(response.data.data);
        };
        getData();

    }, []);

    const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const handleFavourite = async () => {
        const response = await axios.put("http://localhost:1000/api/game/add-favourite",
            {
                id: localStorage.getItem("id"),
                gameId: id
            },
            { headers });
        toast.success(response.data.message);
    };

    const deleteGame = async (id) => {
        console.log(Data._id,"from delete");
        const response = await axios.delete(`http://localhost:1000/api/game/delete-game/${Data._id}`, { headers });
        toast.warning(response.data.message);
        navigate("/all-games");
    }


    return (
        <>
            {Data && (
                <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start'>
                    <div className='w-full lg:w-3/6 '>
                        <div className='flex flex-col  lg:flex-row justify-around bg-zinc-800 p-12 rounded '>
                            <img src={`${import.meta.env.VITE_API_URL}${Data.image}`} alt=""
                                className='h-[50vh] md:h-[60vh] lg:h-[70vh] rounded' />
                            {isLoggedIn === true && role === "user" &&
                                <div className='flex flex-row  lg:flex-col mt-4 lg:mt-0 '>
                                    <button className='bg-white rounded lg:rounded-full text-3xl px-4 py-2 md:p-3 text-red-500'
                                        onClick={handleFavourite}>
                                        <FaHeart /></button>
                                </div>
                            }
                            {isLoggedIn === true && role === "admin" &&
                                <div className='flex flex-col md:flex-row  items-center justify-between lg:justify-start lg:flex-col mt-8 lg:mt-0 '>
                                    <Link to = {`/update-game/${id}`} className='bg-white rounded lg:rounded-full text-4xl lg:text-3xl px-4 py-3 md:p-3  flex items-center justify-center'>
                                        <FaEdit />
                                        <span className='ms-4 block lg:hidden'>Edit Game</span>
                                    </Link>
                                    <button className='bg-white rounded lg:rounded-full text-3xl px-4 py-2 md:p-3 text-red-500 mt-8 lg:mt-8 md:mt-0'
                                        onClick={deleteGame}>
                                        <MdOutlineDelete />
                                        <span className='ms-4 block lg:hidden'>Delete Game</span>
                                    </button>
                                </div>


                            }
                        </div>
                    </div>
                    <div className='p-4 w-3/6'>
                        <h1 className='text-4xl text-zinc-300 font-semibold'>{Data.title}</h1>
                        <p className='text-zinc-400 mt-1'>{Data.categories}</p>
                        <p className='text-zinc-500 mt-4 text-xl'>{Data.description}</p>
                    </div>
                </div>
            )}
            {!Data && <div className='h-screen bg-zinc-900 flex items-center justify-center'> <Loader /> </div>}
        </>
    )
}

export default ViewGameDetails
