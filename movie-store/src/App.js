import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddMovie from './Components/AddMovie';
import MovieList from './Components/MovieList';
import UpdateMovie from './Components/UpdateMovie';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MovieList />} />
                <Route path="/add" element={<AddMovie />} />
                <Route path="/update/:id" element={<UpdateMovie />} />
            </Routes>
        </Router>
    );
};

export default App;
