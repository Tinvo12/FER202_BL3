import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, Button, InputGroup } from 'react-bootstrap';
import { FaSearch, FaTimes, FaGraduationCap, FaUserPlus } from 'react-icons/fa';

const NavigationBar = ({ onQuickSearch, onShowProfileWizard }) => {
  // useState hook - Quản lý state cho search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // handleSearch: xử lý khi người dùng submit search form
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onQuickSearch(searchTerm);
    }
  };

  // clearSearch: xóa search term và reset search
  const clearSearch = () => {
    setSearchTerm('');
    onQuickSearch('');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow">
      <Container>
        {/* Navbar.Brand - Logo và tên ứng dụng */}
        <Navbar.Brand href="#home" className="fw-bold d-flex align-items-center">
          <FaGraduationCap className="me-2 text-primary" size={24} />
          Student Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Nav component từ React Bootstrap - Navigation menu */}
          <Nav className="me-auto">
            <Nav.Link href="#home" className="fw-semibold">Home</Nav.Link>
            <Nav.Link href="#students" className="fw-semibold">Students</Nav.Link>
            <Nav.Link href="#about" className="fw-semibold">About</Nav.Link>
            {/* Build your Profile link - Link mới được thêm vào navbar */}
            {/* Đây là một trong những yêu cầu của đề bài: tạo link "Build your Profile" trên Navbar */}
            <Nav.Link 
              onClick={onShowProfileWizard} 
              className="fw-semibold text-primary"
              style={{ cursor: 'pointer' }}
            >
              <FaUserPlus className="me-1" />
              Build your Profile
            </Nav.Link>
          </Nav>
          {/* Form component từ React Bootstrap - Search form */}
          <Form className="d-flex" onSubmit={handleSearch}>
            {/* InputGroup component từ React Bootstrap - Input với icon */}
            <InputGroup className={`search-group ${isSearchFocused ? 'focused' : ''}`}>
              <InputGroup.Text className="bg-transparent border-end-0">
                <FaSearch className={searchTerm ? 'text-primary' : 'text-muted'} />
              </InputGroup.Text>
              <Form.Control
                type="search"
                placeholder="Quick search students..."
                className="border-start-0 border-end-0 bg-transparent text-white"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                style={{
                  '--bs-placeholder-color': 'rgba(255, 255, 255, 0.6)',
                  '--bs-placeholder-opacity': '1'
                }}
              />
              {searchTerm && (
                <Button 
                  variant="link" 
                  className="border-start-0 text-white p-0 px-2"
                  onClick={clearSearch}
                >
                  <FaTimes />
                </Button>
              )}
            </InputGroup>
            {searchTerm && (
              <Button 
                variant="outline-primary" 
                type="submit"
                className="ms-2"
              >
                Search
              </Button>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
