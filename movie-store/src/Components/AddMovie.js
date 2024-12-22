import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
    const [movie, setMovie] = useState({ name: '', year: '', posterImage: '' });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/movies`, movie)
            .then(() => {
                alert('Movie added successfully!');
                navigate('/');
            })
            .catch((err) => console.error(err));
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setMovie({ ...movie, posterImage: reader.result });
        };
        reader.readAsDataURL(file);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={movie.name}
                onChange={(e) => setMovie({ ...movie, name: e.target.value })}
            />
            <input
                type="number"
                placeholder="Year"
                value={movie.year}
                onChange={(e) => setMovie({ ...movie, year: e.target.value })}
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />
            <button type="submit">Add Movie</button>
        </form>
    );
};

export default AddMovie;
