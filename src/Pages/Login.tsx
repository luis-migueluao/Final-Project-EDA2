import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";

import {
  Form,
  Button,
  Container,
  Card,
} from "react-bootstrap";

import "../styles/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error: any) {
      console.error("Error de login:", error);

      if (error.code === "auth/user-not-found") {
        alert("Usuario no encontrado");
      } else if (error.code === "auth/wrong-password") {
        alert("Contraseña incorrecta");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <Container
      fluid
      className="auth-container d-flex justify-content-center align-items-center"
    >
      <Card className="auth-card">

        <h1 className="auth-logo">
          LOGO
        </h1>

        <h3 className="auth-title">
          Iniciar Sesión
        </h3>

        <Form>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Correo electrónico"
              value={email}
              className="auth-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              placeholder="Contraseña"
              value={password}
              className="auth-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            className="auth-button w-100"
            onClick={handleLogin}
          >
            Login
          </Button>

        </Form>

        <p className="auth-footer">
          ¿No tienes cuenta?{" "}
          <Link to="/register">
            Regístrate
          </Link>
        </p>

      </Card>
    </Container>
  );
};

export default Login;