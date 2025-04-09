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

  const [mensaje, setMensaje] = useState('');
  const [comentarios, setComentarios] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;
  const userName = user?.email || "Anónimo";

  useEffect(() => {
    const fetchBarDetail = async () => {
      const barDoc = doc(db, "bares", id);
      const barSnapshot = await getDoc(barDoc);
      if (barSnapshot.exists()) {
        setBar({ id: barSnapshot.id, ...barSnapshot.data() });
      }
      setLoading(false);
    };

    fetchBarDetail();

    const q = query(collection(db, "bares", id, "comentarios"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const datos = [];
      querySnapshot.forEach((doc) => datos.push(doc.data()));
      setComentarios(datos);
    });

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    const favorito = favorites.some(fav => fav.id === id);
    setIsFavorite(favorito);
  }, [favorites, id]);

  const handleToggleFavorite = () => {
    const alreadyInFavorites = favorites.some(fav => fav.id === id);

    if (alreadyInFavorites) {
      removeFavorite(id);
      Swal.fire({
        title: 'Eliminado',
        text: 'El bar se ha eliminado de favoritos',
        icon: 'error'
      });
    } else {
      const barConID = {
        ...bar,
        id,
        nombre: bar.nombre,
        imagenURL: bar.imagenURL || imagen,
        ubicacion: bar.direccion,
        categoria: bar.categoria
      };
      addFavorite(barConID);
      Swal.fire({
        title: 'Agregado',
        text: 'El bar se ha agregado a favoritos',
        icon: 'success'
      });
    }
  };

  const handleLocationClick = () => {
    if (bar.latitude && bar.longitude) {
      window.open(`https://www.google.com/maps?q=${bar.latitude},${bar.longitude}`, '_blank');
    } else {
      Swal.fire({
        title: 'Ubicación no disponible',
        text: 'No hay coordenadas para este bar',
        icon: 'warning'
      });
    }
  };

  const enviarComentario = async () => {
    if (!user) {
      Swal.fire({
        title: 'Inicia sesión para comentar',
        text: 'Debes estar registrado para dejar un comentario.',
        icon: 'warning',
        confirmButtonText: 'Iniciar sesión',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login';
        }
      });
      return;
    }

    if (!mensaje.trim()) {
      Swal.fire({
        title: 'Campo vacío',
        text: 'Escribí un comentario.',
        icon: 'warning'
      });
      return;
    }

    try {
      await addDoc(collection(db, "bares", id, "comentarios"), {
        nombre: userName,
        mensaje,
        fecha: new Date()
      });
      setMensaje('');
    } catch (error) {
      console.error("Error al guardar el comentario", error);
    }
  };

  return (
    <div className='detalle-container'>
      {loading ? (
        <p className="loading">Cargando detalles ...</p>
      ) : bar ? (
        <>
          <div className='detalle-encabezado'>
            <h1>{bar.nombre}</h1>
            <button className="btn-fav" onClick={handleToggleFavorite}>
              <FontAwesomeIcon icon={faBookmark} style={{ color: isFavorite ? "#F28C1D" : "gray" }} />
            </button>
          </div>

          <div className='detalle-info'>
            <img src={bar.imagenURL || imagen} alt={`Imagen de ${bar.nombre}`} />
            <div className='detalle-datos'>
              <p><strong>Precio:</strong> ${bar.precio}</p>
              <p><strong>Horarios:</strong> 12pm - 6am</p>
              <p><strong>Categoría:</strong> {bar.categoria}</p>
              <p><strong>Días:</strong> Viernes a Domingo</p>
              <p><strong>Descripción:</strong> {bar.descripcion}</p>
              <div className="iconos">
                <span onClick={handleLocationClick}><IoLocationOutline /></span>
                <span onClick={() => setShowShareOptions(true)}><CiSaveDown2 /></span>
              </div>
            </div>
          </div>

          <div className="comentarios-section">
            <h2>Comentarios</h2>
            <textarea
              placeholder="Escribí tu comentario"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
            <button onClick={enviarComentario}>Enviar</button>

            <div className="lista-comentarios">
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

          {showShareOptions && (
            <div className="modal">
              <div className="modal-content">
                <h3>Compartir</h3>
                <button onClick={() => window.open(`https://wa.me/?text=Mirá este bar: ${window.location.href}`, '_blank')}>WhatsApp</button>
                <button onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  Swal.fire({ title: 'Enlace copiado', icon: 'success' });
                }}>Copiar enlace</button>
                <button onClick={() => setShowShareOptions(false)}>Cerrar</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>No se encontró el bar...</p>
      )}
    </div>
  );
};

export default BarDetail;
