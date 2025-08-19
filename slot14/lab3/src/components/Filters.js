import React from 'react';
import { Row, Col, Form, InputGroup, Card, Button, Badge } from 'react-bootstrap';
import { FaSearch, FaFilter, FaTimes, FaUser, FaCalendarAlt, FaImage } from 'react-icons/fa';

const Filters = ({ 
  searchTerm, 
  onSearchChange, 
  ageRange, 
  onAgeRangeChange, 
  hasAvatar, 
  onHasAvatarChange,
  onClearFilters 
}) => {
  const hasActiveFilters = searchTerm || ageRange || hasAvatar;

  return (
    <Card className="shadow-sm border-0">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">
          <FaFilter className="me-2" />
          Filters & Search
        </h5>
      </Card.Header>
      <Card.Body className="p-4">
        {/* Search Section */}
        <div className="mb-4">
          <Form.Label className="fw-bold text-muted mb-2">
            <FaSearch className="me-2" />
            Search Students
          </Form.Label>
          <InputGroup>
            <InputGroup.Text className="bg-light border-end-0">
              <FaUser className="text-muted" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="border-start-0"
            />
            {searchTerm && (
              <Button 
                variant="outline-secondary" 
                onClick={() => onSearchChange('')}
                className="border-start-0"
              >
                <FaTimes />
              </Button>
            )}
          </InputGroup>
        </div>

        {/* Age Range Section */}
        <div className="mb-4">
          <Form.Label className="fw-bold text-muted mb-2">
            <FaCalendarAlt className="me-2" />
            Age Range
          </Form.Label>
          <Form.Select
            value={ageRange}
            onChange={(e) => onAgeRangeChange(e.target.value)}
            className="form-select-lg"
          >
            <option value="">All Ages</option>
            <option value="≤20">≤ 20 years old</option>
            <option value="21-25">21 - 25 years old</option>
                         <option value=">25">{'>'} 25 years old</option>
          </Form.Select>
        </div>

        {/* Avatar Filter Section */}
        <div className="mb-4">
          <Form.Label className="fw-bold text-muted mb-2">
            <FaImage className="me-2" />
            Avatar Filter
          </Form.Label>
          <div className="d-flex align-items-center">
            <Form.Check
              type="switch"
              id="hasAvatar"
              label="Show only students with avatars"
              checked={hasAvatar}
              onChange={(e) => onHasAvatarChange(e.target.checked)}
              className="me-3"
            />
            {hasAvatar && (
              <Badge bg="success" className="ms-auto">
                Active
              </Badge>
            )}
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="d-grid">
            <Button 
              variant="outline-danger" 
              onClick={onClearFilters}
              className="mt-3"
            >
              <FaTimes className="me-2" />
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="mt-3 p-3 bg-light rounded">
            <small className="text-muted fw-bold">Active Filters:</small>
            <div className="mt-2">
              {searchTerm && (
                <Badge bg="primary" className="me-2 mb-1">
                  Search: "{searchTerm}"
                </Badge>
              )}
              {ageRange && (
                <Badge bg="info" className="me-2 mb-1">
                  Age: {ageRange}
                </Badge>
              )}
              {hasAvatar && (
                <Badge bg="success" className="me-2 mb-1">
                  Has Avatar
                </Badge>
              )}
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Filters;
