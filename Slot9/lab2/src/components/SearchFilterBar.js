import React from 'react';
import { Form, InputGroup, Card, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { allGenres } from '../movies';

const SearchFilterBar = ({ onSearch, onFilter, onSort }) => (
  <Card className="mb-3 border-0 shadow-sm searchbar-card">
    <Card.Body>
      <Row className="g-3 align-items-center">
        <Col xs={12}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by title or description..."
              onChange={(e) => onSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={6}>
          <Form.Label className="mb-1">Filter by genre</Form.Label>
          <InputGroup>
            <InputGroup.Text>🎭</InputGroup.Text>
            <Form.Select onChange={(e) => onFilter(e.target.value)}>
              {allGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Col>
        <Col xs={12} md={6}>
          <Form.Label className="mb-1">Sort</Form.Label>
          <InputGroup>
            <InputGroup.Text>⏱️</InputGroup.Text>
            <Form.Select onChange={(e) => onSort(e.target.value)}>
              <option value="none">Sort: None</option>
              <option value="duration-asc">Sort: Duration ↑</option>
              <option value="duration-desc">Sort: Duration ↓</option>
            </Form.Select>
          </InputGroup>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

SearchFilterBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default SearchFilterBar;