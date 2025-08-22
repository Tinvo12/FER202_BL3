import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Card, ListGroup, Button, Row, Col, Modal, Alert } from "react-bootstrap";

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
    <Card className="mt-4">
      <Card.Body>
        <Card.Title as="h2" className="h4">Giỏ hàng</Card.Title>
        {toast && (
          <Alert variant="warning" className="my-2" onClose={() => setToast("")} dismissible>
            {toast}
          </Alert>
        )}
        {cartItems.length === 0 ? (
          <p className="text-muted mb-0">Giỏ hàng của bạn đang trống.</p>
        ) : (
          <>
            <ListGroup className="mb-3">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                  <span>
                    <strong>{item.name}</strong>
                    <span className="text-muted ms-2">- ${item.price}</span>
                  </span>
                  <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>Remove</Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Row className="g-2 align-items-center">
              <Col xs="12" md>
                <div className="d-flex justify-content-between">
                  <span>Tổng số món</span>
                  <strong>{cartItems.length}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Tổng giá trị</span>
                  <strong>${totalValue}</strong>
                </div>
              </Col>
              <Col xs="12" md="auto" className="d-flex gap-2 mt-2 mt-md-0">
                <Button variant="outline-secondary" onClick={clearCart}>Clear Cart</Button>
                <Button variant="secondary" onClick={handleConfirmOrder}>Xác nhận đơn hàng</Button>
              </Col>
            </Row>
          </>
        )}
      </Card.Body>

      {/* Modal xác nhận đơn hàng */}
      <Modal show={confirmOpen} onHide={() => setConfirmOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có chắc muốn thanh toán đơn hàng với tổng giá trị <strong>${totalValue}</strong>?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmOpen(false)}>Hủy</Button>
          <Button variant="primary" onClick={handleCheckout}>Thanh toán</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal thanh toán thành công */}
      <Modal show={successOpen} onHide={() => setSuccessOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thanh toán thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được ghi nhận!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setSuccessOpen(false)}>Đóng</Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default Cart;
