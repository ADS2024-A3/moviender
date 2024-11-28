import React from 'react';
import './MovieCard.css';

import exampleImage from '../logo.svg';
import starWarsImage from '../ressources/StarWars4.jpg';
import wildRobotImage from '../ressources/TheWildRobot.jpg';
import poorThingsImage from '../ressources/PoorThings.jpg';
import godfatherImage from '../ressources/TheGodfather.jpg';
import clasicoImage from '../ressources/ElClasico.jpg';
import blackfishImage from '../ressources/Blackfish.jpg';

const MovieCard = ({ title, description, release, handleInteraction }) => {
    let Image = exampleImage;

    // Conditionally set the image based on the title
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
            Image = exampleImage; // Default image if title doesn't match
            break;
    }

    return (
        <div className="card movie-card" style={{width: '18rem', margin: '2%'}}>
            <img src={Image} className="card-img-top movie-card-img" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Release: {release}</li>
            </ul>
            <div className="card-body text-center">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <a href="#" className="card-link" onClick={handleInteraction}><i className="fa-regular fa-heart"></i></a>
                        </div>
                        <div className="col">
                            <a href="#" className="card-link" onClick={handleInteraction}><i className="fa-solid fa-xmark"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;