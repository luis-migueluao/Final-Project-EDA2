import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { useCart } from "../Context/CartContext";
import { useAuthContext } from "../Context/AuthContext"; 
import "../styles/Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext(); 
  
  const { items, addToCart, removeFromCart, clearCart, checkout, isCheckingOut } = useCart();

  const resetAll = () => {
    navigate("/");
  };

  const handleCheckout = async () => {
    if (!user) {
      navigate("/login"); 
      return;
    }

    try {
      const orderId = await checkout();
      if (orderId) {
        alert(`¡Pedido confirmado con éxito! ID de orden: ${orderId}`);
        navigate("/"); 
      }
    } catch (error) {
      alert("Ocurrió un error al procesar tu compra. Por favor, intenta de nuevo.");
    }
  };

  /**
   * Control de cantidades seguro pasando el objeto completo en tiempo real
   */
  const handleQuantityChange = (e: React.MouseEvent, item: any, action: "increment" | "decrement") => {
    e.preventDefault(); 
    
    const fullProduct = { ...item };

    if (action === "increment") {
      addToCart({ ...fullProduct, quantity: 1 });
    } else if (action === "decrement") {
      if (item.quantity > 1) {
        addToCart({ ...fullProduct, quantity: -1 });
      } else {
        removeFromCart(item.id);
      }
    }
  };

  // ================= CÁLCULO DEL TOTAL =================
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <Header resetAll={resetAll} />

      <div className="cart-container">
        <h1>Carrito de compras</h1>

        {/* BANNER SIN EMOJI */}
        {!user && (
          <div className="auth-notice-banner" onClick={() => navigate("/login")} style={{ cursor: 'pointer' }}>
            <p>
              <strong>Inicia sesión</strong> para guardar tu compra en tu cuenta y sincronizarla en cualquier dispositivo.
            </p>
          </div>
        )}

        {/* VISTA DEL CARRITO VACÍO */}
        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="empty-icon">🛒</div>
            <p>Tu carrito está vacío</p>
            <button className="continue-btn" onClick={() => navigate("/")}>
              Seguir comprando
            </button>
          </div>
        ) : (
          <>
            {/* LISTADO DE PRODUCTOS */}
            <div className="cart-list">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.images && item.images[0] ? item.images[0] : "https://via.placeholder.com/150"}
                    alt={item.title}
                  />

                  <div className="cart-info">
                    <h3>{item.title}</h3>
                    
                    <div className="price-container">
                      <span className="item-price">${item.price.toFixed(2)}</span>
                      <span className="unit-badge">por unidad</span>
                    </div>
                    
                    <div className="quantity-selector">
                      <button 
                        type="button"
                        className="qty-btn" 
                        onClick={(e) => handleQuantityChange(e, item, "decrement")}
                        onDoubleClick={(e) => e.preventDefault()}
                      >
                        -
                      </button>
                      <span className="qty-number">{item.quantity}</span>
                      <button 
                        type="button"
                        className="qty-btn" 
                        onClick={(e) => handleQuantityChange(e, item, "increment")}
                        onDoubleClick={(e) => e.preventDefault()}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-actions">
                    <span className="item-subtotal">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* SECCIÓN DE RESUMEN Y ACCIONES GENERALES */}
            <div className="cart-footer">
              <h2>Total: ${total.toFixed(2)}</h2>

              <div className="cart-actions">
                <button 
                  className="clear-btn" 
                  onClick={clearCart}
                  disabled={isCheckingOut}
                >
                  Vaciar carrito
                </button>
                
                <button 
                  className="checkout-btn" 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut 
                    ? "Procesando..." 
                    : user 
                      ? "Finalizar compra" 
                      : "Inicia sesión para comprar"
                  }
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;