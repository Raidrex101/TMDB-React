import { useEffect, useState } from "react";
import { Popover } from "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "../components/Navbar";


const Home = () => {
    const [movies, setMovies] = useState([])

    const options = { // validador de credenciales para acceder a l a API, se necesita privatizar el token de acceso es el token que esta en autorization despues de Bearer
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGRhMzkyZGVmN2JiNTllNDI1MjIyMDUxYjJmZGQ5YyIsIm5iZiI6MTcyMTM1MTU1OC45ODQyNjIsInN1YiI6IjY2OTliODllMTI0MWE3ZDhjZDE4NWFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZijdBh7_V5Sgg-JcUIkLsinxzTDqbr6aqgXJiZohhNs'
        }
    }

    const movieList = (url) => { //recibe una url como parametro declarada en handdleGeneroChange dependiendo si hay cambios en el selector de genero o no 
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                setMovies(data.results);
                console.log("Peliculas: ", data.results);
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {

        movieList('https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1') //use efect para renderizar la lista de peliculas al cargar por primera vez la aplicacion

    }, [])

    const haldleGeneroChange = (generoId) => { // funcion que renderiza la lista de peliculas dependiendo del genero seleccionado esta funcion recibe su parametro desde Generos.jsx
        if (generoId) { //con la funcion con el mismo nombre en Generos.jsx
            movieList(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-Es&page=1&sort_by=popularity.desc&with_genres=${generoId}`)
            
        }else {
            movieList('https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1')
        } 
    }


    useEffect(() => { //funcion que inicializa el popover ya que en react no se inicializa de forma automatica, espera a que movies cargue para inicializar y importar popover
        Array.from(document.querySelectorAll('[data-bs-toggle="popover"]')).forEach(popoverNode => new Popover(popoverNode))
    }, [movies]);

    return (
        <>
            <Navbar onGeneroChange={haldleGeneroChange}/> {/* Aqui se recibe el genero seleccionado desde Generos dandole el parametro a la funcion handleGeneroChange */}
            <div className="container">
                <div className="row">
                    {movies.map(movie => (
                        <div className="col-md-3" key={movie.id}>
                            <div className="card" style={{ width: '16rem' }}>
                                <img className="card-img-top"
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'defaultImageURL'} // si hay poster se renderiza la imagen, de lo contrario se renderiza la imagen por defecto
                                    alt={movie.title} />
                                <div className="card-body d-flex justify-content-center row">
                                    <h5 className="card-title text-center">{movie.title}</h5>
                                    <h6>calificacion:{movie.vote_average}</h6>
                                    <button type="button"
                                        className="btn btn-secondary"
                                        data-bs-container="body"
                                        data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content={movie.overview ? movie.overview : 'Sinopsis no disponible'}> {/* si hay sinopsis se renderiza, de lo contrario se renderiza la sinopsis no disponible */}
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
