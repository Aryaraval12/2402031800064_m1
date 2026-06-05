import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
// can not read property 'contentType' of undefined error is coming because of the way the image data is being accessed in the component. 
// The issue likely arises from the structure of the response data from the backend. To fix this, you need to ensure 
// that the response data is correctly structured and that you are accessing the image data properly in your React component.


function Display_Image() {
    const [images, setImages] = useState([]);

    const fetchImages = async () => {
        try {
            const res = await axios.get('http://localhost:5000/Getimages');
            setImages(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);
    return (
        <div class="container-fluid m-3" style={{ padding: '20px' }}>
            <h2>Display Images (MERN)</h2>
            <div class="row" style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
               {images.map((img, idx) => (
  img && img.data && img.contentType ? (
    <div key={idx} className="col-md-4" style={{ margin: '10px' }}>
      <img
        src={`data:${img.contentType};base64,${img.data}`}
        alt={img.name || 'Image'}
        style={{ width: '200px', height: 'auto', border: '1px solid #ccc' }}
      />
      <p>{img.name}</p>
    </div>
  ) : null
))}

            </div>
        </div>
    );
}
export default Display_Image;
