import NavBar from "./components/layout/Navbar/NavBar"
import Slide from "./components/layout/Slide/Slide"
import Footer from "./components/layout/Footer/Footer"
import PreguntasFrecuentes from "./components/pages/PreguntasFrecuentes/PreguntasFrecuentes"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nosotros from "./components/pages/Contacto/Nosotros"
import { BolichesContainer } from "./components/pages/Boliches/BolichesContainer"
import BaresList from "./components/pages/Bares/BaresList"
import BarDetail from './components/pages/BarDetail/BarDetail';
import ZonaSur from "./components/pages/zonas/zonasur/ZonaSur"
import ZonaOeste from "./components/pages/zonas/zonaoeste/ZonaOeste"
import MapComponent from "./components/pages/Mapa/MapComponent"
import ZonaEste from "./components/pages/zonas/zonaeste/ZonaEste"
import { FavoritesProvider } from '../context/FavoritesContext';
import Favorites from './components/pages/favorites/Favorites';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  

  return (
    <FavoritesProvider>
    <BrowserRouter>

    <NavBar /> 


    {/* <BolichesContainer/> */}

    
      <Routes>
      <Route path="/registro" element={<Register />} />
      <Route path="/login" element={<Login />} />
        <Route path="/" element={<Slide />} />
        <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
        <Route path="/nosotros" element={<Nosotros />} />

        <Route path="/bareslist" element={<BaresList />} />

        <Route path="/bares/:id" element={<BarDetail />} />
        <Route path="/favoritos" element={<Favorites />} />

        <Route path="/zonasur" element={<ZonaSur/>} />
        <Route path="/zonaoeste" element={<ZonaOeste/>} />
        <Route path="/zonaeste" element={<ZonaEste/>} />
        <Route path="/preguntas" element={<PreguntasFrecuentes/>} />

        <Route path="/mapa" element={<MapComponent/>} />

        <Route path="*" element={ <h2>404 NOT FOUND</h2> } />
      </Routes>
      
      <Footer/>

    </BrowserRouter>

    </FavoritesProvider>
  
  )
}

export default App
