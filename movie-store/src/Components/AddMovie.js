import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Input,
    InputLabel,
    FormControl,
} from '@mui/material';

const AddMovie = () => {
    const [movie, setMovie] = useState({ name: '', year: '', posterImage: '' });
    const navigate = useNavigate();
    const fileInputRef = useRef(null); // Ref for the file input

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`https://localhost:7123/api/movies`, movie)
            .then(() => {
                alert('Movie added successfully!');
                navigate('/');
            })
            .catch((err) => console.error(err));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setMovie({ ...movie, posterImage: reader.result });
            };
            reader.readAsDataURL(file);
        } else {
            // Reset the file input if "Cancel" is pressed
            fileInputRef.current.value = '';
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Add Movie
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    value={movie.name}
                    onChange={(e) => setMovie({ ...movie, name: e.target.value })}
                />
                <TextField
                    fullWidth
                    label="Year"
                    type="number"
                    variant="outlined"
                    margin="normal"
                    value={movie.year}
                    onChange={(e) => setMovie({ ...movie, year: e.target.value })}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="poster-image" shrink>Poster Image</InputLabel>
                    <Input
                        id="poster-image"
                        type="file"
                        inputProps={{ accept: 'image/*' }}
                        onChange={handleImageChange}
                        inputRef={fileInputRef} // Attach the ref here
                    />
                </FormControl>
                <Box sx={{ mt: 3 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Add Movie
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
            </Box>
        </Container>
    );
};

export default AddMovie;
