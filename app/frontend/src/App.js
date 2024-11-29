import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import NoSite from './pages/NoSite';
import NavBar from './pages/NavBar';
import Footer from './pages/FootBar';
import SelectMovies from './pages/SelectMovies';
import ShowMovies from './pages/ShowMovies';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const App = () => {
    const [primaryColor, setPrimaryColor] = useState('#6F00FF');
    const [secondaryColor, setSecondaryColor] = useState('#6F00FF');
    const [textColor, setTextColor] = useState('#000000');
    const [language, setLanguage] = useState('Deutsch');
    const [search, setSearch] = useState('');
    const [movieSearch, setMovieSearch] = useState('');
    const [user, setUser] = useState(null);
    const [currentMovies, setCurrentMovies] = useState([]);
    const [currentMoviePage, setCurrentMoviePage] = useState(1);
    const [currentGenre, setCurrentGenre] = useState([]);
    
    const [genres, setGenres] = useState([]);
    const [allMovies, setAllMovies] = useState([]);

    const comp1 = {
        title: 'Star Wars IV',
        description: 'Tom\'s favourite movie of all time.',
        release: '07.11.1977'
    };

    const comp2 = {
        title: 'The Wild Robot',
        description: 'Sebastian\'s favourite movie of all time.',
        release: '11.10.2024'
    };

    const comp3 = {
        title: 'Poor Things',
        description: 'Valentina\'s favourite movie of all time.',
        release: '08.12.2023'
    };

    const comp4 = {
        title: 'The Godfather',
        description: 'Heard it is good.',
        release: '20.10.1972'
    };

    const comp5 = {
        title: 'El Clásico 2024',
        description: 'Most extreme horror movie for fans of Real Madrid.',
        release: '26.10.2024'
    };

    const comp6 = {
        title: 'Blackfish',
        description: 'Documentary about orcas.',
        release: '31.10.2013'
    };

    const handleColorChange = (primary, secondary, text) => {
        setPrimaryColor(primary);
        setSecondaryColor(secondary);
        setTextColor(text);
    };
    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
    };

    const handleSearchChange = (newSearch) => {
        setSearch(newSearch);
    }

    const handleMovieSearchChange = (newSearch) => {
        setMovieSearch(newSearch);
        loadCurrentMovies();
    }

    const handleGenreChange = (newGenre) => {
        if (!newGenre || newGenre.trim() === '') {
            setCurrentGenre('');
        } else {
            setCurrentGenre(newGenre);
        }
    }

    const loadCurrentMovies = () => {
        // filter all Movies by genre, word, year and return the first 10
        setCurrentMovies(allMovies.slice(0, 6));
    }

    const loadAllMovies = async (index, event) => {
        try {
            setAllMovies([comp1, comp2, comp3, comp4, comp5, comp6]);
            console.log("Movies saved.")
            setGenres([' ', 'Science Fiction', 'Fantasy', 'Thriller', 'Comedy']);
            console.log("Genres saved.");
            loadCurrentMovies();
            console.log("Current movies loaded.");
            // const response = await fetch(`/api/movies`, {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // });

            // const result = await response.json();
            // // save result in allMovies constant
            // // save genres from allMovies in genres constant
            // console.log('Movies saved:', result);
        } catch (error) {
            console.error('Error handling user interaction:', error);
        }
    };

    useEffect(() => {
        // Set CSS variables for theming
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--secondary-color', secondaryColor);
        document.documentElement.style.setProperty('--text-color', textColor);
    
        loadAllMovies();
    
    }, [primaryColor, secondaryColor, textColor]); 

    return (
        <div className="App">
            <Router>
                <NavBar onColorChange={handleColorChange} onLanguageChange={handleLanguageChange} onSearchChange={handleSearchChange} language={language} /> 
                <Routes>
                    <Route exact path="/" element={<SelectMovies user={user} language={language} search={search} onSearchChange={handleMovieSearchChange} currentMovies={currentMovies} genres={genres} currentGenre={currentGenre} onGenreChange={handleGenreChange} />} />
                    <Route exact path="/recommendations" element={<ShowMovies user={user} language={language} search={search} onSearchChange={handleMovieSearchChange} currentMovies={currentMovies} genres={genres} currentGenre={currentGenre} onGenreChange={handleGenreChange} />} />
                    <Route path="*" element={<NoSite language={language} />} />
                </Routes>
                <Footer language={language} />
            </Router>
        </div>
    );
}

export default App;