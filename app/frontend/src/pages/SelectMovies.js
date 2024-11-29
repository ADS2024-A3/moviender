import './SelectMovies.css';

import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const SelectMovies = ({ user, language, onSearchChange, currentMovies, genres, onGenreChange, handleInteraction, loadRecommendations, loadingMovies, selectedNumber, handleReset, currentMoviePage, handlePageChange }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        loadRecommendations();
        navigate('/recommendations');
    }

    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-sm txt-color bg-color">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="mynavbar">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item item-color dropdown">
                        <button className="nav-link dropdown-toggle" id="navbarDropdownMenuLink1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {
                            'Genre'
                            }
                        </button>
                        <ul className="dropdown-menu drop-item-color" aria-labelledby="navbarDropdownMenuLink1">
                            {genres.map((genre, index) => (
                            <li key={index}><button className="dropdown-item" id="buttonDeutsch" onClick={() => onGenreChange(genre)}>
                            {
                                genre
                            }
                            </button></li>
                            ))}
                        </ul>
                        </li>
                    </ul>
                    <button className="navbar-brand" href="/" onClick={handleReset}>
                        Reset
                    </button>
                    <form className="d-flex">
                        <input className="form-control me-2" type="text" placeholder={
                            language === 'Deutsch' ? 'Suche' :
                            language === 'Englisch' ? 'Search' :
                            language === 'Spanisch' ? 'Busca' :
                            'Suche'
                            } onChange={(e) => onSearchChange(e.target.value)}
                        />
                        <button className="btn btn-color" type="button">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                    </div>
                </div>
            </nav>
            {loadingMovies ? (
                <p>Loading Movies...</p>  // Display loading text while waiting for the movies
            ) : (
                <div className="row justify-content-center">
                    {currentMovies.length > 0 ? (
                        currentMovies.map((movie, index) => (
                            <div key={index} className="col-sm-12 col-md-6 col-lg-3 mb-4 d-flex justify-content-center">
                                <MovieCard key={index} id={movie.movieId} title={movie.title} genres={movie.genres} ratingCount={movie.ratingCount} year={movie.year} tmdbId={movie.tmdbId} handleInteraction={handleInteraction} isRecommendation={false} />
                            </div>
                        ))
                    ) : (
                        <p>No movies to display.</p>  // Show message if no movies are available
                    )}
                </div>
            )}
            <div className="row justify-content-center">
                <button disabled={selectedNumber < 10}   style={{cursor: selectedNumber < 10 ? 'not-allowed' : 'pointer', opacity: selectedNumber < 10 ? '0.5' : '1'}} className="btn btn-color" onClick={handleClick}>
                    <span>Match me!</span>
                </button>
            </div>
            <div className="row justify-content-center">
            <div className="col-2 text-center point-hover" onClick={() => {handlePageChange(-1)}}>
                {currentMoviePage > 0 ? (
                    <i className="fas fa-2x fa-arrow-left"></i>
                ) : null}            
            </div>
            <div className="col-8"></div>
            <div className="col-2 text-center point-hover" onClick={() => {handlePageChange(1)}}>
                {currentMoviePage < 10 ? (
                    <i className="fas fa-2x fa-arrow-right"></i>
                ) : null}
            </div>
            </div>
        </div>
    );
}

export default SelectMovies;