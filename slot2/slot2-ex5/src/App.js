import React, { useState, useEffect } from 'react';
import './App.css';
import { createShapeExamples } from './ShapeClasses';

function App() {
  // Exercise 1: People array for teenager operations
  const people = [
    {name: 'Jack', age: 50},
    {name: 'Michael', age: 9}, 
    {name: 'John', age: 40}, 
    {name: 'Ann', age: 19}, 
    {name: 'Elisabeth', age: 16}
  ];

  // Exercise 2: Array for reduce operations
  const array = [1, 2, 3, 4];

  // Exercise 3: Companies, ages, and person data
  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
  ];

  const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

  const person = {
    name: "Costas",
    address: {
      street: "Lalaland 12"
    }
  };

  // State for counter function
  const [counter, setCounter] = useState(0);
  const [promiseResult, setPromiseResult] = useState(null);
  const [promiseError, setPromiseError] = useState(null);

  // Teenager helper function
  const isTeenager = (age) => age >= 10 && age <= 20;

  // Exercise 1: People operations
  const firstTeenager = people.find(person => isTeenager(person.age));
  const allTeenagers = people.filter(person => isTeenager(person.age));
  const everyPersonTeenager = people.every(person => isTeenager(person.age));
  const anyPersonTeenager = people.some(person => isTeenager(person.age));

  // Exercise 2: Array reduce operations
  const sumWithReduce = array.reduce((acc, curr) => acc + curr, 0);
  const productWithReduce = array.reduce((acc, curr) => acc * curr, 1);

  // Exercise 3: Companies operations
  const companiesAfter1987 = companies.filter(company => company.start > 1987);
  const retailCompanies = companies.filter(company => company.category === "Retail");
  const retailCompaniesIncremented = retailCompanies.map(company => ({
    ...company,
    start: company.start + 1
  }));
  const companiesSortedByEnd = [...companies].sort((a, b) => a.end - b.end);
  const agesSortedDesc = [...ages].sort((a, b) => b - a);
  const sumOfAges = ages.reduce((acc, curr) => acc + curr, 0);

  // Object destructuring and method
  const { name, category } = companies[0];
  const companyObject = {
    name,
    category,
    print() {
      return this.name;
    }
  };

  // Function with unknown number of arguments
  const sumNumbers = (...numbers) => numbers.reduce((acc, curr) => acc + curr, 0);

  // Function that adds arguments to array
  const addToArray = (...args) => {
    const result = [];
    args.forEach(arg => {
      if (Array.isArray(arg)) {
        result.push(...arg);
      } else {
        result.push(arg);
      }
    });
    return result;
  };

  // Destructuring street
  const { address: { street } } = person;

  // Counter function
  const getNextNumber = () => {
    setCounter(prev => prev + 1);
    return counter;
  };

  // URL query parameters function
  const parseQueryParams = (url) => {
    try {
      const urlObj = new URL(url);
      const params = {};
      urlObj.searchParams.forEach((value, key) => {
        params[key] = value;
      });
      return params;
    } catch (error) {
      return { error: "Invalid URL" };
    }
  };

  // Promise function for random number
  const getRandomNumberPromise = () => {
    return new Promise((resolve, reject) => {
      const randomNum = Math.floor(Math.random() * 10) + 1;
      if (randomNum > 5) {
        resolve(randomNum);
      } else {
        reject("Error");
      }
    });
  };

  // Test functions
  const testSumNumbers = () => sumNumbers(1, 2, 3, 4, 5);
  const testAddToArray = () => addToArray(1, [2, 3], 4, [5, 6]);
  const testParseQueryParams = () => parseQueryParams("https://example.com?name=John&age=25");

  useEffect(() => {
    getRandomNumberPromise()
      .then(result => setPromiseResult(result))
      .catch(error => setPromiseError(error));
  }, []);

  // Create shape examples
  const shapeExamples = createShapeExamples();

  return (
    <div className="App">
      <header className="app-header">
        <h1>Exercise 4: JSX and ES6</h1>
        <p>JSX (JavaScript XML) and ES6 (ECMAScript 2015) Implementation</p>
      </header>

      <main className="main-content">
        {/* Exercise 1: Hello React */}
        <section className="exercise">
          <h2>1. Hello React Design</h2>
          <div className="hello-react">
            <h1>Hello <span className="react-text">React</span></h1>
          </div>
        </section>

        {/* Exercise 2: React Logo */}
        <section className="exercise">
          <h2>2. React Logo Design</h2>
          <div className="react-logo-section">
            <div className="react-logo">
              <svg viewBox="0 0 100 100" width="100" height="100">
                <circle cx="50" cy="50" r="8" fill="#61dafb"/>
                <ellipse cx="50" cy="50" rx="25" ry="8" fill="none" stroke="#61dafb" strokeWidth="2" transform="rotate(0 50 50)"/>
                <ellipse cx="50" cy="50" rx="25" ry="8" fill="none" stroke="#61dafb" strokeWidth="2" transform="rotate(60 50 50)"/>
                <ellipse cx="50" cy="50" rx="25" ry="8" fill="none" stroke="#61dafb" strokeWidth="2" transform="rotate(120 50 50)"/>
              </svg>
            </div>
            <div className="line-with-extension">
              <div className="horizontal-line"></div>
              <div className="vertical-extension"></div>
            </div>
            <p className="caption-1">This is the React logo!</p>
            <p className="caption-2">(I don't know why it is here either)</p>
            <p className="description">The library for web and native user interfaces</p>
          </div>
        </section>

        {/* Exercise 3: Navbar */}
        <section className="exercise">
          <h2>3. Navbar with JSX</h2>
          <nav className="navbar">
            <div className="nav-item active">Home</div>
            <div className="nav-item">Search</div>
            <div className="nav-item">Contact</div>
            <div className="nav-item login">Login</div>
          </nav>
        </section>

        {/* Exercise 4: JSX Text */}
        <section className="exercise">
          <h2>4. JSX Text Display</h2>
          <div className="jsx-text">
            <h1>This is JSX</h1>
          </div>
        </section>

        {/* Exercise 5: Course List */}
        <section className="exercise">
          <h2>5. Course List Display</h2>
          <div className="course-section">
            <h2>Course names</h2>
            <ul className="course-list">
              <li>React</li>
              <li>ReactNative</li>
              <li>NodeJs</li>
            </ul>
          </div>
        </section>

        {/* ES6 and JSX Exercises */}
        <section className="exercise">
          <h2>ES6 and JSX Features Implementation</h2>
          
          {/* Exercise 1: People operations */}
          <div className="subsection">
            <h3>1. People Array Operations</h3>
            <div className="data-display">
              <p><strong>People Data:</strong></p>
              <pre>{JSON.stringify(people, null, 2)}</pre>
            </div>
            <div className="results">
              <p><strong>First teenager:</strong> {firstTeenager ? firstTeenager.name : 'None'}</p>
              <p><strong>All teenagers:</strong> {allTeenagers.map(p => p.name).join(', ')}</p>
              <p><strong>Every person is teenager:</strong> {everyPersonTeenager.toString()}</p>
              <p><strong>Any person is teenager:</strong> {anyPersonTeenager.toString()}</p>
            </div>
          </div>

          {/* Exercise 2: Array reduce operations */}
          <div className="subsection">
            <h3>2. Array Reduce Operations</h3>
            <div className="data-display">
              <p><strong>Array:</strong> [{array.join(', ')}]</p>
            </div>
            <div className="results">
              <p><strong>Sum with reduce:</strong> {sumWithReduce}</p>
              <p><strong>Product with reduce:</strong> {productWithReduce}</p>
            </div>
          </div>

          {/* Exercise 3: Companies operations */}
          <div className="subsection">
            <h3>3. Companies Data Operations</h3>
            
            <div className="operation-group">
              <h4>Companies after 1987:</h4>
              <p>{companiesAfter1987.map(c => c.name).join(', ')}</p>
            </div>

            <div className="operation-group">
              <h4>Sum of all ages:</h4>
              <p>{sumOfAges}</p>
            </div>

            <div className="operation-group">
              <h4>Company object print method:</h4>
              <p>{companyObject.print()}</p>
            </div>

            <div className="operation-group">
              <h4>Street from person (destructuring):</h4>
              <p>{street}</p>
            </div>

            <div className="operation-group">
              <h4>Counter function:</h4>
              <p>Current value: {counter}</p>
              <button onClick={getNextNumber}>Increment Counter</button>
            </div>

            <div className="operation-group">
              <h4>Test Functions:</h4>
              <p><strong>Sum numbers (1,2,3,4,5):</strong> {testSumNumbers()}</p>
              <p><strong>Add to array (1, [2,3], 4, [5,6]):</strong> [{testAddToArray().join(', ')}]</p>
              <p><strong>Parse query params:</strong> {JSON.stringify(testParseQueryParams())}</p>
            </div>
          </div>

          {/* Retail Companies Table */}
          <div className="subsection">
            <h3>Retail Companies (Start incremented by 1)</h3>
            <div className="companies-table">
              {retailCompaniesIncremented.map((company, index) => (
                <div key={index} className="company-row">
                  <p><strong>Name:</strong> {company.name}</p>
                  <p><strong>Category:</strong> {company.category}</p>
                  <p><strong>Start:</strong> {company.start}</p>
                  <p><strong>End:</strong> {company.end}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Promise Exercise */}
          <div className="subsection">
            <h3>4. Promise Exercise</h3>
            <p>Random number generator (resolves if &gt; 5, rejects if ≤ 5):</p>
            {promiseResult && <p className="success"><strong>Success! Random number &gt; 5:</strong> {promiseResult}</p>}
            {promiseError && <p className="error"><strong>Error:</strong> {promiseError}</p>}
          </div>
        </section>

        {/* Classes Exercise */}
        <section className="exercise">
          <h2>5. Shape Classes Implementation</h2>
          <div className="classes-demo">
            <p>Shape classes implemented according to UML diagram:</p>
            <div className="class-diagram">
              <div className="class-box">
                <h4>Shape (Superclass)</h4>
                <p><strong>Attributes:</strong> color</p>
                <p><strong>Methods:</strong> getArea(), toString()</p>
              </div>
              <div className="class-box">
                <h4>Rectangle (Subclass)</h4>
                <p><strong>Attributes:</strong> length, width</p>
                <p><strong>Methods:</strong> getArea(), toString()</p>
              </div>
              <div className="class-box">
                <h4>Triangle (Subclass)</h4>
                <p><strong>Attributes:</strong> base, height</p>
                <p><strong>Methods:</strong> getArea(), toString()</p>
              </div>
            </div>
            <div className="shape-examples">
              <h4>Shape Examples:</h4>
              <p><strong>Rectangle:</strong> {shapeExamples.rectangle.toString()}</p>
              <p><strong>Triangle:</strong> {shapeExamples.triangle.toString()}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>Exercise 4: JSX and ES6 - Complete Implementation</p>
        <p>All requirements from the exercise have been implemented successfully.</p>
      </footer>
    </div>
  );
}

export default App;
