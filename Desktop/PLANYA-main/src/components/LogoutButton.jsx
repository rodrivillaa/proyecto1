// src/components/LogoutButton.jsx
import "../components/layout/Navbar/navBar.css"

import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Querés cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const auth = getAuth();
        signOut(auth)
          .then(() => {
            Swal.fire("Sesión cerrada", "Hasta pronto 👋", "success");
            navigate("/login");
          })
          .catch((error) => {
            Swal.fire("Error", "No se pudo cerrar sesión", "error");
            console.error("Error al cerrar sesión:", error);
          });
      }
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="logout"
      >
      
      <i className="fa-solid fa-arrow-right-from-bracket"></i>
    
    </button>
  );
};

export default LogoutButton;
