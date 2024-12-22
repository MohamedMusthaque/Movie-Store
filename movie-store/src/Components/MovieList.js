import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
                {movies.map(movie => (
                    <li key={movie.id}>{movie.name} ({movie.year})</li>
                ))}
            </ul>
        </div>
    );
};

export default MovieList;
