import React, { useEffect, useState } from "react";
import axios from "axios";
 
function Pokemon_API(){
  const [pokemon, setPokemon] = useState([]);
 
  useEffect(() => {
    
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then(res => setPokemon(res.data.results))
      .catch(err => console.error(err));
  }, []);
  return (
    <div>
        <h1>Pokemon List</h1>
            <ul>
        {pokemon.map((p, index) => (
        <li key={index}>{p.name}</li>
        ))}
            </ul>
    </div>
  );
}
export default Pokemon_API;