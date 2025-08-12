import React, { useState, useMemo } from 'react';
import { persons } from '../person';

const PersonSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAndSortedPersons = useMemo(() => {
    
    const filtered = persons.filter(person => {
      const fullName = `${person.firstName} ${person.lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });

    
    return filtered.sort((a, b) => {
      
      if (a.isActive !== b.isActive) {
        return b.isActive ? 1 : -1;
      }
      
      
      if (a.age !== b.age) {
        return a.age - b.age;
      }
      
      return a.lastName.localeCompare(b.lastName);
    });
  }, [searchTerm]);

  
  const statistics = useMemo(() => {
    return filteredAndSortedPersons.reduce((stats, person) => {
      stats.totalPeople += 1;
      stats.totalAge += person.age;
      if (person.isActive) {
        stats.activePeople += 1;
      }
      return stats;
    }, {
      totalPeople: 0,
      totalAge: 0,
      activePeople: 0
    });
  }, [filteredAndSortedPersons]);

  const averageAge = statistics.totalPeople > 0 
    ? Math.round(statistics.totalAge / statistics.totalPeople) 
    : 0;

  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-header bg-gradient text-white">
        <h5 className="mb-0">
          <i className="fas fa-search me-2"></i>
          Search and Multi-Criteria Sort
        </h5>
      </div>
      <div className="card-body">
        <div className="mb-4">
          <label className="form-label fw-bold">
            <i className="fas fa-user me-1"></i>
            Search by Name:
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter first name or last name..."
            />
          </div>
        </div>

      
        <div className="alert alert-info mb-4">
          <h6 className="mb-3">
            <i className="fas fa-chart-bar me-2"></i>
            Statistics:
          </h6>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="text-center">
                <div className="h4 text-primary mb-1">{statistics.totalPeople}</div>
                <small className="text-muted">Total People</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <div className="h4 text-success mb-1">{averageAge}</div>
                <small className="text-muted">Average Age</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <div className="h4 text-warning mb-1">{statistics.activePeople}</div>
                <small className="text-muted">Active People</small>
              </div>
            </div>
          </div>
        </div>

        
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0">
            <i className="fas fa-list me-2"></i>
            Results (Sorted by: Active → Age ↑ → LastName A→Z):
          </h6>
          <span className="badge bg-primary">{filteredAndSortedPersons.length} results</span>
        </div>

        {filteredAndSortedPersons.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Name & Status</th>
                  <th>Age</th>
                  <th>Skills</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedPersons.map(person => (
                  <tr key={person.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="fw-bold text-primary me-2">
                          {person.firstName} {person.lastName}
                        </div>
                        <span className={`badge ${person.isActive ? 'bg-success' : 'bg-secondary'}`}>
                          <i className={`fas fa-${person.isActive ? 'check' : 'times'} me-1`}></i>
                          {person.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-info">{person.age}</span>
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
        ) : (
          <div className="alert alert-warning d-flex align-items-center">
            <i className="fas fa-exclamation-triangle me-2"></i>
            No results found.
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonSearch;
