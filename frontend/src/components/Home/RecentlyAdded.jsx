import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import GameCard from '../GameCard/GameCard'
import Loader from '../Loader/Loader';
function RecentlyAdded() {
    const [Data, setData] = useState();
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get("http://localhost:1000/api/game/get-recent-games");
                setData(response.data.data);
            } catch (error) {
                console.log(error);
            }
           
        };
        getData();
       

    }, []);
    return (
        <div className='mt-8 px-4 '>
            <h4 className='text-3xl text-yellow-100'>Recently Added Games</h4>
            {!Data && <div className='flex items-center justify-center my-8'> <Loader /> </div>}
            <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
                { Data && Data.map((items, i) => <div key={i}>
                    <GameCard data={items}/>
                    </div>)}
            </div>
        </div>
    )
}

export default RecentlyAdded
