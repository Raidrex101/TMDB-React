import Generos from "./Generos";

const Navbar = ({ onGeneroChange }) => {
    return (
        <>
            <nav className="d-flex navbar navbar-dark bg-dark">
                <h1 className="navbar-brand">TMDB for dev-f</h1>
                <div className="form-inline">
                    <Generos onGeneroChange={onGeneroChange} />
                    <input className="form-control mr-sm-2 text-wrap" type="search" placeholder="Busca una pelicula, serie o actor" />
                </div>
            </nav>

        </>
    )
}

export default Navbar;
