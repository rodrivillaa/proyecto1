
import "./preguntasFrecuentes.css";
import bannerlogo from '../../../assets/images/LOGOPLANYASD.png';
import { useEffect } from 'react';

const PreguntasFrecuentes = () => {
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
    <div className="faq-container">
      <h1 className="fade-in">PREGUNTAS FRECUENTES</h1>

      <div className="faq-item fade-in">
        <h2>¿Qué es PlanYA?</h2>
        <p>
          PlanYA es una plataforma que te permite descubrir y compartir planes y actividades de manera sencilla y efectiva, ajustadas a tus intereses y necesidades.
        </p>
      </div>

      <div className="faq-item fade-in">
        <h2>¿Cómo funciona PlanYA?</h2>
        <p>
          PlanYA te muestra planes recomendados según tus preferencias. Puedes explorar categorías, ver planes populares y recibir sugerencias personalizadas. También puedes compartir tus propios planes con la comunidad.
        </p>
      </div>

      <div className="faq-item fade-in">
        <h2>¿PlanYA tiene un costo?</h2>
        <p>
          La aplicación es completamente gratuita.
        </p>
      </div>

      <div className="faq-item fade-in">
        <h2>¿Cómo puedo contactar al soporte?</h2>
        <p>
          Puedes contactarnos a través del formulario de contacto en nuestra web o enviando un correo a <strong>soporte@planya.com</strong>. Nuestro equipo estará encantado de ayudarte.
        </p>
      </div>

      <div className="faq-banner fade-in">
        <img src={bannerlogo} alt="Logo PlanYA" />
      </div>
    </div>
  );
};

export default PreguntasFrecuentes;
