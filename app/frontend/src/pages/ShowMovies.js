import MovieCard from '../components/MovieCard';

const ShowMovies = ({ user, language, currentMovies }) => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                {currentMovies.map((component, index) => (
                    <div key={index} className="col-sm-12 col-md-6 col-lg-3 mb-4 d-flex justify-content-center">
                        <MovieCard key={index} title={component.title} description={component.description} release={component.release} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShowMovies;