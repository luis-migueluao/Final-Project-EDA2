// src/Pages/ProfileAdmin.tsx

import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuthContext,
} from "../Context/AuthContext";

import Header from "../Components/Header";

import OrdersList from "../Components/Profile/OrdersList";

import UsersList from "../Components/Profile/UsersList";

import AddProductForm from "../Components/Profile/AddProductForm";

import ProductsManager from "../Components/Profile/ProductsManager";

import AdminTabs, {
  type AdminTab,
} from "../Components/Profile/AdminTabs";

import "../styles/Profile.css";

const ProfileAdmin = () => {

  const { user } =
    useAuthContext();

  const navigate =
    useNavigate();

  const [activeTab,
    setActiveTab] =
      useState<AdminTab>(
        "perfil"
      );

  const resetAll = () => {
    navigate("/");
  };

  return (

    <div className="profile-page">

      <Header
        resetAll={resetAll}
      />

      <div className="profile-container">

        {/* USER CARD */}

        <div className="profile-user-card">

          <div className="profile-avatar">
            👤
          </div>

          <div className="profile-user-info">

            <h1>
              Mi Perfil

              <span className="admin-badge">
                Admin
              </span>

            </h1>

            <p className="profile-email">
              {user?.email}
            </p>

          </div>

        </div>

        {/* TABS */}

        <AdminTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* PERFIL */}

        {activeTab ===
          "perfil" && (
          <OrdersList />
        )}

        {/* USERS */}

        {activeTab ===
          "usuarios" && (
          <UsersList />
        )}

        {/* PRODUCTS */}

        {activeTab ===
          "productos" && (
          <ProductsManager />
        )}

        {/* ADD PRODUCT */}

        {activeTab ===
          "agregar" && (
          <AddProductForm />
        )}

      </div>

    </div>
  );
};

export default ProfileAdmin;