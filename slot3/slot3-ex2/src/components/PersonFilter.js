import React, { useState, useMemo } from 'react';
import { persons } from '../person';

const PersonFilter = () => {
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');

 
  const uniqueSkills = useMemo(() => {
    return persons.reduce((skills, person) => {
      person.skills.forEach(skill => {
        if (!skills.includes(skill)) {
          skills.push(skill);
        }
      });
      return skills;
    }, []);
  }, []);

 
  const filteredPersons = useMemo(() => {
    return persons.filter(({ age, skills }) => {
      const ageInRange = (!minAge || age >= parseInt(minAge)) && 
                        (!maxAge || age <= parseInt(maxAge));
      const hasSkill = !selectedSkill || skills.includes(selectedSkill);
      return ageInRange && hasSkill;
    });
  }, [minAge, maxAge, selectedSkill]);

  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-header bg-gradient text-white">
        <h5 className="mb-0">
          <i className="fas fa-filter me-2"></i>
          Filter by Age and Skills
        </h5>
      </div>
      <div className="card-body">
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label fw-bold">
              <i className="fas fa-calendar me-1"></i>
              Min Age:
            </label>
            <input
              type="number"
              className="form-control form-control-sm"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
              placeholder="Min age"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-bold">
              <i className="fas fa-calendar me-1"></i>
              Max Age:
            </label>
            <input
              type="number"
              className="form-control form-control-sm"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
              placeholder="Max age"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-bold">
              <i className="fas fa-code me-1"></i>
              Skill:
            </label>
            <select
              className="form-select form-select-sm"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
            >
              <option value="">All Skills</option>
              {uniqueSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0">
            <i className="fas fa-search me-2"></i>
            Results:
          </h6>
          <span className="badge bg-primary">{filteredPersons.length} found</span>
        </div>

        {filteredPersons.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-sm table-hover">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Skills</th>
                </tr>
              </thead>
              <tbody>
                {filteredPersons.map(({ firstName, lastName, skills }) => (
                  <tr key={`${firstName}-${lastName}`}>
                    <td>
                      <div className="fw-bold text-success">
                        {firstName} - {lastName}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        {skills.map(skill => (
                          <span key={skill} className="badge bg-warning text-dark">
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
            No found.
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonFilter;
