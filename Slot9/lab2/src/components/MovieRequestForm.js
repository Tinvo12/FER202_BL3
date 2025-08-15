import React, { useState } from 'react';
import { Container, Form, Button, Toast, InputGroup, Card, Row, Col } from 'react-bootstrap';
import { allGenres } from '../movies';

const MovieRequestForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    year: '',
    duration: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.genre) newErrors.genre = 'Genre is required';
    if (!formData.year || formData.year <= 1900) newErrors.year = 'Year must be greater than 1900';
    if (!formData.duration || formData.duration <= 0) newErrors.duration = 'Duration must be greater than 0';
    if (!formData.description || formData.description.length < 30)
      newErrors.description = 'Description must be at least 30 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowToast(true);
      setFormData({ title: '', genre: '', year: '', duration: '', description: '' });
      setErrors({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container className="content">
      <h2 className="mb-4 text-center"><i className="bi bi-journal-plus me-2"></i>Movie Request Form</h2>
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-4">
              <Col xs={12}>
                <Form.Label>Title</Form.Label>
                <InputGroup>
                  <InputGroup.Text><i className="bi bi-type"></i></InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    isInvalid={!!errors.title}
                    placeholder="Enter movie title"
                  />
                  <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </InputGroup>
              </Col>

              <Col xs={12} md={6}>
                <Form.Label>Genre</Form.Label>
                <InputGroup>
                  <InputGroup.Text><i className="bi bi-ticket-perforated"></i></InputGroup.Text>
                  <Form.Select
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    isInvalid={!!errors.genre}
                  >
                    <option value="">Select genre</option>
                    {allGenres.slice(1).map((genre) => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.genre}</Form.Control.Feedback>
                </InputGroup>
              </Col>

              <Col xs={12} md={6}>
                <Form.Label>Year</Form.Label>
                <InputGroup>
                  <InputGroup.Text><i className="bi bi-calendar2-week"></i></InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    isInvalid={!!errors.year}
                    placeholder="Enter release year"
                  />
                  <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
                </InputGroup>
              </Col>

              <Col xs={12} md={6}>
                <Form.Label>Duration (minutes)</Form.Label>
                <InputGroup>
                  <InputGroup.Text><i className="bi bi-stopwatch"></i></InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    isInvalid={!!errors.duration}
                    placeholder="Enter duration in minutes"
                  />
                  <Form.Control.Feedback type="invalid">{errors.duration}</Form.Control.Feedback>
                </InputGroup>
              </Col>

              <Col xs={12}>
                <Form.Label>Description</Form.Label>
                <InputGroup>
                  <InputGroup.Text><i className="bi bi-card-text"></i></InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    isInvalid={!!errors.description}
                    placeholder="Describe the movie (minimum 30 characters)"
                    rows={4}
                  />
                  <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                </InputGroup>
              </Col>

              <Col xs={12} className="text-center">
                <Button type="submit" variant="primary">
                  <i className="bi bi-send-check me-2"></i>Submit Request
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        className="position-fixed bottom-0 end-0 m-3 form-toast"
      >
        <Toast.Header>
          <strong className="me-auto">Submission</strong>
        </Toast.Header>
        <Toast.Body>Request submitted. Thank you!</Toast.Body>
      </Toast>
    </Container>
  );
};

export default MovieRequestForm;