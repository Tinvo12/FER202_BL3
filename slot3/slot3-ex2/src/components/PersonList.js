import React, { useState } from 'react';
import { persons } from '../person';

const PersonList = () => {
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [sortedPersons, setSortedPersons] = useState([...persons]);

  const handleSort = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    
    const sorted = [...persons].sort((a, b) => {
      const nameA = a.firstName.toLowerCase();
      const nameB = b.firstName.toLowerCase();
      
      if (newOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
    
    setSortedPersons(sorted);
  };

  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-header bg-gradient text-white">
        <h5 className="mb-0">
          <i className="fas fa-list me-2"></i>
          Person List
        </h5>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button 
            className="btn btn-outline-primary btn-sm"
            onClick={handleSort}
          >
            <i className={`fas fa-sort-alpha-${sortOrder === 'asc' ? 'down' : 'up'} me-2`}></i>
            Sort First Name: {sortOrder === 'asc' ? 'A→Z' : 'Z→A'}
          </button>
          <span className="badge bg-secondary">{sortedPersons.length} persons</span>
        </div>
        
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Full Name</th>
                <th>Age</th>
                <th>City</th>
                <th>Skills</th>
              </tr>
            </thead>
            <tbody>
              {sortedPersons.map(person => (
                <tr key={person.id} className="align-middle">
                  <td>
                    <div className="fw-bold text-primary">
                      {person.firstName} {person.lastName}
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-info">{person.age}</span>
                  </td>
                  <td>
                    <small className="text-muted">{person.city}</small>
                  </td>
                  <td>
                    <div className="d-flex flex-wrap gap-1">
                      {person.skills.map(skill => (
                        <span key={skill} className="badge bg-light text-dark border">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PersonList;
