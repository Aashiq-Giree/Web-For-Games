import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function GamePlayer() {
    const {id} = useParams();
    const [game, setGame] = useState();

    useEffect(() =>{
      const getData = async () =>{
        const response = await axios.get(`http://localhost:1000/api/game/game-by-id/${id}`);
    
        
        setGame(response.data.data);
      };
      getData();
    }, [id]);

  return (
    <div>
      {game &&(
        <div>
        <h2>Playing {game.title}</h2>
        <iframe src={game.url} title={game.title} style={{ width: '100%', height: '100vh' }} />
        </div>
      )}
    </div>
  )
}

export default GamePlayer;
