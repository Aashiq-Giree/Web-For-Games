import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function GameCard({ data, favourite, onSuccess }) {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    const handleRemoveGame = async (e, id) => {
        e.preventDefault();
        const headers = {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const response = await axios.put("http://localhost:1000/api/game/remove-game-favourite",
            {
                gameId: id,
                id: localStorage.getItem("id"),
            },
            { headers }
        );
        onSuccess();
        toast.warning(response.data.message)
    };
    return (
        <div className='b-zinc-800 rounded p-4 flex flex-card'>
            <Link to={`/view-game-details/${data._id}`}>
                <div className=' '>
                    <div className='bg-zinc-900 rounded flex items-center justify-center'>
                        <img src={`${import.meta.env.VITE_API_URL}${data.image}`} alt="" className='h-[25vh]' />
                    </div>
                    <div className='mt-4 text-xl text-white font-semibold'>{data.title}</div>
                    <p className='mt-2 mb-2 text-zinc-400 font-semibold'>{data.categories}</p>

                    <div className='flex items-center justify-between'>
                        {isLoggedIn === true && role === "user" && (
                            <div>
                                <Link to={`/play-game/${data._id}`}
                                    className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300'
                                >
                                    Play Now
                                </Link>
                            </div>
                        )}

                        <div>
                            {
                                favourite && (
                                    <button className='bg-yellow-50 px-3 py-2 text-zinc-500 rounded  border-yellow-500 hover:bg-yellow-100 transition-all duration-300'
                                        onClick={(e) => handleRemoveGame(e, data._id)}
                                    >
                                        Remove</button>
                                )
                            }
                        </div>
                    </div>

                </div>
            </Link>





        </div >
    )
}

export default GameCard
