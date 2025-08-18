import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Alert } from 'react-bootstrap';
import StudentCard from './StudentCard';

const StudentGrid = ({ students, onViewDetails }) => {
  if (students.length === 0) {
    return (
      <Alert variant="info" className="text-center">
        <h5>No students found</h5>
        <p>Try adjusting your search criteria or filters.</p>
      </Alert>
    );
  }

  return (
    <Row>
      {students.map((student) => (
        <Col key={student.id} xs={12} sm={6} lg={4} className="mb-4">
          <StudentCard 
            student={student} 
            onViewDetails={onViewDetails}
          />
        </Col>
      ))}
    </Row>
  );
};

StudentGrid.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      avatar: PropTypes.string.isRequired
    })
  ).isRequired,
  onViewDetails: PropTypes.func.isRequired
};

export default StudentGrid;
