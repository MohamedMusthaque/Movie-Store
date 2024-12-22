import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/movies`)
            .then((response) => setMovies(response.data))
            .catch((err) => console.error(err));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            axios.delete(`${process.env.REACT_APP_API_URL}/movies/${id}`)
                .then(() => setMovies(movies.filter((movie) => movie.id !== id)))
                .catch((err) => console.error(err));
        }
    };

    return (
        <div>
            <h1>Movies</h1>
            <Link to="/add">
                <button style={{ marginBottom: '20px' }}>Add Movie</button>
            </Link>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h2>{movie.name} ({movie.year})</h2>
                        <img src={movie.posterImage} alt={movie.name} style={{ width: '150px' }} />
                        <br />
                        <Link to={`/update/${movie.id}`}>
                            <button>Edit</button>
                        </Link>
                        <button onClick={() => handleDelete(movie.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieList;
