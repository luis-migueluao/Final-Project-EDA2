import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";

import {
  Form,
  Button,
  Container,
  Card,
} from "react-bootstrap";

import "../styles/Auth.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");

    if (!email || !password) {
      setError("Completa todos los campos");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setIsSubmitting(true);

    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/login");

    } catch (err: unknown) {
      console.error(err);

      const fireErr = err as { code?: string; message?: string };

      if (fireErr.code === "auth/email-already-in-use") {
        setError("Este correo ya está registrado");
      } else if (fireErr.code === "auth/weak-password") {
        setError("La contraseña es muy débil");
      } else if (fireErr.code === "auth/invalid-email") {
        setError("Correo electrónico inválido");
      } else {
        setError(fireErr.message || "Error en el registro");
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
          Crear Cuenta
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
              className="auth-input"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              placeholder="Contraseña (mín. 6 caracteres)"
              className="auth-input"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
            />
          </Form.Group>

          <Button
            className="auth-button w-100"
            onClick={handleRegister}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registrando..." : "Registrarse"}
          </Button>

        </Form>

        <p className="auth-footer">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </Card>
    </Container>
  );
};

export default Register;