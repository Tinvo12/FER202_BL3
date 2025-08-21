import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import Modal from "./Modal";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalValue } =
    useContext(CartContext);
  const [toast, setToast] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) {
      setToast("Giỏ hàng trống, không thể xác nhận đơn hàng.");
      return;
    }
    setConfirmOpen(true);
  };

  const handleCheckout = () => {
   
    setConfirmOpen(false);
    setSuccessOpen(true);
    clearCart();
  };

  return (
    <div className="cart-section">
      <h2>Giỏ hàng</h2>
      {cartItems.length === 0 ? (
        <p className="muted">Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <span>
                  <strong>{item.name}</strong>
                  <span style={{ marginLeft: 8, color: "#666" }}> - ${item.price}</span>
                </span>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <div className="summary-row">
              <span>Tổng số món</span>
              <strong>{cartItems.length}</strong>
            </div>
            <div className="summary-row">
              <span>Tổng giá trị</span>
              <strong>${totalValue}</strong>
            </div>
            <div className="cart-actions">
              <button onClick={clearCart}>Clear Cart</button>
              <button className="btn-secondary" onClick={handleConfirmOrder}>Xác nhận đơn hàng</button>
            </div>
            {toast && <p className="status-msg">{toast}</p>}
          </div>
        </div>
      )}

      {/* Modal xác nhận đơn hàng */}
      <Modal
        open={confirmOpen}
        title="Xác nhận đơn hàng"
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleCheckout}
        confirmLabel="Thanh toán"
      >
        <p>Bạn có chắc muốn thanh toán đơn hàng với tổng giá trị <strong>${totalValue}</strong>?</p>
      </Modal>

      {/* Modal thanh toán thành công */}
      <Modal
        open={successOpen}
        title="Thanh toán thành công"
        onClose={() => setSuccessOpen(false)}
      >
        <p>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được ghi nhận!</p>
      </Modal>
    </div>
  );
};

export default Cart;
