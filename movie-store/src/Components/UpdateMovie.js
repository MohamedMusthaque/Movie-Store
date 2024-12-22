import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateMovie = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState({ name: '', year: '', posterImage: '' });

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then((response) => setMovie(response.data))
            .catch((err) => console.error(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(() => {
                alert('Movie updated successfully!');
                navigate('/');
            })
            .catch((err) => console.error(err));
    };

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
            <button type="submit">Update Movie</button>
        </form>
    );
};

export default UpdateMovie;
