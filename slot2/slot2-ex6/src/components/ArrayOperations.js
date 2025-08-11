import React, { useState, useEffect } from 'react';

const ArrayOperations = () => {
  const [results, setResults] = useState({});

  const array = [1, 2, 3, 4];

  useEffect(() => {
    // 1. Using reduce with initial value
    const sumWithInitial = array.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 10); // Initial value is 10

    const productWithInitial = array.reduce((accumulator, currentValue) => {
      return accumulator * currentValue;
    }, 2); // Initial value is 2

    // 2. Using arrow functions for simpler implementation
    const sumArrow = array.reduce((acc, val) => acc + val, 0);
    const productArrow = array.reduce((acc, val) => acc * val, 1);
    const maxArrow = array.reduce((acc, val) => Math.max(acc, val), -Infinity);
    const minArrow = array.reduce((acc, val) => Math.min(acc, val), Infinity);

    setResults({
      sumWithInitial,
      productWithInitial,
      sumArrow,
      productArrow,
      maxArrow,
      minArrow
    });
  }, []);

  return (
    <div className="section">
      <h2>2. Array Operations</h2>
      <div className="data-display">
        <h3>Original Array:</h3>
        <pre>{JSON.stringify(array)}</pre>
      </div>
      
      <div className="results">
        <h3>Reduce Operations:</h3>
        
        <div className="result-item">
          <h4>Sum with initial value (10):</h4>
          <p>Result: {results.sumWithInitial}</p>
          <p><em>Calculation: 10 + 1 + 2 + 3 + 4 = {results.sumWithInitial}</em></p>
        </div>

        <div className="result-item">
          <h4>Product with initial value (2):</h4>
          <p>Result: {results.productWithInitial}</p>
          <p><em>Calculation: 2 × 1 × 2 × 3 × 4 = {results.productWithInitial}</em></p>
        </div>

        <h3>Arrow Function Examples:</h3>
        
        <div className="result-item">
          <h4>Sum using arrow function:</h4>
          <p>Result: {results.sumArrow}</p>
        </div>

        <div className="result-item">
          <h4>Product using arrow function:</h4>
          <p>Result: {results.productArrow}</p>
        </div>

        <div className="result-item">
          <h4>Maximum using arrow function:</h4>
          <p>Result: {results.maxArrow}</p>
        </div>

        <div className="result-item">
          <h4>Minimum using arrow function:</h4>
          <p>Result: {results.minArrow}</p>
        </div>

        <div className="code-example">
          <h4>Code Examples:</h4>
          <pre>
{`// Traditional function
const sum = array.reduce(function(acc, val) {
  return acc + val;
}, 0);

// Arrow function (much cleaner!)
const sumArrow = array.reduce((acc, val) => acc + val, 0);`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ArrayOperations;
