import React from 'react'
import { useEffect, useState } from 'react'
function Buscador({onsearchTermChange}) {
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        onsearchTermChange(searchTerm)
        
    }, [searchTerm, onsearchTermChange])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <div >
            <input
                className="form-control"
                type="search"
                placeholder="Busca una pelicula"
                style={{ width: '300px' }}
                onChange={handleSearch}
                value={searchTerm}
            />
        </div >
    )
}

export default Buscador