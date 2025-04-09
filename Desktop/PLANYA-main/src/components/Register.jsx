// Register.jsx
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Usamos el mismo CSS que el login

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire("Oops", "Por favor ingresá un email y contraseña.", "warning");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario registrado:", userCredential.user);
      Swal.fire("¡Registro exitoso!", "Ya podés iniciar sesión", "success");
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar:", error.message);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Registrarse</h2>
        <form onSubmit={handleRegister}>
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
          <button type="submit" className="btn-login">Registrarme</button>
        </form>
        <p className="register-link">
          ¿Ya tenés cuenta? <a href="/login">Iniciar Sesión</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
