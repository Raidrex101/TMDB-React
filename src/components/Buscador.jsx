import React from 'react'
import { useEffect, useState } from 'react'
function Buscador() {

    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjczZmEwOTIzM2MxODIzNTljMjdiMjYwOWE0ZDNmMyIsIm5iZiI6MTcyMTM1NjMzOS4yOTcyNTQsInN1YiI6IjY2OTljZWNhNDY1N2MxNGEwYzE0NGZhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G4amHc5bBYLe8RzqsRh3UJ4TpVZGqBl2IQL84-dmfu4'
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchTerm)}&include_adult=false&language=en-US&page=1`, options)
            .then(response => response.json())
            .then(data => {
                setMovies(data.results);
                console.log(data.results);
            })
            .catch(err => console.error(err));
    }, [])

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <div >
            <input
                className="form-control"
                type="search"
                placeholder="Busca una pelicula, serie o actor"
                style={{ width: '300px' }}
                onChange={handleSearch}
                value={searchTerm}
            />
        </div >
    )
}

export default Buscador