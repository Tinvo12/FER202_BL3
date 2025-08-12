import React, { useState, useEffect } from 'react';
import './App.css';
import PersonList from './components/PersonList';
import PersonFilter from './components/PersonFilter';
import SkillRanking from './components/SkillRanking';
import PersonSearch from './components/PersonSearch';

function App() {
  return (
    <div className="App">
      <div className="container-fluid py-4">
        <div className="row mb-4">
          <div className="col-12">
            <h1 className="text-center mb-3 text-primary fw-bold">
              <i className="fas fa-users me-3"></i>
              Person Management System
            </h1>
            <hr className="my-4" />
          </div>
        </div>
        
        <div className="row g-4">
          <div className="col-lg-6">
            <PersonList />
          </div>
          <div className="col-lg-6">
            <PersonFilter />
          </div>
        </div>
        
        <div className="row g-4 mt-2">
          <div className="col-lg-6">
            <SkillRanking />
          </div>
          <div className="col-lg-6">
            <PersonSearch />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
