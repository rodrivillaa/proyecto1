import { useContext, useEffect} from 'react';
import { FavoritesContext } from '../../../../context/FavoritesContext';
import "./favorites.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Favorites = () => {
    const { favorites, removeFavorite } = useContext(FavoritesContext);
  
    useEffect(() => {
      console.log('Estado actual de favoritos:', favorites);
    }, [favorites]);
  
    if (!favorites || favorites.length === 0) {
      return (
        <div>
          <h2>Mis Favoritos</h2>
          <p className='sin_favoritos'>No tienes bares favoritos guardados.</p>
        </div>
      );
    }
  
    return (
      <div className="favorites-section">
        <h2>Mis Favoritos ({favorites.length})</h2>
        <div className="favorites-grid">
          {favorites.map((bar, index) => {
            // Crear una key única combinando id e índice
            const uniqueKey = `${bar.id}-${index}`;
            
            return (
              <div key={uniqueKey} className="favorite-card">
                <img 
                  src={bar.imagenURL || '/placeholder-image.jpg'} 
                  alt={bar.nombre || 'Bar'} 
                  />
               <div className="button-group">
                  <h1>{bar.nombre}</h1>
    <Link to={`/bares/${bar.id}`} className="ver-mas-btn">
      Ver más
    </Link>
    <button onClick={() => removeFavorite(bar.id)} className="delete-btn">
      <FontAwesomeIcon icon={faTrash} />
    </button>
  </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default Favorites;