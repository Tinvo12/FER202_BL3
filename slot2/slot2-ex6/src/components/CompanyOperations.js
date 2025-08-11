import React, { useState, useEffect, useRef } from 'react';

const CompanyOperations = () => {
  const [results, setResults] = useState({});
  const [retailCompanies, setRetailCompanies] = useState([]);
  const [counter, setCounter] = useState(0);
  const counterRef = useRef(0);

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

  useEffect(() => {
    // 1. Print company names using forEach
    const companyNames = [];
    companies.forEach(company => {
      companyNames.push(company.name);
    });

    // 2. Companies that started after 1987
    const companiesAfter1987 = companies.filter(company => company.start > 1987);

    // 3. Retail companies with incremented start year
    const retailCompaniesData = companies
      .filter(company => company.category === "Retail")
      .map(company => ({
        ...company,
        start: company.start + 1
      }));

    // 4. Sort companies by end date (ascending)
    const sortedCompanies = [...companies].sort((a, b) => a.end - b.end);

    // 5. Sort ages in descending order
    const sortedAges = [...ages].sort((a, b) => b - a);

    // 6. Sum of all ages using reduce
    const sumOfAges = ages.reduce((acc, age) => acc + age, 0);

    // 7. New object with destructuring and ES6
    const { name, category } = companies[0];
    const newObject = {
      name,
      category,
      print() {
        return `Name: ${this.name}`;
      }
    };

    // 8. Function with unknown number of arguments (numbers)
    const sumNumbers = (...numbers) => {
      return numbers.reduce((acc, num) => acc + num, 0);
    };

    // 9. Function with unknown number of arguments (any type)
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

    // 10. Destructuring street from person
    const { address: { street } } = person;

    // 11. Function that returns incrementing number
    const getIncrementingNumber = () => {
      counterRef.current += 1;
      return counterRef.current - 1;
    };

    // 12. Function to parse URL query parameters
    const parseQueryParams = (url) => {
      const urlObj = new URL(url);
      const params = {};
      urlObj.searchParams.forEach((value, key) => {
        params[key] = value;
      });
      return params;
    };

    setResults({
      companyNames,
      companiesAfter1987,
      sortedCompanies,
      sortedAges,
      sumOfAges,
      newObject,
      sumNumbers: sumNumbers(1, 2, 3, 4, 5),
      addToArray: addToArray(1, [2, 3], 4, [5, 6]),
      street,
      parseQueryParams: parseQueryParams('https://example.com?name=John&age=25&city=NYC')
    });

    setRetailCompanies(retailCompaniesData);
  }, []);

  const handleIncrement = () => {
    setCounter(prev => prev + 1);
  };

  return (
    <div className="section">
      <h2>3. Company Operations</h2>
      
      <div className="results">
        <div className="result-item">
          <h3>1. Company Names (forEach):</h3>
          <ul>
            {results.companyNames?.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>

        <div className="result-item">
          <h3>2. Companies Started After 1987:</h3>
          <ul>
            {results.companiesAfter1987?.map((company, index) => (
              <li key={index}>{company.name} (start: {company.start})</li>
            ))}
          </ul>
        </div>

        <div className="result-item">
          <h3>3. Retail Companies (with incremented start year):</h3>
          <div className="retail-companies">
            {retailCompanies.map((company, index) => (
              <div key={index} className="company-card">
                <p><strong>Name:</strong> {company.name}</p>
                <p><strong>Category:</strong> {company.category}</p>
                <p><strong>Start:</strong> {company.start}</p>
                <p><strong>End:</strong> {company.end}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="result-item">
          <h3>4. Companies Sorted by End Date (Ascending):</h3>
          <ul>
            {results.sortedCompanies?.map((company, index) => (
              <li key={index}>{company.name} (end: {company.end})</li>
            ))}
          </ul>
        </div>

        <div className="result-item">
          <h3>5. Ages Sorted (Descending):</h3>
          <p>{results.sortedAges?.join(', ')}</p>
        </div>

        <div className="result-item">
          <h3>6. Sum of All Ages:</h3>
          <p>{results.sumOfAges}</p>
        </div>

        <div className="result-item">
          <h3>7. New Object with Destructuring:</h3>
          <p>Name: {results.newObject?.name}</p>
          <p>Category: {results.newObject?.category}</p>
          <p>Print method result: {results.newObject?.print()}</p>
        </div>

        <div className="result-item">
          <h3>8. Sum of Numbers (rest parameters):</h3>
          <p>sumNumbers(1, 2, 3, 4, 5) = {results.sumNumbers}</p>
        </div>

        <div className="result-item">
          <h3>9. Add to Array (any type):</h3>
          <p>addToArray(1, [2, 3], 4, [5, 6]) = [{results.addToArray?.join(', ')}]</p>
        </div>

        <div className="result-item">
          <h3>10. Destructured Street:</h3>
          <p>Street: {results.street}</p>
        </div>

        <div className="result-item">
          <h3>11. Incrementing Counter:</h3>
          <p>Current count: {counter}</p>
          <button onClick={handleIncrement}>Increment</button>
        </div>

        <div className="result-item">
          <h3>12. URL Query Parameters:</h3>
          <p>Parsed params: {JSON.stringify(results.parseQueryParams, null, 2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyOperations;
