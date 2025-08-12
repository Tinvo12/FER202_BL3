import React from 'react';
import { Table, Alert } from 'react-bootstrap';

const CompanyTable = ({ companies }) => {
  if (companies.length === 0) {
    return (
      <Alert variant="warning" className="text-center py-4">
        <strong>No results found</strong>
        <br />
        <small className="text-muted">Try adjusting your search or filter criteria</small>
      </Alert>
    );
  }

  return (
    <div className="table-responsive">
      <Table striped bordered hover className="mb-0">
        <thead className="table-dark">
          <tr>
            <th>Company Name</th>
            <th>Category</th>
            <th>Start Year</th>
            <th>End Year</th>
            <th>Duration (Years)</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={index}>
              <td className="fw-bold">{company.name}</td>
              <td>
                <span className="badge bg-secondary">{company.category}</span>
              </td>
              <td>{company.start}</td>
              <td>{company.end}</td>
              <td>
                <span className="badge bg-info">{company.end - company.start}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CompanyTable;
