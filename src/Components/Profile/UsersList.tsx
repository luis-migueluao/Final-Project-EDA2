// src/Components/Profile/UsersList.tsx

import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import {
  db,
} from "../../firebase/config";

// ================= TYPES =================

interface AppUser {
  uid: string;
  email: string;
  role?: string;
}

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

const UsersList = () => {

  const [users,
    setUsers] =
      useState<AppUser[]>([]);

  const [selectedUser,
    setSelectedUser] =
      useState<string | null>(
        null
      );

  const [userOrders,
    setUserOrders] =
      useState<Order[]>([]);

  const [loadingUsers,
    setLoadingUsers] =
      useState(false);

  // ================= FETCH USERS =================

  useEffect(() => {

    const fetchUsers =
      async () => {

        setLoadingUsers(
          true
        );

        try {

          const usersRef =
            collection(
              db,
              "users"
            );

          const snapshot =
            await getDocs(
              usersRef
            );

          const usersData:
            AppUser[] =
            snapshot.docs.map(
              (doc) => ({

                uid: doc.id,

                email:
                  doc.data()
                    .email ||
                  "Sin email",

                role:
                  doc.data()
                    .role ||
                  "user",
              })
            );

          setUsers(
            usersData
          );

        } catch (error) {

          console.error(
            "Error cargando usuarios:",
            error
          );

        } finally {

          setLoadingUsers(
            false
          );
        }
      };

    fetchUsers();

  }, []);

  // ================= FETCH USER ORDERS =================

  const fetchUserOrders =
    async (
      uid: string
    ) => {

      setSelectedUser(uid);

      setUserOrders([]);

      try {

        const ordersRef =
          collection(
            db,
            "users",
            uid,
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

        setUserOrders(
          ordersData
        );

      } catch (error) {

        console.error(
          "Error cargando órdenes:",
          error
        );
      }
    };

  // ================= LOADING =================

  if (loadingUsers) {

    return (

      <div className="profile-loading">
        Cargando usuarios...
      </div>
    );
  }

  // ================= RENDER =================

  return (

    <div className="admin-users-section">

      <h2>
        👥 Todos los usuarios
      </h2>

      {/* USERS */}

      <div className="users-grid">

        {users.map(
          (u) => (

            <div
              key={u.uid}
              className={`user-card ${
                selectedUser ===
                u.uid
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                fetchUserOrders(
                  u.uid
                )
              }
            >

              <div className="user-card-avatar">
                👤
              </div>

              <div className="user-card-info">

                <span className="user-card-email">
                  {u.email}
                </span>

                <span
                  className={`user-card-role ${
                    u.role ===
                    "Admin"
                      ? "role-admin"
                      : ""
                  }`}
                >

                  {u.role ===
                  "Admin"
                    ? "🛡️ Admin"
                    : "👤 Usuario"}

                </span>

              </div>

            </div>
          )
        )}

      </div>

      {/* USER ORDERS */}

      {selectedUser && (

        <div className="user-orders-section">

          <h3>

            Órdenes de {

              users.find(
                (u) =>
                  u.uid ===
                  selectedUser
              )?.email

            }

          </h3>

          {userOrders.length ===
          0 ? (

            <p className="no-orders">
              Sin órdenes
            </p>

          ) : (

            <div className="orders-list">

              {userOrders.map(
                (order) => (

                  <div
                    key={order.id}
                    className="order-card"
                  >

                    <div className="order-header">

                      <div>

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

                      <div>

                        <span className="order-label">
                          Fecha
                        </span>

                        <span className="order-value">
                          {order.date}
                        </span>

                      </div>

                      <div>

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

                      <div>

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
                        (
                          product
                        ) => (

                          <div
                            key={product.id}
                            className="order-product-item"
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
          )}

        </div>
      )}

    </div>
  );
};

export default UsersList;