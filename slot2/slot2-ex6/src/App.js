import React from 'react';
import './App.css';
import PeopleOperations from './components/PeopleOperations';
import ArrayOperations from './components/ArrayOperations';
import CompanyOperations from './components/CompanyOperations';
import ShapeClasses from './components/ShapeClasses';
import PromiseExample from './components/PromiseExample';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ES6 and JSX Exercise</h1>
      </header>
      <main>
        <PeopleOperations />
        <ArrayOperations />
        <CompanyOperations />
        <ShapeClasses />
        <PromiseExample />
      </main>
    </div>
  );
}

export default App;
