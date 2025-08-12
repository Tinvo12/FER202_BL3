import React, { useMemo } from 'react';
import { persons } from '../person';

const SkillRanking = () => {
  // Calculate skill frequency using reduce
  const skillRanking = useMemo(() => {
    const skillCount = persons.reduce((acc, person) => {
      person.skills.forEach(skill => {
        acc[skill] = (acc[skill] || 0) + 1;
      });
      return acc;
    }, {});

    // Convert to array and sort by count (descending)
    return Object.entries(skillCount)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-header bg-gradient text-white">
        <h5 className="mb-0">
          <i className="fas fa-trophy me-2"></i>
          Skill Ranking
        </h5>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted">Top skills by frequency</span>
          <span className="badge bg-success">{skillRanking.length} skills</span>
        </div>
        
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th width="60%">Skill</th>
                <th width="40%">Count</th>
              </tr>
            </thead>
            <tbody>
              {skillRanking.map((item, index) => (
                <tr key={item.skill} className={index === 0 ? 'table-warning' : ''}>
                  <td>
                    <div className="d-flex align-items-center">
                      {index === 0 && (
                        <i className="fas fa-crown text-warning me-2"></i>
                      )}
                      {index === 1 && (
                        <i className="fas fa-medal text-secondary me-2"></i>
                      )}
                      {index === 2 && (
                        <i className="fas fa-medal text-bronze me-2"></i>
                      )}
                      <span className={index === 0 ? 'fw-bold text-warning' : ''}>
                        {item.skill}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className={`badge ${index === 0 ? 'bg-warning text-dark' : 'bg-primary'} me-2`}>
                        {item.count}
                      </span>
                      {index === 0 && (
                        <small className="text-success fw-bold">TOP 1</small>
                      )}
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

export default SkillRanking;
