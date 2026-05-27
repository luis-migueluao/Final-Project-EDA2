// src/Pages/ProfileUser.tsx

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuthContext,
} from "../Context/AuthContext";

import {
  db,
} from "../firebase/config";

import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import Header from "../Components/Header";

import "../styles/Profile.css";

interface OrderProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  products: OrderProduct[];
}

const ProfileUser = () => {

  const { user, loading: authLoading } =
    useAuthContext();

  const navigate =
    useNavigate();

  const [orders,
    setOrders] =
      useState<Order[]>([]);

  const [loading,
    setLoading] =
      useState(true);

  // ================= FETCH ORDERS =================

  useEffect(() => {

    // Esperar a que Firebase termine de cargar antes de decidir si redirigir
    if (authLoading) return;

    if (!user) {

      navigate("/login");

      return;
    }

    const fetchOrders =
      async () => {

        try {

          const ordersRef =
            collection(
              db,
              "users",
              user.uid,
              "ORDERS"
            );

          const q =
            query(
              ordersRef,
              orderBy(
                "date",
                "desc"
              )
            );

          const snapshot =
            await getDocs(q);

          const ordersData =
            snapshot.docs.map(
              (doc) => {

                const data =
                  doc.data();

                return {

                  id: doc.id,

                  date:
                    data.date?.toDate?.()?.toLocaleDateString(
                      "es-CO",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    ) ||
                    "Fecha no disponible",

                  total:
                    data.total || 0,

                  status:
                    data.status ||
                    "completed",

                  products:
                    data.products || [],
                };
              }
            );

          setOrders(
            ordersData
          );

        } catch (error) {

          console.error(
            "Error cargando órdenes:",
            error
          );

        } finally {

          setLoading(false);
        }
      };

    fetchOrders();

  }, [user, navigate, authLoading]);

  // ================= NAVIGATION =================

  const resetAll = () => {

    navigate("/");
  };

  // ================= RENDER =================

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
            </h1>

            <p className="profile-email">
              {user?.email}
            </p>

          </div>

        </div>

        {/* ORDERS */}

        <div className="profile-orders-section">

          <h2>
            Historial de compras
          </h2>

          {authLoading ? (
            <div className="profile-loading">
              Verificando sesión...
            </div>
          ) : loading ? (

            <div className="profile-loading">
              Cargando órdenes...
            </div>

          ) : orders.length === 0 ? (

            <div className="profile-empty">

              <div className="empty-icon">
                📦
              </div>

              <p>
                No tienes compras aún
              </p>

              <button
                className="continue-btn"
                onClick={() =>
                  navigate("/")
                }
              >
                Ir a la tienda
              </button>

            </div>

          ) : (

            <div className="orders-list">

              {orders.map(
                (order) => (

                  <div
                    key={order.id}
                    className="order-card"
                  >

                    {/* HEADER */}

                    <div className="order-header">

                      <div>

                        <span className="order-label">
                          Orden
                        </span>

                        <span className="order-value">
                          #{order.id.slice(0, 8)}
                        </span>

                      </div>

                      <div>

                        <span className="order-label">
                          Fecha
                        </span>

                        <span className="order-value">
                          {order.date}
                        </span>

                      </div>

                      <div className="order-total">

                        <span className="order-label">
                          Total
                        </span>

                        <span className="order-value">
                          ${order.total}
                        </span>

                      </div>

                      <div>

                        <span className="order-label">
                          Estado
                        </span>

                        <span
                          className={`status-badge ${order.status}`}
                        >
                          {order.status}
                        </span>

                      </div>

                    </div>

                    {/* PRODUCTS */}

                    <div className="order-products">

                      {order.products.map(
                        (product) => (

                          <div
                            key={product.id}
                            className="order-product-item"
                          >

                            <span className="order-product-title">
                              {product.title}
                            </span>

                            <span className="order-product-qty">
                              x{product.quantity}
                            </span>

                            <span className="order-product-price">
                              ${product.price}
                            </span>

                          </div>
                        )
                      )}

                    </div>

                  </div>
                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default ProfileUser;