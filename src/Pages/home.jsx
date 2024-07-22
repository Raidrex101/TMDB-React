import { useEffect, useState } from "react";
import { Popover } from "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "../components/Navbar";
import Paginator from "../components/Paginator";
import noImage from "../assets/404.jpg"


const Home = () => {
    const [movies, setMovies] = useState([])//aqui se guardan las peliculas de la peticion actual
    const [genre, setGenre] = useState("")// se guarda el id del genero para su utilizacion en busqueda por genero
    const [page, setPage] = useState(1)//inicia el paginador en 1 y se cambia el valor con la funcion handlePageChange
    const [searchTerm, setSearchTerm] = useState("") // Estado para búsqueda activa
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
        let url;
        if (searchTerm.trim()) {
            url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchTerm).toLocaleLowerCase()}&include_adult=false&language=es-ES&page=${page}`;
        } else if (genre) {
            url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-ES&page=${page}&sort_by=popularity.desc&with_genres=${genre}`;
        } else {
            url = `https://api.themoviedb.org/3/movie/popular?language=es-ES&page=${page}`;
        }
    
        movieList(url);
    }, [page, genre, searchTerm]);

    const haldleGeneroChange = (generoId) => { // funcion que renderiza la lista de peliculas dependiendo del genero seleccionado esta funcion recibe su parametro desde Generos.jsx
        //con la funcion con el mismo nombre en Generos.jsx
        setGenre(generoId)
        setPage(1) // se resetea la pagina para que vuelva a cargar la lista de peliculas del genero seleccionado
    }

    const handlePageChange = (newPage) => { // camnoa el valor ge page llamando de vuevo al use efect
        setPage(newPage)
    }
    const handleSearch = (searchText) => {
        const trimmedSearchText = searchText.trim() //quita espacios al inicio y final de el input de la barra da busqueda
        if (trimmedSearchText === '') { //verifica que la barra de busqueda este vacia
            if (searchTerm !== "") { //verifica si search term no esta vacio devido a una consulta
                setSearchTerm("")//vacia search term
                setPage(1)//pone la pagina en 1
            }
        } else {
            if (searchTerm !== trimmedSearchText) {//verifica si search term no es igual al valor de la barra de busqueda
                setSearchTerm(trimmedSearchText)//si no es igual se pone el valor de la barra de busqueda
                setPage(1)//se reinicia la pagina en 1
            }
        }
    }

    useEffect(() => { //funcion que inicializa el popover ya que en react no se inicializa de forma automatica, espera a que movies cargue para inicializar y importar popover
        Array.from(document.querySelectorAll('[data-bs-toggle="popover"]')).forEach(popoverNode => new Popover(popoverNode))
    }, [movies]);

    return (
        <>
            <Navbar onGeneroChange={haldleGeneroChange} onSearchTermChange={handleSearch} /> {/* Aqui se recibe el genero seleccionado desde Generos dandole el parametro a la funcion handleGeneroChange */}
            <div className="container">
                <div className="row">
                    {movies.map(movie => (
                        <div className="col-md-3" key={movie.id}>
                            <div className="card" style={{ width: '16rem' }}>
                                <img className="card-img-top"
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : `${noImage}`} // si hay poster se renderiza la imagen, de lo contrario se renderiza la imagen por defecto
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
            <Paginator page={page} onPageChange={handlePageChange} />
        </>
    )
}

export default Home
