import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Cart from "../Pages/Cart";
import ProductDescription from "../Pages/ProductDescription";
import Profile from "../Pages/Profile";
import NotFound from "../Pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* HOME */}
      <Route path="/" element={<Home />} />

      {/* PRODUCT */}
      <Route path="/product/:id" element={<ProductDescription />} />

      {/* CART */}
      <Route path="/cart" element={<Cart />} />

      {/* PROFILE */}
      <Route path="/profile" element={<Profile />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;