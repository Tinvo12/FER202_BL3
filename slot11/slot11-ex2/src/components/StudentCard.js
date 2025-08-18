import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaBirthdayCake, FaEye } from 'react-icons/fa';

const StudentCard = ({ student, onViewDetails }) => {
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/150x150/667eea/ffffff?text=No+Image';
  };

  const getAvatarSrc = () => {
    if (!student.avatar || student.avatar.trim() === '') {
      return `https://via.placeholder.com/150x150/667eea/ffffff?text=${student.name.charAt(0)}`;
    }
    return student.avatar;
  };

  return (
    <Card className="h-100 shadow-sm">
             <div className="text-center p-3">
         <img
           src={getAvatarSrc()}
           alt={`${student.name}'s avatar`}
           className="rounded-circle mb-3 shadow-sm"
           style={{ width: '100px', height: '100px', objectFit: 'cover' }}
           onError={handleImageError}
         />
       </div>
      <Card.Body className="d-flex flex-column">
        <div className="mb-3">
          <h5 className="card-title mb-2">{student.name}</h5>
          <Badge bg="secondary" className="mb-2">ID: {student.id}</Badge>
        </div>
        
        <div className="mb-3">
          <p className="card-text mb-2">
            <FaEnvelope className="me-2 text-muted" />
            <small className="text-muted">{student.email}</small>
          </p>
          <p className="card-text">
            <FaBirthdayCake className="me-2 text-muted" />
            <small className="text-muted">{student.age} years old</small>
          </p>
        </div>
        
        <Button 
          variant="outline-primary" 
          className="mt-auto"
          onClick={() => onViewDetails(student)}
        >
          <FaEye className="me-2" />
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

StudentCard.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired
};

export default StudentCard;
