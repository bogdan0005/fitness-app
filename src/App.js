import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './components/pages/HomePage';
import ClubsPage from './components/pages/ClubsPage';
import ProgramsPage from './components/pages/ProgramsPage';
import GroupProgramsPage from './components/pages/GroupProgramsPage';
import PoolsPage from './components/pages/PoolsPage';
import AccountPage from './components/pages/AccountPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clubs" element={<ClubsPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/group" element={<GroupProgramsPage />} />
            <Route path="/pool" element={<PoolsPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;