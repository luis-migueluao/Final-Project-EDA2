import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const NotFound = () => {
  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh", textAlign: "center" }}
    >
      <h1 style={{ fontSize: "6rem", fontWeight: "bold", margin: 0 }}>
        404
      </h1>
      <h2 style={{ margin: "1rem 0" }}>Página no encontrada</h2>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        La página que buscas no existe o ha sido movida.
      </p>
      <Link
        to="/"
        style={{
          padding: "0.75rem 2rem",
          background: "#007bff",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: 600,
        }}
      >
        Volver al inicio
      </Link>
    </Container>
  );
};

export default NotFound;