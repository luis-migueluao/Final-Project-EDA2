// src/Components/Profile/OrdersList.tsx

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import {
  db,
} from "../../firebase/config";

import {
  useAuthContext,
} from "../../Context/AuthContext";

// ================= TYPES =================

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  products: {
    id: number;
    title: string;
    price: number;
    quantity: number;
  }[];
}

// ================= COMPONENT =================

const OrdersList = () => {

  const { user } =
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

    if (!user) return;

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

          const q = query(
            ordersRef,
            orderBy(
              "date",
              "desc"
            )
          );

          const snapshot =
            await getDocs(q);

          const ordersData:
            Order[] =
            snapshot.docs.map(
              (doc) => {

                const data =
                  doc.data();

                return {

                  id: doc.id,

                  date:
                    data.date
                      ?.toDate?.()
                      ?.toLocaleDateString(
                        "es-CO",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      ) ||
                    "Sin fecha",

                  total:
                    data.total || 0,

                  status:
                    data.status ||
                    "completed",

                  products:
                    data.products ||
                    [],
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

  }, [user]);

  // ================= LOADING =================

  if (loading) {

    return (
      <div className="profile-loading">
        Cargando órdenes...
      </div>
    );
  }

  // ================= EMPTY =================

  if (
    orders.length === 0
  ) {

    return (

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
    );
  }

  // ================= RENDER =================

  return (

    <div className="profile-orders-section">

      <h2>
        Historial de compras
      </h2>

      <div className="orders-list">

        {orders.map(
          (order) => (

            <div
              key={order.id}
              className="order-card"
            >

              <div className="order-header">

                <div className="order-id">

                  <span className="order-label">
                    Orden
                  </span>

                  <span className="order-value">
                    #
                    {order.id.slice(
                      0,
                      8
                    )}
                  </span>

                </div>

                <div className="order-date">

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
                    $
                    {order.total.toFixed(
                      2
                    )}
                  </span>

                </div>

                <div className="order-status">

                  <span
                    className={`status-badge ${order.status}`}
                  >

                    {order.status ===
                    "completed"
                      ? "✅ Completado"
                      : order.status}

                  </span>

                </div>

              </div>

              <div className="order-products">

                {order.products.map(
                  (product) => (

                    <div
                      key={product.id}
                      className="order-product-item"
                      onClick={() =>
                        navigate(
                          `/product/${product.id}`
                        )
                      }
                    >

                      <span className="order-product-title">
                        {product.title}
                      </span>

                      <span className="order-product-qty">
                        x
                        {product.quantity}
                      </span>

                      <span className="order-product-price">
                        $
                        {(
                          product.price *
                          product.quantity
                        ).toFixed(2)}
                      </span>

                    </div>
                  )
                )}

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
};

export default OrdersList;