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

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Completa todos los campos");
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/login");

    } catch (error: unknown) {
      console.error(error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error en el registro";

      alert(errorMessage);
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
          Crear Cuenta
        </h3>

        <Form>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Correo electrónico"
              className="auth-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              placeholder="Contraseña"
              className="auth-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            className="auth-button w-100"
            onClick={handleRegister}
          >
            Registrarse
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