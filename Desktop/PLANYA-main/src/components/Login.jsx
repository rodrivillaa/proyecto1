import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userLogged, setUserLogged] = useState(null);
  const navigate = useNavigate();

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserLogged(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire("¡Bienvenido!", "Sesión iniciada con éxito", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("Error", "Credenciales incorrectas o cuenta inexistente", "error");
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Swal.fire("Sesión cerrada", "", "info");
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

  if (userLogged) {
    return (
      <div className="login-page">
        <div className="login-box">
          <h2>Ya iniciaste sesión</h2>
          <p><strong>Correo:</strong> {userLogged.email}</p>
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "10px", flexDirection: "column" }}>
            <button className="btn-login" onClick={() => navigate("/favoritos")}>Ver Favoritos</button>
            <button className="btn-login" onClick={() => navigate("/")}>Ir al Inicio</button>
            <button className="btn-login" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-login">Iniciar Sesión</button>
        </form>
        <p className="register-link">
          ¿No tenés cuenta? <a href="/register">Registrate</a>
        </p>
      </div>
    </div>
  );
};

export default Login;



