import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Box,
    Container,
} from '@mui/material';

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7123/api/movies`)
            .then((response) => setMovies(response.data))
            .catch((err) => console.error(err));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            axios.delete(`https://localhost:7123/api/movies/${id}`)
                .then(() => setMovies(movies.filter((movie) => movie.id !== id)))
                .catch((err) => console.error(err));
        }
    };

    return (
        <Container sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Movies
            </Typography>
            {/* Add Movie Button */}
            <Box sx={{ textAlign: 'right', marginBottom: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/add"
                >
                    Add Movie
                </Button>
            </Box>
            <Grid container spacing={3}>
                {movies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} key={movie.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={movie.posterImage}
                                alt={movie.name}
                            />
                            <CardContent>
                                <Typography variant="h6">{movie.name}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    ({movie.year})
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        component={Link}
                                        to={`/update/${movie.id}`}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDelete(movie.id)}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default MovieList;
