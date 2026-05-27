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
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    setIsSubmitting(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/");

    } catch (err: unknown) {
      console.error("Error de login:", err);

      const fireErr = err as { code?: string; message?: string };

      if (fireErr.code === "auth/user-not-found") {
        setError("Usuario no encontrado");
      } else if (fireErr.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
      } else if (fireErr.code === "auth/invalid-credential") {
        setError("Correo o contraseña incorrectos");
      } else if (fireErr.code === "auth/too-many-requests") {
        setError("Demasiados intentos. Intenta más tarde.");
      } else {
        setError(fireErr.message || "Error de conexión");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container
      fluid
      className="auth-container d-flex justify-content-center align-items-center"
    >
      <Card className="auth-card">

        <h1 className="auth-logo">
          GameStore
        </h1>

        <h3 className="auth-title">
          Iniciar Sesión
        </h3>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <Form>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Correo electrónico"
              value={email}
              className="auth-input"
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              placeholder="Contraseña"
              value={password}
              className="auth-input"
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
            />
          </Form.Group>

          <Button
            className="auth-button w-100"
            onClick={handleLogin}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Ingresando..." : "Login"}
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