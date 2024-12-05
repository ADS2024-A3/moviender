import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import NoSite from './pages/NoSite';
import NavBar from './pages/NavBar';
import Footer from './pages/FootBar';
import SelectMovies from './pages/SelectMovies';
import ShowMovies from './pages/ShowMovies';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

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

    const handlePageChange = (change) => {
        setCurrentMoviePage(currentMoviePage + change);
        loadCurrentMovies("page");
    }

    const handleReset = () => {
        setMovieSearch("");
        setCurrentGenre("");
        loadCurrentMovies("initial");
    }

    const handleMovieSearchChange = (newSearch) => {
        setMovieSearch(newSearch);
        setCurrentMoviePage(1);
        loadCurrentMovies("search");
    }

    const handleGenreChange = (newGenre) => {
        if (!newGenre || newGenre.trim() === '') {
            setCurrentGenre('');
        } else {
            setCurrentGenre(newGenre);
        }
        setCurrentMoviePage(1);
        loadCurrentMovies("genre");
    }

    const handleInteraction = (star, id) => {
        const newSelectedMovies = selectedMovies;
        newSelectedMovies[id] = star;
        setSelectedMovies(newSelectedMovies);
        console.log("Interaction saved.");
        console.log(selectedMovies);
    };    

    const loadCurrentMovies = useCallback((type, movies = allMovies) => {
        // type specifies why the method is called
        if (type === "page" && currentMoviePage === 0) {
            setCurrentMoviePage(currentMoviePage + 1);
            return; // on page 1 you can't go to the left
        }
        let newCurrentMovies = [];
        let counter = 0;
        for (let movie of movies) {
            if (!currentGenre || currentGenre.trim() === '' || movie.genres.includes(currentGenre)) {
                counter ++;
                if (counter > moviesPerPage * (currentMoviePage-1)) {
                    if (!movieSearch || movieSearch.trim() === '' || movie.title.toLowerCase().startsWith(movieSearch.toLowerCase())) {
                        newCurrentMovies.push(movie);
                        if (counter >= moviesPerPage * currentMoviePage) {
                            break;
                        }
                    }
                }
            }
        }
        if (type === "page" && newCurrentMovies.length === 0) {
            setCurrentMoviePage(currentMoviePage - 1);
            return; // on the last page you can't go to the right
        }
        setCurrentMovies(newCurrentMovies);
    }, [allMovies, currentGenre, currentMoviePage, movieSearch]);

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

    const loadAllMovies = useCallback(async () => {
        const fetchMovies = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/api/movies");
                const data = await response.json();
                if (data) {
                    console.log('Movies found:', data);
                    setAllMovies(data);
                    return data;
                } else {
                    console.error('Movies not found.');
                }
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };

        const fetchGenreData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/api/genres");
                let data = await response.json();
                if (data && data !== "unknown") {
                    console.log('Genres found:', data);
                    data = data.filter(item => item !== "unknown").sort();
                    setGenres(data);
                    return data;
                } else {
                    console.error('Genres not found.');
                }
            } catch (error) {
                console.error('Error fetching genres data:', error);
            }
        };

        fetchGenreData();
        const movies = await fetchMovies();

        loadCurrentMovies("initial", movies);
        setLoadingMovies(false);
        console.log("Current movies loaded.");
    }, [loadCurrentMovies]);

    useEffect(() => {
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--secondary-color', secondaryColor);
        document.documentElement.style.setProperty('--text-color', textColor);
    
    }, [primaryColor, secondaryColor, textColor]); 

    useEffect(() => {
        loadAllMovies();
    }, [loadAllMovies]);

    return (
        <div className="App">
            <Router>
                <NavBar onColorChange={handleColorChange} onLanguageChange={handleLanguageChange} onSearchChange={handleSearchChange} language={language} /> 
                <Routes>
                    <Route exact path="/" element={<SelectMovies user={user} language={language} search={search} onSearchChange={handleMovieSearchChange} currentMovies={currentMovies} genres={genres} currentGenre={currentGenre} onGenreChange={handleGenreChange} handleInteraction={handleInteraction} loadRecommendations={loadRecommendations} loadingMovies={loadingMovies} selectedNumber={Object.keys(selectedMovies).length} handleReset={handleReset} currentMoviePage={currentMoviePage} handlePageChange={handlePageChange} />} />
                    <Route exact path="/recommendations" element={<ShowMovies user={user} language={language} currentMovies={recommendedMovies} loadingMovies={loadingRecommendedMovies} predictions={recommendedMoviesRating} />} />
                    <Route path="*" element={<NoSite language={language} />} />
                </Routes>
                <Footer language={language} />
            </Router>
        </div>
    );
}

export default App;