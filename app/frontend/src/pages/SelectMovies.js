import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';

const SelectMovies = ({ user, language }) => {
    // State to store the fetched sets data
    const [components, setComponents] = useState([]);

    const handleInteraction = async (index, event) => {
        try {
            const interactionData = {
                movie_id: components[index].id
            }
    
            const response = await fetch(`/api/handle-interaction`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(interactionData)
            });
    
            const result = await response.json();
            console.log('Interaction saved:', result);
        } catch (error) {
            console.error('Error handling user interaction:', error);
        }
    };

    // // useEffect to fetch the sets when the component mounts
    // useEffect(() => {
    //     const fetchData = () => {
    //         fetch(`http://127.0.0.1:8000/api/sets/?user_id=${user}`)
    //             .then(response => response.json())
    //             .then(data => {
    //                 if (data.exists) {
    //                     setComponents(data.sets);
    //                 } else {
    //                     console.error('Movies not found.');
    //                 }
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching movie data:', error);
    //             });
    //     };

    //     fetchData();
    // }, [user]); // The effect will re-run if the user prop changes

    useEffect(() => {
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

        const comps = [comp1, comp2, comp3, comp4, comp5, comp6];
        setComponents(comps);
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                {components.map((component, index) => (
                    <div key={index} className="col-sm-12 col-md-6 col-lg-3 mb-4 d-flex justify-content-center">
                        <MovieCard key={index} title={component.title} description={component.description} release={component.release} handleInteraction={handleInteraction} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SelectMovies;