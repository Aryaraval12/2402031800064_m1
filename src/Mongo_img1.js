import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

function ImageUpload() {
    const [file, setFile] = useState(null);
    const [images, setImages] = useState([]);

    const fetchImages = async () => {
        try {
            const res = await axios.get('http://localhost:5000/upload');
            setImages(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return alert('Please select a file');

        const formData = new FormData();
        formData.append('image', file);

        try {
            await axios.post('http://localhost:5000/photo', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Image uploaded successfully');
            fetchImages();
        } catch (err) {
            console.error(err);
            alert('Upload failed');
        }
    };
    return (
        <div class="container-fluid m-3" style={{ padding: '20px' }}>
            <h2>Image Upload & Display (MERN)</h2>
            <form onSubmit={handleUpload}>
                <input type="file" class="form-control" onChange={(e) => setFile(e.target.files[0])} /> <br />
                <button type="submit" class="btn btn-primary">Upload</button>
            </form>
            <div class="row" style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                {images.map((img, idx) => (
                    <div key={idx} class="col-md-4" style={{ margin: '10px' }}>
                        <img
                            src={`data:${img.img.contentType};base64,${img.img.data}`}
                            alt={img.name}
                            style={{ width: '200px', height: 'auto', border: '1px solid #ccc' }}
                        />
                        <p>{img.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageUpload;
