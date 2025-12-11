import React from 'react';
import PoolsList from '../database/PoolsList';
import './Pages.css';

function PoolsPage() {
  return (
    <div className="page">
      <h1 className="page-title">Бассейны</h1>
      <div className="page-container">
        <PoolsList />
      </div>
    </div>
  );
}

export default PoolsPage;