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
          fetch('https://api.themoviedb.org/3/genre/movie/list?language=es', options)
            .then(response => response.json())
            .then(data => {
                setGeneros(data.genres)
                
            })
            .catch(err => console.error(err))
          
      }, [])
      const handleGeneroChange = (e) => {
        const generoId = e.target.value
        setSelectedGenero(generoId)
        onGeneroChange(generoId)
      }

    return (
        <select className="form-select text-bg-dark" value={selectedGenero} onChange={handleGeneroChange}>
            <option value={""}>Buscar por genero</option>
            {generos.map(genero => (
                <option  key={genero.id} value={genero.id}>{genero.name}</option>
            ))}
        </select>
    )
}

export default Generos