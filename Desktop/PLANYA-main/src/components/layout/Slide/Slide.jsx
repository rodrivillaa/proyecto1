// Importar módulos necesarios
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase'; // Asegúrate de importar correctamente tu instancia de Firestore
import { collection, getDocs, query, where } from 'firebase/firestore';
import bannerlogo from "../../../assets/images/BANNERPY1920.png"

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "../Slide/Slide.css";

export default () => {
  const [destacados, setDestacados] = useState([]);

  // Función para obtener bares destacados desde Firestore
  useEffect(() => {
    const fetchDestacados = async () => {
      const q = query(collection(db, "bares"), where("destacado", "==", true));
      const querySnapshot = await getDocs(q);
      const baresDestacados = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDestacados(baresDestacados);
    };
    
    

    fetchDestacados();
  }, []);

  return (
    <>
      <div className='banner_img'>
        <img src={bannerlogo} alt="Banner Logo" />
      </div>

      <div className='text-container'>
        <h1>DESTACADOS</h1>
        <h3>Los lugares más visitados</h3>
      </div>

      <div className='btn-1'>
        <Link to={`/zonaeste`}>
          <button>Ver Todo</button>
        </Link>
        <p>Arrastra y Desliza...</p>
      </div>

      <div className="destacado">
      {destacados.map((bar) => (
            <div className='destacados' key={bar.id}>
              <img src={bar.imagenURL} alt={bar.nombre} />
              <div className='contenedor'>
                <div className='info'>
                  <h3>{bar.nombre}</h3>
                  <h3>Desde - ${bar.precio}</h3>
                  <h3>{bar.ubicacion}</h3>
                </div>
             
              </div>
            </div>
          ))}
      </div>

      <div className='slide'>
        <Swiper
          
          modules={[ Pagination, Scrollbar, A11y]}
          spaceBetween={-150}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            480: {
              slidesPerView: 5, // Muestra una diapositiva en pantallas de hasta 480px
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2, // Muestra dos diapositivas en pantallas medianas (por ejemplo, tablets)
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3, // Muestra tres diapositivas en pantallas grandes
              spaceBetween: 30,
            },
          }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}>
          {destacados.map((bar) => (
            <SwiperSlide key={bar.id}>
              <img src={bar.imagenURL} alt={bar.nombre} />
              <div className='contenedor'>
                <div className='info'>
                  <h3>{bar.nombre}</h3>
                  <h3>Desde - ${bar.precio}</h3>
                  <h3>{bar.ubicacion}</h3>
                </div>
                <div className='btn'>
                    <Link  to={`/bares/${bar.id}`}>
                  <button>Ver Más</button>
                    
                    </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};