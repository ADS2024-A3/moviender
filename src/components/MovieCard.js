import React from 'react';
import exampleImage from '../logo.svg';


const MovieCard = ({ title, description, release, handleInteraction }) => {
    return (
        <div className="card" style={{width: '18rem', margin: '2%'}}>
            <img src={exampleImage} className="card-img-top" alt="..." />
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