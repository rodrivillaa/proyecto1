import './nosotros.css';
import bannerlogo from '../../../assets/images/pyaa_Mesa_de_trabajo_1.png';
import { useEffect } from 'react';

const Nosotros = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  }, []);

  return (
    <div className="contenedor-nosotros">
      <div className="header-nosotros fade-in">
        <h1>NOSOTROS</h1>
        <p>
          PlanYA es una aplicación que permite a los usuarios encontrar y compartir planes de manera sencilla, ágil y efectiva. 
          Simplifica la forma en que las personas descubren lugares interesantes, ya sea para una noche en la ciudad, un fin de semana 
          en familia o un tiempo al aire libre.
        </p>
      </div>

      <div className="bloque-nosotros fade-in">
        <h2>NUESTRO COMPROMISO</h2>
        <p>
          Estamos comprometidos a ofrecer una experiencia optimizada y personalizada. Utilizamos tecnología avanzada para asegurarnos 
          de que cada recomendación se ajuste a los intereses y necesidades del usuario. Nos esforzamos por mantener nuestra plataforma 
          segura, confiable y en constante evolución para brindar siempre el mejor servicio.
        </p>
      </div>

      <div className="bloque-nosotros reverse fade-in">
        <div className="texto-nosotros">
          <h2>LO QUE NOS DIFERENCIA...</h2>
          <p>
            Nuestra plataforma está diseñada pensando en la facilidad de uso. Queremos que cualquier persona, sin importar su nivel 
            de experiencia tecnológica, pueda navegar con confianza y descubrir <strong>planes personalizados</strong> según sus intereses. 
            Desde eventos exclusivos hasta rincones ocultos de la ciudad, PlanYA te ayuda a encontrar el plan perfecto de manera rápida y sencilla.
            <br /><br />
            Además, fomentamos una comunidad activa y colaborativa. Los usuarios no solo pueden descubrir nuevas experiencias, 
            sino también compartir sus propias recomendaciones, creando un ciclo de inspiración que beneficia a todos. 
            Aquí, creemos que las mejores aventuras son aquellas que se comparten.
          </p>
        </div>
        <div className="imagen-nosotros">
          <img src={bannerlogo} alt="Banner PlanYA" />
        </div>
      </div>
    </div>
  );
};

export default Nosotros;

