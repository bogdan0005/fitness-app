import React from 'react';
import FitnessClubsList from '../database/FitnessClubsList';
import './Pages.css';

function ClubsPage() {
  return (
    <div className="page">
      <h1 className="page-title">Список фитнес-клубов</h1>
      <div className="page-container">
        <FitnessClubsList />
      </div>
    </div>
  );
}

export default ClubsPage;