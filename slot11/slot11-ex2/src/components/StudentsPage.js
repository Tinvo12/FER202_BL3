import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Alert, Badge } from 'react-bootstrap';
import { students } from '../data/students';
import Filters from './Filters';
import SortDropdown from './SortDropdown';
import StudentGrid from './StudentGrid';
import StudentDetailModal from './StudentDetailModal';
import { FaSearch } from 'react-icons/fa';

const StudentsPage = ({ quickSearchTerm }) => {
 
  const [searchTerm, setSearchTerm] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [hasAvatar, setHasAvatar] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = [...students];

    
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    
    if (ageRange) {
      switch (ageRange) {
        case '≤20':
          filtered = filtered.filter(student => student.age <= 20);
          break;
        case '21-25':
          filtered = filtered.filter(student => student.age >= 21 && student.age <= 25);
          break;
        case '>25':
          filtered = filtered.filter(student => student.age > 25);
          break;
        default:
          break;
      }
    }

    
    if (hasAvatar) {
      filtered = filtered.filter(student => student.avatar && student.avatar.trim() !== '');
    }

    
    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'age-asc':
            return a.age - b.age;
          case 'age-desc':
            return b.age - a.age;
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [searchTerm, ageRange, hasAvatar, sortBy]);

  
  const handleQuickSearch = (term) => {
    setSearchTerm(term);
  };

 
  React.useEffect(() => {
    if (quickSearchTerm) {
      setSearchTerm(quickSearchTerm);
    }
  }, [quickSearchTerm]);

  
  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

 
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  
  const handleClearFilters = () => {
    setSearchTerm('');
    setAgeRange('');
    setHasAvatar(false);
    setSortBy('');
  };

  return (
    <Container fluid className="px-0">
      <Container>
        <Row>
          <Col lg={3} className="mb-4">
            <div className="sticky-top" style={{ top: '20px' }}>
                             <Filters
                 searchTerm={searchTerm}
                 onSearchChange={setSearchTerm}
                 ageRange={ageRange}
                 onAgeRangeChange={setAgeRange}
                 hasAvatar={hasAvatar}
                 onHasAvatarChange={setHasAvatar}
                 onClearFilters={handleClearFilters}
               />
              <SortDropdown
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>
          </Col>
                     <Col lg={9}>
             <div className="mb-4">
               <div className="d-flex justify-content-between align-items-center mb-3">
                 <h4 className="mb-0">
                   Students 
                   <Badge bg="primary" className="ms-2 fs-6">
                     {filteredAndSortedStudents.length}
                   </Badge>
                 </h4>
                 {filteredAndSortedStudents.length !== students.length && (
                   <small className="text-muted">
                     Filtered from {students.length} total students
                   </small>
                 )}
               </div>
               {searchTerm && (
                 <Alert variant="info" className="py-2">
                   <FaSearch className="me-2" />
                   Search results for: <strong>"{searchTerm}"</strong>
                 </Alert>
               )}
             </div>
            <StudentGrid
              students={filteredAndSortedStudents}
              onViewDetails={handleViewDetails}
            />
          </Col>
        </Row>
      </Container>

      <StudentDetailModal
        student={selectedStudent}
        show={showModal}
        onHide={handleCloseModal}
      />
    </Container>
  );
};

StudentsPage.propTypes = {
  quickSearchTerm: PropTypes.string
};

StudentsPage.defaultProps = {
  quickSearchTerm: ''
};

export default StudentsPage;
