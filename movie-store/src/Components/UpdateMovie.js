import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    FormControl,
    Input,
    InputLabel,
    Avatar,
} from '@mui/material';

const UpdateMovie = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState({ name: '', year: '', posterImage: '' });
    const [previewImage, setPreviewImage] = useState(''); // For previewing the image

    useEffect(() => {
        // Fetch the movie details
        axios.get(`https://localhost:7123/api/movies/${id}`)
            .then((response) => {
                setMovie(response.data);
                setPreviewImage(response.data.posterImage); // Initialize preview image
            })
            .catch((err) => console.error(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://localhost:7123/api/movies/${id}`, movie)
            .then(() => {
                alert('Movie updated successfully!');
                navigate('/');
            })
            .catch((err) => console.error(err));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result); // Show the new image
                setMovie({ ...movie, posterImage: reader.result }); // Update the movie's posterImage
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(movie.posterImage); // If canceled, revert to the existing image
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Update Movie
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    mt: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <TextField
                    label="Name"
                    variant="outlined"
                    value={movie.name}
                    onChange={(e) => setMovie({ ...movie, name: e.target.value })}
                    fullWidth
                />
                <TextField
                    label="Year"
                    type="number"
                    variant="outlined"
                    value={movie.year}
                    onChange={(e) => setMovie({ ...movie, year: e.target.value })}
                    fullWidth
                />
                <FormControl>
                    <InputLabel htmlFor="poster-image" shrink>Poster Image</InputLabel>
                    <Input
                        id="poster-image"
                        type="file"
                        inputProps={{ accept: 'image/*' }}
                        onChange={handleImageChange}
                    />
                </FormControl>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    {previewImage && (
                        <Avatar
                            src={previewImage}
                            alt="Movie Poster Preview"
                            sx={{
                                width: 150,
                                height: 150,
                                margin: '0 auto',
                                border: '1px solid #ccc',
                            }}
                        />
                    )}
                </Box>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Update Movie
                </Button>
            </Box>
            {/* Back to Home Button */}
            <Box sx={{ mt: 2 }}>
                <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={() => navigate('/')} // Navigate back to home
                >
                    Back to Home
                </Button>
            </Box>
        </Container>
    );
};

export default UpdateMovie;
