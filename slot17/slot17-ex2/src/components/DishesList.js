import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Row, Col, Card, Button, Form } from "react-bootstrap";

const DishesList = ({ dishes }) => {
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");

  const normalizedQuery = searchTerm.trim().toLowerCase();
  const filteredDishes = normalizedQuery
    ? dishes.filter(
        (dish) =>
          dish.name.toLowerCase().includes(normalizedQuery) ||
          dish.description.toLowerCase().includes(normalizedQuery)
      )
    : dishes;

  return (
    <div>
      <h2 className="mb-3">Danh sách món ăn</h2>
      <Form className="mb-3">
        <Form.Control
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm theo tên hoặc mô tả..."
        />
      </Form>
      {filteredDishes.length === 0 && (
        <p className="text-muted">Không tìm thấy món phù hợp.</p>
      )}
      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {filteredDishes.map((dish) => (
          <Col key={dish.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={dish.image} alt={dish.name} style={{ height: 160, objectFit: "cover" }} />
              <Card.Body>
                <Card.Title>{dish.name}</Card.Title>
                <Card.Text style={{ minHeight: 48 }}>{dish.description}</Card.Text>
                <Card.Text className="fw-semibold">{`Price: $${parseFloat(dish.price).toFixed(2)}`}</Card.Text>
                <Button variant="success" onClick={() => addToCart(dish)}>Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DishesList;
