import React, { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function AddGames() {
    const [Data, setData] = useState({
        url: "",
        title: "",
        description: "",
        image: "",
        categories: ""
    })

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value })
    };

    const submit = async () =>{
        try {
            if(
                Data.url === "" ||
                Data.title === "" ||
                Data.description === "" ||
                Data.image === "" ||
                Data.categories === ""
            ){
                toast.warning("Please fill all the fields");
            }else{
                const response = await axios.post("http://localhost:1000/api/game/add-game", Data, { headers });
                setData({
                    url: "",
                    title: "",
                    description: "",
                    image: "",
                    categories: ""
                });
                toast.success(response.data.message);   
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='h-[100%] p-0 md:p-4'>
            <h1>Add Game</h1>
            <div className='p-4 bg-zinc-800 rounded'>
                <div className=''>
                    <label htmlFor="" className='text-zinc-400'>
                        Game URL
                    </label>
                    <input type="text"
                        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                        placeholder='url of game'
                        name='url'
                        required
                        value={Data.url}
                        onChange={change}
                    />
                </div>
                <div className='mt-4'>
                    <label htmlFor="" className='text-zinc-400'>
                        Title of the Game
                    </label>
                    <input type="text"
                        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                        placeholder='Title of game'
                        name='title'
                        required
                        value={Data.title}
                        onChange={change}
                    />
                </div>
                <div className='mt-4 flex gap-4'>
                    <div className='w-3/6'>
                        <label htmlFor="" className='text-zinc-400'>
                            Insert Image URL
                        </label>
                        <input type="text"
                            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                            placeholder='URL of Image'
                            name='image'
                            required
                            value={Data.image}
                            onChange={change}
                        />
                    </div>
                    <div className='w-3/6'>
                        <label htmlFor="" className='text-zinc-400'>
                            Categories
                        </label>
                        <select name="categories" id="options"
                            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                            value={Data.categories}
                            onChange={change}
                        >
                            <option value="Action">Action</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Horror">Horror</option>
                            <option value="Racing">Racing</option>
                            <option value="Simulation">Simulation</option>
                            <option value="Sports">Sports</option>
                            <option value="Strategy">Strategy</option>
                            <option value="Puzzle">Puzzle</option>
                            <option value="Other">Other</option>

                        </select>
                    </div>

                </div>
                <div className='mt-4'>
                    <label htmlFor="" className='text-zinc-400'>
                        Description of the Game
                    </label>
                    <textarea
                    className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                    rows="5"
                    placeholder='Description of game'
                    name='description'
                    required
                    value={Data.description}
                    onChange={change}
                    />
                </div>

                <button className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300'
                onClick={submit}
                >
                    Add Game
                </button>
            </div>
        </div>
    )
}

export default AddGames
