import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Arogyadwar from './components/Arogyadwar';
import BloodBankPage from './pages/BloodBankPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Arogyadwar />} />
        <Route path="/blood-bank" element={<BloodBankPage />} />
      </Routes>
    </Router>
  );
}

export default App;