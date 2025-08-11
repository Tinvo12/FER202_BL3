import React, { useState, useEffect } from 'react';

const PeopleOperations = () => {
  const [results, setResults] = useState({});

  const people = [
    {name: 'Jack', age: 50},
    {name: 'Michael', age: 9}, 
    {name: 'John', age: 40}, 
    {name: 'Ann', age: 19}, 
    {name: 'Elisabeth', age: 16}
  ];

  useEffect(() => {
    // Helper function to check if age is teenager (10-20)
    const isTeenager = (age) => age >= 10 && age <= 20;

    // 1. Find the first person who is a teenager
    const firstTeenager = people.find(person => isTeenager(person.age));

    // 2. Find all people who are teenagers
    const allTeenagers = people.filter(person => isTeenager(person.age));

    // 3. Check if every person is a teenager
    const everyPersonTeenager = people.every(person => isTeenager(person.age));

    // 4. Check if any person is a teenager
    const anyPersonTeenager = people.some(person => isTeenager(person.age));

    setResults({
      firstTeenager,
      allTeenagers,
      everyPersonTeenager,
      anyPersonTeenager
    });
  }, []);

  return (
    <div className="section">
      <h2>1. People Operations</h2>
      <div className="data-display">
        <h3>Original Data:</h3>
        <pre>{JSON.stringify(people, null, 2)}</pre>
      </div>
      
      <div className="results">
        <h3>Results:</h3>
        
        <div className="result-item">
          <h4>First teenager:</h4>
          <p>
            {results.firstTeenager 
              ? `${results.firstTeenager.name} (age: ${results.firstTeenager.age})`
              : 'No teenager found'
            }
          </p>
        </div>

        <div className="result-item">
          <h4>All teenagers:</h4>
          <ul>
            {results.allTeenagers?.map((person, index) => (
              <li key={index}>{person.name} (age: {person.age})</li>
            ))}
          </ul>
        </div>

        <div className="result-item">
          <h4>Every person is teenager:</h4>
          <p>{results.everyPersonTeenager ? 'True' : 'False'}</p>
        </div>

        <div className="result-item">
          <h4>Any person is teenager:</h4>
          <p>{results.anyPersonTeenager ? 'True' : 'False'}</p>
        </div>
      </div>
    </div>
  );
};

export default PeopleOperations;
