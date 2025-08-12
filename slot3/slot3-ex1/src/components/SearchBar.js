import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div>
      <Form.Label className="fw-bold text-muted mb-2">Search Companies</Form.Label>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Enter company name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="border-end-0"
        />
        <Button 
          variant="primary" 
          onClick={onSearch}
          className="border-start-0"
        >
          Search
        </Button>
      </InputGroup>
    </div>
  );
};

export default SearchBar;
