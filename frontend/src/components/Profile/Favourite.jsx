import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import GameCard from '../GameCard/GameCard';

function Favourite() {
  const { id } = useParams();
  const [FavouriteGames, setFavouriteGames] = useState();
  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`   
  }
  
  const getData = async () => {
    const response = await axios.get("http://localhost:1000/api/game/get-favourite-games/" + localStorage.getItem("id"),
     {headers: {
        ...headers
      }
    }
    
    );
    setFavouriteGames(response.data.data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {FavouriteGames && FavouriteGames === 0 &&
        <div className='text-5xl font-semibold text-zinc-500 h-[100%] flex items-center justify-center flex-col w-full '>
          No Favourite Games
          <img src="" alt="no-fav-games" />
        </div>}

      <div className='grid grid-cols-4 gap-4'>
        {FavouriteGames &&
          FavouriteGames.map((items, i) => (
            <div key={i}>
              <GameCard onSuccess={getData} data={items} favourite={true} />
            </div>
          ))}
      </div>
    </>

  )
}

export default Favourite
