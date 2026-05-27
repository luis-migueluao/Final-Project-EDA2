// src/Components/profile/AdminTabs.tsx

import React from "react";

export type AdminTab =
  | "perfil"
  | "usuarios"
  | "productos"
  | "agregar";

interface Props {
  activeTab: AdminTab;

  setActiveTab:
    React.Dispatch<
      React.SetStateAction<AdminTab>
    >;
}

const AdminTabs = ({
  activeTab,
  setActiveTab,
}: Props) => {

  return (
    <div className="admin-tabs">

      {/* PERFIL */}

      <button
        className={`admin-tab ${
          activeTab === "perfil"
            ? "active"
            : ""
        }`}
        onClick={() =>
          setActiveTab(
            "perfil"
          )
        }
      >
        🔵 Mi Perfil
      </button>

      {/* USERS */}

      <button
        className={`admin-tab ${
          activeTab === "usuarios"
            ? "active"
            : ""
        }`}
        onClick={() =>
          setActiveTab(
            "usuarios"
          )
        }
      >
        👥 Usuarios
      </button>

      {/* PRODUCTS */}

      <button
        className={`admin-tab ${
          activeTab === "productos"
            ? "active"
            : ""
        }`}
        onClick={() =>
          setActiveTab(
            "productos"
          )
        }
      >
        📦 Productos
      </button>

      {/* ADD PRODUCT */}

      <button
        className={`admin-tab ${
          activeTab === "agregar"
            ? "active"
            : ""
        }`}
        onClick={() =>
          setActiveTab(
            "agregar"
          )
        }
      >
        ➕ Agregar Producto
      </button>

    </div>
  );
};

export default AdminTabs;