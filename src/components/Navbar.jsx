import Buscador from "./Buscador";
import Generos from "./Generos";

const Navbar = ({ onGeneroChange }) => {//recibe el genero seleccionado desde Generos el cual despues se pasa a home para renderizar la lista de peliculas
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <h1 className="navbar-brand">TMDB for dev-f</h1>
                <div className="container-fluid justify-content-center">
                <div className="me-3">
                    <Generos onGeneroChange={onGeneroChange} /> {/* desde este componente se transmite la informacion de generos a navbar y de navbar a home la lista de generos */}
                </div>
                    <Buscador/>
                </div>
            </nav>

        </>
    )
}

export default Navbar;
