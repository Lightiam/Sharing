import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ConnectionPage from './pages/ConnectionPage';
import Header from './components/layout/Header';

function App() {
  return (
    <Router>
      <div className="ud-min-h-screen ud-flex ud-flex-col">
        <Header />
        <main className="ud-flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/connect" element={<ConnectionPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
