import React from 'react';
import GroupProgramsList from '../database/GroupProgramsList';
import './Pages.css';

function GroupProgramsPage() {
  return (
    <div className="page">
      <h1 className="page-title">Групповые программы</h1>
      <div className="page-container">
        <GroupProgramsList />
      </div>
    </div>
  );
}

export default GroupProgramsPage;