import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import { AuthProvider } from "./Context/AuthContext";
import ProductDescription from "./Pages/ProductDescription";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Página principal pública */}
          <Route path="/" element={<Home />} />

          {/* públicas */}
          <Route path="/product/:id" element={<ProductDescription />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;