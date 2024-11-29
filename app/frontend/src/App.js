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
    const moviesPerPage = 10;
    const [primaryColor, setPrimaryColor] = useState('#6F00FF');
    const [secondaryColor, setSecondaryColor] = useState('#6F00FF');
    const [textColor, setTextColor] = useState('#000000');
    const [language, setLanguage] = useState('Deutsch');
    const [search, setSearch] = useState('');
    const [movieSearch, setMovieSearch] = useState('');
    const [user, setUser] = useState(null);
    const [currentMovies, setCurrentMovies] = useState([]);
    const [currentMoviePage, setCurrentMoviePage] = useState(1);
    const [currentGenre, setCurrentGenre] = useState('');
    const [selectedMovies, setSelectedMovies] = useState({});
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [recommendedMoviesRating, setRecommendedMoviesRating] = useState([]);
    
    const [loadingMovies, setLoadingMovies] = useState(true); 
    const [loadingRecommendedMovies, setLoadingRecommendedMovies] = useState(true); 
    const [genres, setGenres] = useState([]);
    const [allMovies, setAllMovies] = useState([]);

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
        setCurrentMoviePage(1);
        loadCurrentMovies();
    }

    const handleGenreChange = (newGenre) => {
        if (!newGenre || newGenre.trim() === '') {
            setCurrentGenre('');
        } else {
            setCurrentGenre(newGenre);
        }
        setCurrentMoviePage(1);
        loadCurrentMovies();
    }

    const handleInteraction = (star, id) => {
        const newSelectedMovies = selectedMovies;
        newSelectedMovies[id] = star;
        setSelectedMovies(newSelectedMovies);
        console.log("Interaction saved.");
        console.log(selectedMovies);
    };    

    const loadCurrentMovies = () => {
        let newCurrentMovies = [];
        let counter = 0;
        for (let movie of allMovies) {
            if (!currentGenre || currentGenre.trim() === '' || movie.genres.includes(currentGenre)) {
                counter ++;
                if (counter > moviesPerPage * (currentMoviePage-1)) {
                    if (!movieSearch || movieSearch.trim() === '' || movie.title.startsWith(movieSearch)) {
                        newCurrentMovies.push(movie);
                        if (counter >= moviesPerPage * currentMoviePage) {
                            break;
                        }
                    }
                }
            }
        }
        setCurrentMovies(newCurrentMovies);
    } 

    const loadRecommendations = async () => {
        try {
            const fetchData = async () => {
                try {
                    const response = await fetch("http://127.0.0.1:5000/api/recommendations", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(Object.fromEntries(Object.entries(selectedMovies).slice(0, 10)))
                    });
                    console.log(selectedMovies);
                    const data = await response.json();  
                    let recommendations = [];
                    let recommedationsRating = [];
                    for (let d of data) {
                        recommendations.push(allMovies[d.item_id]);
                        recommedationsRating.push(d.rating);
                    } 
                    setRecommendedMovies(recommendations);
                    setRecommendedMoviesRating(recommedationsRating);
                    setLoadingRecommendedMovies(false);
                    if (data) {
                        console.log('Recommendations:', data);
                    } else {
                        console.error('No recommendations.');
                    }
                } catch (error) {
                    console.error('Error fetching recommendations:', error);
                }
            };
            fetchData();
        } catch (error) {
            console.error('Error while loading recommended movies:', error)
        }
    }

    const loadAllMovies = async () => {
        try {
            const fetchData = async () => {
                try {
                    const response = await fetch("http://127.0.0.1:5000/api/movies");
                    const data = await response.json();
                    if (data) {
                        console.log('Movies found:', data);
                        setAllMovies(data);
                    } else {
                        console.error('Movies not found.');
                    }
                } catch (error) {
                    console.error('Error fetching movie data:', error);
                }
            };
            fetchData();

            const fetchGenreData = async () => {
                try {
                    const response = await fetch("http://127.0.0.1:5000/api/genres");
                    const data = await response.json();
                    if (data && data !== "unknown") {
                        console.log('Genres found:', data);
                        setGenres(data);
                    } else {
                        console.error('Genres not found.');
                    }
                } catch (error) {
                    console.error('Error fetching genres data:', error);
                }
            };
            fetchGenreData();

            loadCurrentMovies();
            setLoadingMovies(false);
            console.log("Current movies loaded.");
        } catch (error) {
            console.error('Error while loading all movies:', error);
        }
    };

    useEffect(() => {
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--secondary-color', secondaryColor);
        document.documentElement.style.setProperty('--text-color', textColor);
    
    }, [primaryColor, secondaryColor, textColor]); 

    useEffect(() => {
        if (allMovies.length === 0) {  // Check if movies have already been loaded
            loadAllMovies();
        }
    });

    return (
        <div className="App">
            <Router>
                <NavBar onColorChange={handleColorChange} onLanguageChange={handleLanguageChange} onSearchChange={handleSearchChange} language={language} /> 
                <Routes>
                    <Route exact path="/" element={<SelectMovies user={user} language={language} search={search} onSearchChange={handleMovieSearchChange} currentMovies={currentMovies} genres={genres} currentGenre={currentGenre} onGenreChange={handleGenreChange} handleInteraction={handleInteraction} loadRecommendations={loadRecommendations} loadingMovies={loadingMovies} selectedNumber={Object.keys(selectedMovies).length} />} />
                    <Route exact path="/recommendations" element={<ShowMovies user={user} language={language} currentMovies={recommendedMovies} loadingMovies={loadingRecommendedMovies} predictions={recommendedMoviesRating} />} />
                    <Route path="*" element={<NoSite language={language} />} />
                </Routes>
                <Footer language={language} />
            </Router>
        </div>
    );
}

export default App;