import { useEffect, useState } from "react";


const Generos = ({onGeneroChange}) => {
    const [generos, setGeneros] = useState([])
    const [selectedGenero, setSelectedGenero] = useState("")

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGRhMzkyZGVmN2JiNTllNDI1MjIyMDUxYjJmZGQ5YyIsIm5iZiI6MTcyMTUyMDY2OS41MzgyNzgsInN1YiI6IjY2OTliODllMTI0MWE3ZDhjZDE4NWFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f9Pjq59t2_5VibICaAV3zsExkStYyDqkllxovAHMafE'
        }
      }

      useEffect(() => {
          fetch('https://api.themoviedb.org/3/genre/movie/list?language=es', options) //se realiza la peticion de generos de la API para obtener el id y el nombre del genero
            .then(response => response.json())
            .then(data => {
                setGeneros(data.genres)
                
            })
            .catch(err => console.error(err))
          
      }, [])
      const handleGeneroChange = (e) => { //funcion primaria que renderiza la lista de generos la cual se transfiere a navbar
        const generoId = e.target.value
        setSelectedGenero(generoId) //para darle un valor al select
        onGeneroChange(generoId) //para pasar el id del genero con el cual se hace la peticion desde home y renderiza todas las peliculas con ese genero
      }

    return (
        <select className="form-select text-bg-dark w-200" value={selectedGenero} onChange={handleGeneroChange}>
            <option value={""}>Buscar genero</option>
            {generos.map(genero => (
                <option  key={genero.id} value={genero.id}>{genero.name}</option>
            ))}
        </select>
    )
}

export default Generos