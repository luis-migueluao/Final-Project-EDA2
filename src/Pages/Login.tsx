import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";

import { Form, Button, Container, Card } from "react-bootstrap";

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
      navigate("/home");
    } catch (error: any) {
      console.error("Error de login:", error);
      console.error("Código de error:", error.code);
      console.error("Mensaje de error:", error.message);
      
      if (error.code === "auth/user-not-found") {
        alert("Usuario no encontrado");
      } else if (error.code === "auth/wrong-password") {
        alert("Contraseña incorrecta");
      } else if (error.code === "auth/configuration-not-found") {
        alert("Error de configuración de Firebase. Contacta al administrador.");
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "400px" }} className="p-4">
        <h3 className="text-center mb-3">Login</h3>

        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button className="w-100" onClick={handleLogin}>
            Login
          </Button>
        </Form>

        <p className="text-center mt-3">
          No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </Card>
    </Container>
  );
};

export default Login;