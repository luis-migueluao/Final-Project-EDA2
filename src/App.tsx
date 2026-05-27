import {
  BrowserRouter,
} from "react-router-dom";

import AppRoutes from "./Routes/AppRoutes";

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

          <AppRoutes />

        </BrowserRouter>

      </CartProvider>

    </AuthProvider>
  );
}

export default App;