import "../styles/CheckoutModal.css";

interface CheckoutModalProps {
  orderId: string;
  total: number;
  onClose: () => void;
  onViewOrders: () => void;
}

const CheckoutModal = ({ orderId, total, onClose, onViewOrders }: CheckoutModalProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">✅</div>
        <h2>¡Compra confirmada!</h2>
        <p className="modal-subtitle">Tu pedido se ha procesado con éxito.</p>

        <div className="modal-details">
          <div className="modal-detail-row">
            <span>Número de orden</span>
            <span className="modal-order-id">#{orderId.slice(0, 8)}</span>
          </div>
          <div className="modal-detail-row">
            <span>Total pagado</span>
            <span className="modal-total">${total.toFixed(2)}</span>
          </div>
        </div>

        <p className="modal-info">
          Puedes ver el detalle de tu compra en la sección de perfil.
        </p>

        <div className="modal-actions">
          <button className="modal-btn-primary" onClick={onViewOrders}>
            Ver mis compras
          </button>
          <button className="modal-btn-secondary" onClick={onClose}>
            Seguir comprando
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;