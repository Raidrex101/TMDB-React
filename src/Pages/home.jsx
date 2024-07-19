import { useEffect, useState } from "react";

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
    }, [])

    return (
        <div>
            <h1>Popular Movies</h1>
            <div >
                {movies.map(movie => (
                    <div key={movie.id}>{movie.title}
                    <div>
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title}/>
                    </div>
                    </div>


                ))}
            </div>
        </div>
    )
}

export default Home


