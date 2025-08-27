import React from 'react';
import { Container, Row, Col, Card, Button, Badge, InputGroup, Form } from 'react-bootstrap';
import { FaArrowLeft, FaTrash, FaPlus, FaMinus, FaCreditCard, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/format';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { showToast } = useToast();

  // Hàm xử lý đường dẫn ảnh
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (/^https?:\/\//i.test(imagePath)) return imagePath; // URL tuyệt đối
    
    // Xử lý đường dẫn từ db.json: "images/phones/..." -> "/images/phones/..."
    if (imagePath.startsWith('images/')) {
      return '/' + imagePath;
    }
    
    return '/' + imagePath.replace(/^\/+/, '');
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      showToast('Product removed from cart', 'info');
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    showToast('Thank you for your purchase! Order placed successfully.', 'success');
    clearCart();
    navigate('/products');
  };

  return (
    <Container className="py-4">
      <div className="d-flex align-items-center mb-4">
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate('/products')}
          className="me-3"
        >
          <FaArrowLeft className="me-2" />
          Back to Products
        </Button>
        <h1 className="mb-0">
          <FaShoppingCart className="text-success me-2" />
          Shopping Cart
        </h1>
      </div>

      {cartItems.length === 0 ? (
        <Card className="text-center py-5">
          <Card.Body>
            <FaShoppingCart size={64} className="text-muted mb-3" />
            <h3>Your Cart is Empty</h3>
            <p className="text-muted">Add some products to your cart to get started.</p>
            <Button variant="primary" onClick={() => navigate('/products')}>
              Browse Products
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">Cart Items ({cartItems.length})</h5>
              </Card.Header>
              <Card.Body>
                {cartItems.map(item => (
                  <div key={item.id} className="d-flex align-items-center mb-3 p-3 border rounded">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      className="me-3 rounded"
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{item.name}</h6>
                      <p className="text-muted small mb-1">{item.description}</p>
                      <Badge bg="primary" className="mb-2">
                        {formatPrice(item.price)}
                      </Badge>
                    </div>
                    <div className="d-flex align-items-center me-3">
                      <InputGroup size="sm" style={{ width: '120px' }}>
                        <Button
                          variant="outline-secondary"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <FaMinus />
                        </Button>
                        <Form.Control
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                          min="1"
                          className="text-center"
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <FaPlus />
                        </Button>
                      </InputGroup>
                    </div>
                    <div className="text-end me-3">
                      <h6 className="mb-1">{formatPrice(item.price * item.quantity)}</h6>
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        removeFromCart(item.id);
                        showToast(`${item.name} removed from cart`, 'info');
                      }}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={4}>
            <Card className="sticky-top" style={{ top: '20px' }}>
              <Card.Header>
                <h5 className="mb-0">Order Summary</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total:</strong>
                  <strong className="text-primary fs-5">{formatPrice(getCartTotal())}</strong>
                </div>
                
                <div className="d-grid gap-2">
                  <Button
                    variant="success"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}
                  >
                    <FaCreditCard className="me-2" />
                    Checkout
                  </Button>
                  
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      clearCart();
                      showToast('Cart cleared', 'info');
                    }}
                  >
                    Clear Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CartPage;
