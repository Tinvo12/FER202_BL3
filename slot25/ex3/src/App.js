import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, incrementByAmount, reset } from './features/counter/counterSlice';
import { Container, Row, Col, Form, Button, Table, Modal } from 'react-bootstrap';
import { addItem, updateItem, deleteItem, setSearchTerm } from './features/inventory/inventorySlice';

function App() {
  const count = useSelector((state) => state.counter.value);
  const items = useSelector((state) => state.inventory.items);
  const searchTerm = useSelector((state) => state.inventory.searchTerm);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [formState, setFormState] = React.useState({ name: '', quantity: '', price: '' });

  const filteredItems = items.filter((i) =>
    i.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const openCreate = () => {
    setEditingId(null);
    setFormState({ name: '', quantity: '', price: '' });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setFormState({ name: item.name, quantity: item.quantity, price: item.price });
    setShowModal(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formState.name) return;
    if (editingId == null) {
      dispatch(addItem(formState));
    } else {
      dispatch(updateItem({ id: editingId, ...formState }));
    }
    setShowModal(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Redux Counter: {count}</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => dispatch(decrement())}>-1</button>
          <button onClick={() => dispatch(increment())}>+1</button>
          <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
          <button onClick={() => dispatch(reset())}>Reset</button>
        </div>
      </header>

      <Container className="mt-4">
        <Row className="mb-3">
          <Col><h3>Inventory Management</h3></Col>
          <Col className="text-end">
            <Button variant="primary" onClick={openCreate}>Add Item</Button>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, idx) => (
                  <tr key={item.id}>
                    <td>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="me-2"
                        onClick={() => openEdit(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => dispatch(deleteItem(item.id))}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center">No items</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{editingId == null ? 'Add Item' : 'Edit Item'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={formState.quantity}
                onChange={(e) => setFormState({ ...formState, quantity: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.01"
                value={formState.price}
                onChange={(e) => setFormState({ ...formState, price: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
