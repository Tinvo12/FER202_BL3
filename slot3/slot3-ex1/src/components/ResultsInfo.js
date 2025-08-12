import React from 'react';
import { Alert } from 'react-bootstrap';

const ResultsInfo = ({ count }) => {
  return (
    <Alert variant="info" className="mb-3">
      <strong>Found {count} company(ies)</strong>
    </Alert>
  );
};

export default ResultsInfo;
