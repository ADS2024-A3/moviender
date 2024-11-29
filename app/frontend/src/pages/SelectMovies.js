import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const SelectMovies = ({ user, language, search, onSearchChange, currentMovies, genres, currentGenre, onGenreChange, handleInteraction, loadRecommendations, loadingMovies }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        loadRecommendations();
        navigate('/recommendations');
    }

    return (
        <div className="container">
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
                                <MovieCard key={index} id={parseInt(index)} title={movie.title} description={movie.description} release={movie.release} handleInteraction={handleInteraction} isRecommendation={false} />
                            </div>
                        ))
                    ) : (
                        <p>No movies to display.</p>  // Show message if no movies are available
                    )}
                </div>
            )}
            <div className="row justify-content-center">
                <button className="btn btn-color" onClick={handleClick}>
                    <span>Match me!</span>
                </button>
            </div>
        </div>
    );
}

export default SelectMovies;