import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const FilterControls = ({ 
  sortOption, 
  setSortOption, 
  selectedCategory, 
  setSelectedCategory, 
  categories 
}) => {
  return (
    <Row>
      <Col md={6} className="mb-3">
        <Form.Group>
          <Form.Label className="fw-bold text-muted mb-2">Sort By</Form.Label>
          <Form.Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="form-select"
          >
            <option value="name">Name  </option>
            <option value="year-asc">Year (Tăng )</option>
            <option value="year-desc">Year (Giảm)</option>
            <option value="start-end">Start-End Range</option>
          </Form.Select>
        </Form.Group>
      </Col>

      <Col md={6} className="mb-3">
        <Form.Group>
          <Form.Label className="fw-bold text-muted mb-2">Category Filter</Form.Label>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default FilterControls;
