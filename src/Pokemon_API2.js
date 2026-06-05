import React, { useEffect, useState } from "react";
import axios from "axios";

function Pokemon_API2({ name, url }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios.get(url).then(res => setDetails(res.data));
  }, [url]);

  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <h3>{name}</h3>
      {details && (
        <>
          <img src={details.sprites.front_default} alt={name} />
          <p>Height: {details.height}</p>
          <p>Weight: {details.weight}</p>
          <p>Type: {details.types.map(t => t.type.name).join(", ")}</p>
        </>
      )}
    </div>
  );
}

export default Pokemon_API2;
