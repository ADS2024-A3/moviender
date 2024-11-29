import React, { useState } from 'react';
import './MovieCard.css';

import starWarsImage from '../ressources/StarWars4.jpg';
import wildRobotImage from '../ressources/TheWildRobot.jpg';
import poorThingsImage from '../ressources/PoorThings.jpg';
import godfatherImage from '../ressources/TheGodfather.jpg';
import clasicoImage from '../ressources/ElClasico.jpg';
import blackfishImage from '../ressources/Blackfish.jpg';

const MovieCard = ({ id, title, description, release, handleInteraction, isRecommendation }) => {
    const [rating, setRating] = useState(0); // Current selected rating
    const [hover, setHover] = useState(0); // Current hovered star index
    const [hoverTimes, setHoverTimes] = useState(false);
    const [hoverHeart, setHoverHeart] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false); // State to toggle modal visibility

    // Conditionally set the image based on the title
    let Image;
    switch (title) {
        case 'Star Wars IV':
            Image = starWarsImage;
            break;
        case 'The Wild Robot':
            Image = wildRobotImage;
            break;
        case 'Poor Things':
            Image = poorThingsImage;
            break;
        case 'The Godfather':
            Image = godfatherImage;
            break;
        case 'El Clásico 2024':
            Image = clasicoImage;
            break;
        case 'Blackfish':
            Image = blackfishImage;
            break;
        default:
            Image = starWarsImage; // Default image if title doesn't match
            break;
    }

    const handleClick = (event) => {
        // Check if the click is on one of the rating icons
        if (event.target.closest('.star-rating') || event.target.closest('.fa-heart') || event.target.closest('.fa-times')) {
            // If clicked on the icon, prevent modal from showing
            return;
        }
        setModalVisible(true); // Show modal when the movie card is clicked
    };

    const handleCloseModal = () => {
        setModalVisible(false); // Close the modal
    };

    const handleRatingClick = (star) => {
        setRating(star); 
        handleInteraction(star, id);
    };

    return (
        <div>
            {/* Movie Card */}
            <div className="card movie-card" style={{ width: '18rem', margin: '2%' }} onClick={handleClick}>
                <img src={Image} className="card-img-top movie-card-img" alt={title} />
                <div className="card-body">
                    <h5 className="card-title item-color">{title}</h5>
                    <p className="card-text item-color">{description}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item item-color">Release: {release}</li>
                </ul>
                <div className="card-body text-center">
                    <div className="container-fluid">
                        <div className="row">
                            {isRecommendation ? (
                                <div className="col star-rating">
                                    <div className="col-2">
                                        <i className={`item-color fa-times fa-2x ${hoverTimes ? 'fas' : 'far'}`} onMouseEnter={() => setHoverTimes(true)} onMouseLeave={() => { setHoverTimes(false) }}></i>
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
                </div>
            </div>

            {/* Bootstrap Modal */}
            <div className={`modal fade ${isModalVisible ? 'show' : ''}`} id={`movieModal${id}`} tabIndex="-1" aria-labelledby={`movieModalLabel${id}`} aria-hidden="true" style={{ display: isModalVisible ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`movieModalLabel${id}`}>{title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                        </div>
                        <div className="modal-body">
                            <p>{description}</p>
                            <p><strong>Release Date:</strong> {release}</p>
                        </div>
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/vZ734NWnAHA?si=uUfsf5apzcXnxzoc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;