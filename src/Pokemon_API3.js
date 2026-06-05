import React, { useEffect, useState } from "react";
import axios from "axios";
import Pokemon_API from "./Pokemon_API";

function Pokemon_API3() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=10")
      .then(res => setPokemon(res.data.results));
  }, []);

  return (
    <div>
      <h1>Pokémon Explorer</h1>
      {pokemon.map((p, index) => (
        <Pokemon_API key={index} name={p.name} url={p.url} />
      ))}
    </div>
  );
}

export default Pokemon_API3;
