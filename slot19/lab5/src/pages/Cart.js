import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Table, Alert } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <Container>
        <Row>
          <Col className="text-center">
            <Card className={`${isDark ? 'bg-dark text-light' : ''}`}>
              <Card.Body>
                <h2>Your cart is empty</h2>
                <p>Add some delicious items to your cart!</p>
                <Button variant="primary" onClick={() => navigate('/products')}>
                  Continue Shopping
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2 className={`text-center ${isDark ? 'text-light' : 'text-dark'}`}>
            Shopping Cart
          </h2>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card className={`${isDark ? 'bg-dark text-light' : ''}`}>
            <Card.Body>
              <Table responsive className={isDark ? 'text-light' : ''}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            className="me-3"
                          />
                          <div>
                            <strong>{item.name}</strong>
                            <br />
                            <small className="text-muted">{item.description}</small>
                          </div>
                        </div>
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <Form.Control
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                            style={{ width: '60px', margin: '0 10px' }}
                            min="1"
                          />
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className={`${isDark ? 'bg-dark text-light' : ''}`}>
            <Card.Body>
              <h4>Order Summary</h4>
              <hr />
              
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Tax (10%):</span>
                <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong>${(getTotalPrice() * 1.1).toFixed(2)}</strong>
              </div>

              <div className="d-grid gap-2">
                <Button variant="success" onClick={handleCheckout}>
                  {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
                </Button>
                
                <Button 
                  variant="outline-primary" 
                  onClick={() => navigate('/products')}
                >
                  Continue Shopping
                </Button>
                
                <Button 
                  variant="outline-danger" 
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>

              {!isAuthenticated && (
                <Alert variant="warning" className="mt-3">
                  Please login to complete your purchase.
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
