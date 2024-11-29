import React, { useState, useEffect } from 'react';
import './MovieCard.css';

const MovieCard = ({ id, title, genres, ratingCount, year, tmdbId, handleInteraction, isRecommendation, prediction }) => {
    const [rating, setRating] = useState(0); // Current selected rating
    const [hover, setHover] = useState(0); // Current hovered star index
    const [hoverTimes, setHoverTimes] = useState(false);
    const [hoverHeart, setHoverHeart] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false); // State to toggle modal visibility
    const [imagePath, setImagePath] = useState(''); // State for fetched image URL
    const [trailerPath, setTrailerPath] = useState('');
    const [overview, setOverview] = useState('');

    // Fetch movie image from TMDB
    useEffect(() => {
        const fetchMovieImage = async () => {
            const apiKey = '6a9dbbf48dff84a52383420d86e84b02'; // Replace with your TMDB API Key
            const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
            const movieApiUrl = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${apiKey}`;
            
            try {
                const response = await fetch(movieApiUrl);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const movieData = await response.json();
                const posterPath = movieData.poster_path; // Path for the poster image
                const overviewHelper = movieData.overview;

                if (posterPath) {
                    setImagePath(`${baseImageUrl}${posterPath}`);
                } else {
                    setImagePath('../ressources/StarWars4.jpg'); // Provide a fallback image path
                }
                if (overview) {
                    setOverview(overviewHelper);
                } else {
                    setOverview('Error loading overview.');
                }
            } catch (error) {
                console.error('Failed to fetch movie image:', error);
                setImagePath('path/to/your/fallback/image.jpg'); // Fallback image in case of error
            }
        };

        fetchMovieImage();

        const fetchMovieTrailer = async () => {
            const apiKey = '6a9dbbf48dff84a52383420d86e84b02'; // Replace with your TMDB API Key
            const movieApiUrl = `https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=${apiKey}`;
            
            try {
                const response = await fetch(movieApiUrl);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
    
                const movieData = await response.json();
                const trailers = movieData.results;
    
                // Find the YouTube trailer
                const youtubeTrailer = trailers.find((video) => video.site === 'YouTube' && video.type === 'Trailer');
    
                if (youtubeTrailer) {
                    const trailerUrl = `https://www.youtube.com/embed/${youtubeTrailer.key}`; // YouTube embed link
                    console.log('Trailer Embed URL:', trailerUrl);
                    setTrailerPath(trailerUrl); // Set the trailer URL to state
                } else {
                    console.log('No YouTube trailer found');
                }
            } catch (error) {
                console.error('Failed to fetch movie trailer:', error);
            }
        };
    
        fetchMovieTrailer();
    }, [tmdbId]); // Re-run if tmdbId changes

    const handleClick = (event) => {
        if (event.target.closest('.star-rating') || event.target.closest('.fa-heart') || event.target.closest('.fa-times')) {
            return;
        }
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleRatingClick = (star) => {
        setRating(star); 
        handleInteraction(star, id);
    };

    return (
        <div>
            {/* Movie Card */}
            <div className="card movie-card" onClick={handleClick}>
                <img src={imagePath} className="card-img-top movie-card-img" alt={title} />
                <div className="card-body">
                    <h5 className="card-title item-color">{title}</h5>
                    <div className="genres-container">
                        {genres.map((genre, index) => (
                            <span key={index} className="genre-badge item-color">{genre}</span>
                        ))}
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    {isRecommendation? (
                        <div>
                            <li className="list-group-item item-color">Rating count: {ratingCount}</li>
                            <li className="list-group-item item-color">Predicted rating: {parseFloat(prediction).toFixed(2) || 'N/A'}</li>
                        </div>
                    ) : (null)}
                    <li className="list-group-item item-color">Release: {year}</li>
                    </ul>
                <div className="card-footer">
                        {isRecommendation ? (
                            <div className="row">
                                <div className="col-2">
                                    <i className={`item-color fa-times fa-2x ${hoverTimes ? 'fas' : 'fas'}`} onMouseEnter={() => setHoverTimes(true)} onMouseLeave={() => { setHoverTimes(false) }}></i>
                                </div>
                                <div className="col-8"></div>
                                <div className="col-2">
                                    <i className={`item-color fa-heart fa-2x ${hoverHeart ? 'fas' : 'far'}`} onMouseEnter={() => setHoverHeart(true)} onMouseLeave={() => { setHoverHeart(false) }}></i>
                                </div>
                            </div>
                        ) : (
                            <div className="col star-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <i
                                        key={star}
                                        className={`fa-star ${hover >= star || rating >= star ? 'fas' : 'far'}`}
                                        onMouseEnter={() => setHover(star)} // Temporary hover effect
                                        onMouseLeave={() => setHover(0)}  // Reset hover effect
                                        onClick={() => { handleRatingClick(star) }}   // Permanently set rating
                                    ></i>
                                ))}
                            </div>
                        )}
                </div>
            </div>

            {/* Bootstrap Modal */}
            <div className={`modal fade ${isModalVisible ? 'show' : ''}`} id={`movieModal${id}`} tabIndex="-1" aria-labelledby={`movieModalLabel${id}`} aria-hidden="true" style={{ display: isModalVisible ? 'block' : 'none' }}>
                <div className="modal-dialog modal-lg"> {/* Use modal-lg for larger modal size */}
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`movieModalLabel${id}`}>{title}</h5>
                            <button onClick={handleCloseModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{ overflowY: 'auto', maxHeight: '70vh' }}> {/* Make the modal body scrollable with a max height */}
                            <p><strong>Genres:</strong> {genres.join(', ')}</p>
                            <p><strong>Release Date:</strong> {year}</p>
                            <p><strong>Overview:</strong> {overview}</p>

                            {/* YouTube Trailer Embed */}
                            <iframe 
                                width="100%" 
                                height="400"
                                src={trailerPath || "https://www.youtube.com/embed/vZ734NWnAHA?si=uUfsf5apzcXnxzoc"} 
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleCloseModal} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;