import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import ProductDescription from "./Pages/ProductDescription";

import {
  AuthProvider,
} from "./Context/AuthContext";

import {
  CartProvider,
} from "./Context/CartContext";

function App() {

  return (

    <AuthProvider>

      <CartProvider>

        <BrowserRouter>

          <Routes>

            {/* HOME */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* PRODUCT */}
            <Route
              path="/product/:id"
              element={
                <ProductDescription />
              }
            />

            {/* CART */}
            <Route
              path="/cart"
              element={<Cart />}
            />

            {/* AUTH */}
            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

          </Routes>

        </BrowserRouter>

      </CartProvider>

    </AuthProvider>
  );
}

export default App;