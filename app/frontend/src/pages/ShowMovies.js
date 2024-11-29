import {useEffect} from 'react';
import MovieCard from '../components/MovieCard';

const ShowMovies = ({ user, language, currentMovies, loadingMovies }) => {
    return (
        <div className="container">
            {loadingMovies ? (
                <p>Loading Movies...</p>  // Display loading text while waiting for the movies
            ) : (
                <div className="row justify-content-center">
                    {currentMovies.length > 0 ? (
                        currentMovies.map((movie, index) => (
                            <div key={index} className="col-sm-12 col-md-6 col-lg-3 mb-4 d-flex justify-content-center">
                                <MovieCard key={index} title={movie.title} description={movie.description} release={movie.release} />
                            </div>
                        ))
                    ) : (
                        <p>No movies to display.</p>  // Show message if no movies are available
                    )}
                </div>
            )}
        </div>
    );
}

export default ShowMovies;