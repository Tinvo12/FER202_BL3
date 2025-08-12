import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SearchBar from './components/SearchBar';
import FilterControls from './components/FilterControls';
import ResultsInfo from './components/ResultsInfo';
import CompanyTable from './components/CompanyTable';

// Company data
const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
  { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
  { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
  { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
  { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
  { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
  { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];

function App() {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories for filter dropdown
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(companies.map(company => company.category))];
    return ['all', ...uniqueCategories];
  }, []);

  // Filter and sort companies
  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = companies.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || company.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort companies based on selected option
    switch (sortOption) {
      case 'year-asc':
        return filtered.sort((a, b) => a.start - b.start);
      case 'year-desc':
        return filtered.sort((a, b) => b.start - a.start);
      case 'start-end':
        return filtered.sort((a, b) => (a.end - a.start) - (b.end - b.start));
      default:
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [searchTerm, sortOption, selectedCategory]);

  // Handle search
  const handleSearch = () => {
    // Search is handled automatically by the useMemo hook
  };

  return (
    <div className="App">
      <Container fluid className="py-4">
        <Row className="justify-content-center">
          <Col lg={10} xl={11}>
            <Card className="shadow-lg border-0">
              <Card.Header className="bg-primary text-white text-center py-3">
                <h1 className="mb-0">Company List</h1>
              </Card.Header>
              
              <Card.Body className="p-4">
                {/* Search and Filter Controls */}
                <Row className="mb-4">
                  <Col md={6} className="mb-3">
                    <SearchBar 
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      onSearch={handleSearch}
                    />
                  </Col>
                  <Col md={6}>
                    <FilterControls 
                      sortOption={sortOption}
                      setSortOption={setSortOption}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      categories={categories}
                    />
                  </Col>
                </Row>

                {/* Results Count */}
                <ResultsInfo count={filteredAndSortedCompanies.length} />

                {/* Company Table */}
                <CompanyTable companies={filteredAndSortedCompanies} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
