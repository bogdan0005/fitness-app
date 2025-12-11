import React from 'react';
import ReadyProgramsList from '../database/ReadyProgramsList';
import './Pages.css';

function ProgramsPage() {
  return (
    <div className="page">
      <h1 className="page-title">Программы</h1>
      <div className="page-container">
        <ReadyProgramsList />
      </div>
    </div>
  );
}

export default ProgramsPage;