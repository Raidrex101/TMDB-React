import Generos from "./Generos";

const Navbar = ({ onGeneroChange }) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <h1 className="navbar-brand">TMDB for dev-f</h1>
                <div className="container-fluid justify-content-center">
                <div className="me-3">
                    <Generos onGeneroChange={onGeneroChange} />
                </div>
                    <input className="form-control" type="search" placeholder="Busca una pelicula, serie o actor" style={{ width: '300px' }} />
                </div>
            </nav>

        </>
    )
}

export default Navbar;
