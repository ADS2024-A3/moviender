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
        const comp = {
            title: 'Star Wars IV',
            description: 'Greatest movie of all time.',
            release: '07.11.1977'
        };

        const comps = [comp, comp, comp, comp, comp, comp];
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