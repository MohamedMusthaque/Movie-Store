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

    return (
        <div>
            <h1>Movies</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h2>{movie.name} ({movie.year})</h2>
                        <img src={movie.posterImage} alt={movie.name} style={{ width: '150px' }} />
                        <br />
                        <Link to={`/update/${movie.id}`}>
                            <button>Edit</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieList;
