import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc, addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../firebase';
import { CiSaveDown2 } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import imagen from "../../../assets/images/imagen.png";
import { FavoritesContext } from '../../../../context/FavoritesContext';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import "./index.css";
import { getAuth } from 'firebase/auth';

const BarDetail = () => {
  const { id } = useParams();
  const [bar, setBar] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addFavorite, removeFavorite, favorites } = useContext(FavoritesContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [tab, setTab] = useState("info");

  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [comentarios, setComentarios] = useState([]);

  const handleToggleFavorite = () => {
    const alreadyInFavorites = favorites.some(fav => fav.id === id);
    if (alreadyInFavorites) {
      removeFavorite(id);
      setIsFavorite(false);
      Swal.fire({
        title: 'Eliminado',
        text: 'El bar se ha eliminado de favoritos',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } else {
      const barConID = {
        ...bar,
        id: id,
        nombre: bar.nombre,
        imagenURL: bar.imagenURL || imagen,
        ubicacion: bar.direccion,
        categoria: bar.categoria
      };
      addFavorite(barConID);
      setIsFavorite(true);
      Swal.fire({
        title: 'Agregado',
        text: 'El bar se ha agregado a favoritos',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleLocationClick = () => {
    if (bar.latitude && bar.longitude) {
      const mapsUrl = `https://www.google.com/maps?q=${bar.latitude},${bar.longitude}`;
      window.open(mapsUrl, '_blank');
    } else {
      Swal.fire({
        title: 'Ubicación no disponible',
        text: 'No hay coordenadas para este bar',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    Swal.fire({
      title: 'Enlace copiado',
      text: 'El enlace se ha copiado al portapapeles',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    setShowShareOptions(false);
  };

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`Mira este bar: ${window.location.href}`)}`;
    window.open(url, '_blank');
    setShowShareOptions(false);
  };

  const enviarComentario = async () => {

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Swal.fire({
        title: 'Inicia sesión para comentar',
        text: 'Debes estar registrado para dejar un comentario.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Iniciar sesión',
        showCancelButton: true,
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Redireccionar al login, si tenés ruta por ejemplo '/login'
          window.location.href = '/login';
        }
      });
      return;
    }
    if (!nombre || !mensaje) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, completá tu nombre y comentario.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }
  
    try {
      await addDoc(collection(db, "bares", id, "comentarios"), {
        nombre,
        mensaje,
        fecha: new Date()
      });
      setNombre('');
      setMensaje('');
    } catch (error) {
      console.error("Error al guardar el comentario", error);
    }
  };

  useEffect(() => {
    const fetchBarDetail = async () => {
      const barDoc = doc(db, "bares", id);
      const barSnapshot = await getDoc(barDoc);
      if (barSnapshot.exists()) {
        setBar({ id: barSnapshot.id, ...barSnapshot.data() });
      } else {
        console.log("No se encontró el bar");
      }
      setLoading(false);
    };
  
    fetchBarDetail();
  
    const q = query(collection(db, "bares", id, "comentarios"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const datos = [];
      querySnapshot.forEach((doc) => {
        datos.push(doc.data());
      });
      setComentarios(datos);
    });
  
    return () => unsubscribe();
  }, [id]);

  // 🔁 Se actualiza automáticamente el estado del botón si cambia el contexto
  useEffect(() => {
    const fav = favorites.some(fav => fav.id === id);
    setIsFavorite(fav);
  }, [favorites, id]);

  return (
    <div className='ContenedorDetallesPadreTotal'>
      {loading ? (
        <p className="loading">Cargando detalles ...</p>
      ) : bar ? (
        <div>
          <div className='contenedorTitulo'>
            <h1>{bar.nombre}</h1>
          </div>

          <div className='btn-fav'>
            <button onClick={handleToggleFavorite}>
              <FontAwesomeIcon
                icon={faBookmark}
                style={{ color: isFavorite ? "#F28C1D" : "gray" }}
              />
            </button>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button onClick={() => setTab("info")}>Información</button>
            <button onClick={() => setTab("comentarios")}>Comentarios</button>
          </div>

          {/* Tab: Info */}
          {tab === "info" && (
            <>
              <div className='contenedorPrecioHorario'>
                <span>Desde ${bar.precio}</span>
                <p>Horarios 12pm - 6am</p>
                <p>categoria: {bar.categoria}</p>
                <p>Días: Viernes a Domingo</p>
              </div>
              <div className='contenedorImagen'>
                <img src={bar.imagenURL || imagen} alt={`Imagen de ${bar.nombre}`} width="200" />
              </div>
              <div className='contenedorIconos'>
                <span onClick={handleShare}><CiSaveDown2 /></span>
                <span onClick={handleLocationClick}><IoLocationOutline /></span>
              </div>
              <div className='contenedorDescripcion'>
                <h2>Información</h2>
                <p>Descripción: {bar.descripcion}</p>
                <Link to="/zonaeste">
                  <button>Volver</button>
                </Link>
              </div>
            </>
          )}

          {/* Tab: Comentarios */}
          {tab === "comentarios" && (
            <div className='comentarios'>
              <h2>Dejá tu comentario</h2>
              <input
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <textarea
                placeholder="Escribí tu comentario"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              ></textarea>
              <button onClick={enviarComentario}>Enviar</button>

              <div className="listaComentarios">
                {comentarios.length === 0 ? (
                  <p>No hay comentarios todavía.</p>
                ) : (
                  comentarios.map((coment, index) => (
                    <div key={index} className="comentario">
                      <p><strong>{coment.nombre}</strong>: {coment.mensaje}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Modal compartir */}
          {showShareOptions && (
            <div className="modal">
              <div className="modal-content">
                <h3>Compartir</h3>
                <button onClick={shareOnWhatsApp}>Compartir en WhatsApp</button>
                <button onClick={copyLink}>Copiar enlace</button>
                <button onClick={() => setShowShareOptions(false)}>Cerrar</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>No se encontró el bar...</p>
      )}
    </div>
  );
};

export default BarDetail;

