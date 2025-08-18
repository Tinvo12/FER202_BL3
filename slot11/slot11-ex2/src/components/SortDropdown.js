import React from 'react';
import { Form, InputGroup, Card } from 'react-bootstrap';
import { FaSort, FaSortAmountDown, FaSortAmountUp, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';

const SortDropdown = ({ sortBy, onSortChange }) => {
  const getSortIcon = () => {
    switch (sortBy) {
      case 'age-asc':
        return <FaSortAmountUp className="text-success" />;
      case 'age-desc':
        return <FaSortAmountDown className="text-success" />;
      case 'name-asc':
        return <FaSortAlphaUp className="text-success" />;
      case 'name-desc':
        return <FaSortAlphaDown className="text-success" />;
      default:
        return <FaSort className="text-muted" />;
    }
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case 'age-asc':
        return 'Age (Youngest First)';
      case 'age-desc':
        return 'Age (Oldest First)';
      case 'name-asc':
        return 'Name (A → Z)';
      case 'name-desc':
        return 'Name (Z → A)';
      default:
        return 'No Sorting';
    }
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Header className="bg-secondary text-white">
        <h6 className="mb-0">
          <FaSort className="me-2" />
          Sort Options
        </h6>
      </Card.Header>
      <Card.Body className="p-3">
        <Form.Label className="fw-bold text-muted mb-2">
          Sort Students By
        </Form.Label>
        <InputGroup>
          <InputGroup.Text className="bg-light border-end-0">
            {getSortIcon()}
          </InputGroup.Text>
          <Form.Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="border-start-0"
          >
            <option value="">No Sorting</option>
            <option value="age-asc">Age (Youngest First)</option>
            <option value="age-desc">Age (Oldest First)</option>
            <option value="name-asc">Name (A → Z)</option>
            <option value="name-desc">Name (Z → A)</option>
          </Form.Select>
        </InputGroup>
        
        {sortBy && (
          <div className="mt-3 p-2 bg-light rounded">
            <small className="text-muted">
              <strong>Current Sort:</strong> {getSortLabel()}
            </small>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default SortDropdown;
