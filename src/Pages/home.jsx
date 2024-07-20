import { useEffect, useState } from "react";
import { Popover } from "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "../components/Navbar";

const Home = () => {
    const [movies, setMovies] = useState([])

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGRhMzkyZGVmN2JiNTllNDI1MjIyMDUxYjJmZGQ5YyIsIm5iZiI6MTcyMTM1MTU1OC45ODQyNjIsInN1YiI6IjY2OTliODllMTI0MWE3ZDhjZDE4NWFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZijdBh7_V5Sgg-JcUIkLsinxzTDqbr6aqgXJiZohhNs'
        }
    };

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular?language=es-ES', options)
            .then(response => response.json())
            .then(data => {
                setMovies(data.results);
                console.log(data.results);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        Array.from(document.querySelectorAll('[data-bs-toggle="popover"]')).forEach(popoverNode => new Popover(popoverNode))
    }, [movies]);

    return (
        <>
            <Navbar />

            <div className="container">
                <div className="row">
                    {movies.map(movie => (
                        <div className="col-md-3" key={movie.id}>
                            <div className="card" style={{ width: '18rem' }}>
                                <img className="card-img-top"
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'defaultImageURL'}
                                    alt={movie.title} />
                                <div className="card-body d-flex justify-content-center row">
                                    <h5 className="card-title">{movie.title}</h5>
                                    <button type="button"
                                        className="btn btn-secondary"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content={movie.overview ? movie.overview : 'Sinopsis no disponible'}>
                                        Sinopsis
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home
