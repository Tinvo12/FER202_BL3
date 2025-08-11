import React, { useState } from 'react';

const PromiseExample = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Promise function that generates random number larger than 5
  const generateRandomNumber = () => {
    return new Promise((resolve, reject) => {
      // Simulate some processing time
      setTimeout(() => {
        const randomNumber = Math.floor(Math.random() * 10) + 1; // 1-10
        
        if (randomNumber > 5) {
          resolve(randomNumber);
        } else {
          reject("Error: Number is less than or equal to 5");
        }
      }, 1000);
    });
  };

  const handleGenerateNumber = async () => {
    setIsLoading(true);
    const timestamp = new Date().toLocaleTimeString();
    
    try {
      const result = await generateRandomNumber();
      setResults(prev => [...prev, {
        timestamp,
        type: 'success',
        message: `Generated number: ${result}`,
        number: result
      }]);
    } catch (error) {
      setResults(prev => [...prev, {
        timestamp,
        type: 'error',
        message: error,
        number: null
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMultiplePromises = async () => {
    setIsLoading(true);
    const promises = [];
    
    // Generate 5 promises
    for (let i = 0; i < 5; i++) {
      promises.push(generateRandomNumber());
    }
    
    const timestamp = new Date().toLocaleTimeString();
    
    try {
      const results = await Promise.all(promises);
      setResults(prev => [...prev, {
        timestamp,
        type: 'success',
        message: `All 5 numbers generated successfully: ${results.join(', ')}`,
        numbers: results
      }]);
    } catch (error) {
      setResults(prev => [...prev, {
        timestamp,
        type: 'error',
        message: `One or more promises failed: ${error}`,
        numbers: null
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromiseRace = async () => {
    setIsLoading(true);
    const timestamp = new Date().toLocaleTimeString();
    
    try {
      const result = await Promise.race([
        generateRandomNumber(),
        generateRandomNumber(),
        generateRandomNumber()
      ]);
      
      setResults(prev => [...prev, {
        timestamp,
        type: 'success',
        message: `First successful number: ${result}`,
        number: result
      }]);
    } catch (error) {
      setResults(prev => [...prev, {
        timestamp,
        type: 'error',
        message: `All promises failed: ${error}`,
        number: null
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
  };

  return (
    <div className="section">
      <h2>5. Promises</h2>
      
      <div className="promise-explanation">
        <h3>Promise Concept:</h3>
        <p>
          Promises represent the eventual completion (or failure) of an asynchronous operation. 
          They have two channels: one for results (resolve), and one for potential errors (reject).
        </p>
        <ul>
          <li><strong>then()</strong>: Handles successful results</li>
          <li><strong>catch()</strong>: Handles errors</li>
          <li><strong>finally()</strong>: Executes regardless of success or failure</li>
        </ul>
      </div>

      <div className="promise-controls">
        <h3>Promise Operations:</h3>
        <div className="button-group">
          <button 
            onClick={handleGenerateNumber} 
            disabled={isLoading}
            className="promise-btn"
          >
            {isLoading ? 'Generating...' : 'Generate Single Number'}
          </button>
          
          <button 
            onClick={handleMultiplePromises} 
            disabled={isLoading}
            className="promise-btn"
          >
            {isLoading ? 'Generating...' : 'Generate 5 Numbers (Promise.all)'}
          </button>
          
          <button 
            onClick={handlePromiseRace} 
            disabled={isLoading}
            className="promise-btn"
          >
            {isLoading ? 'Racing...' : 'Promise Race (3 numbers)'}
          </button>
          
          <button 
            onClick={clearResults} 
            className="promise-btn clear-btn"
          >
            Clear Results
          </button>
        </div>
      </div>

      <div className="promise-results">
        <h3>Results:</h3>
        {results.length === 0 ? (
          <p className="no-results">No results yet. Click a button to generate numbers!</p>
        ) : (
          <div className="results-list">
            {results.map((result, index) => (
              <div 
                key={index} 
                className={`result-item ${result.type}`}
              >
                <div className="result-header">
                  <span className="timestamp">{result.timestamp}</span>
                  <span className={`status ${result.type}`}>
                    {result.type === 'success' ? '✅ Success' : '❌ Error'}
                  </span>
                </div>
                <p className="message">{result.message}</p>
                {result.number && (
                  <p className="number">Number: <strong>{result.number}</strong></p>
                )}
                {result.numbers && (
                  <p className="numbers">Numbers: <strong>{result.numbers.join(', ')}</strong></p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="code-example">
        <h3>Code Implementation:</h3>
        <pre>
{`// Promise function that generates random number larger than 5
const generateRandomNumber = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      
      if (randomNumber > 5) {
        resolve(randomNumber);  // Success channel
      } else {
        reject("Error: Number is less than or equal to 5");  // Error channel
      }
    }, 1000);
  });
};

// Using the promise
generateRandomNumber()
  .then(result => {
    console.log('Generated number:', result);
  })
  .catch(error => {
    console.log('Error:', error);
  });

// Using async/await
try {
  const result = await generateRandomNumber();
  console.log('Generated number:', result);
} catch (error) {
  console.log('Error:', error);
}`}
        </pre>
      </div>
    </div>
  );
};

export default PromiseExample;
