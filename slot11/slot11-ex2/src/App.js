import React, { useState } from 'react';
import NavigationBar from './components/Navbar';
import Hero from './components/Hero';
import StudentsPage from './components/StudentsPage';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [quickSearchTerm, setQuickSearchTerm] = useState('');

  const handleQuickSearch = (term) => {
    setQuickSearchTerm(term);
  };

  return (
    <div className="App">
      <NavigationBar onQuickSearch={handleQuickSearch} />
      <Hero />
      <StudentsPage quickSearchTerm={quickSearchTerm} />
      <Footer />
    </div>
  );
}

export default App;