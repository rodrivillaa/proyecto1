import './navBar.css';
import pylogo from '../../../assets/images/LOGOPLANYASD.png';
import { FaUserAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import LogoutButton from "../../LogoutButton";


const NavBar = () => {
  return (
    <div className='contenedor_general'>
      <div className='contenedor_navbar_padre'>
        <div className='logo_img'>
          <Link to="/">
            <img src={pylogo} alt="logo" />
          </Link>
        </div>

        <div className='contenedor_de_navegacion'>
          <ul>
            <Link to="/zonaeste">Categorias</Link>
            <Link to="/favoritos">Favoritos</Link>
            <Link to="/mapa">Mi Mapa</Link>
            <Link to="/registro">Registrarse</Link>
            <Link to="/preguntas">Ayuda</Link>
           {/* <-- Aca lo agregás */}
            <Link to="/nosotros">Nosotros</Link> 
           
          </ul>
        </div>

        <div className='contenedor_de_busqueda_principal'>
          <div className='sub_contenedor_busqueda'>
            <Link to="/login">
            <p><FaUserAlt /></p>
            
            </Link> 
            <LogoutButton />
          </div>
        </div>
      </div>

 
    </div>
  );
};

export default NavBar;
