import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Card.css';

function ReadyProgramsList() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/ready-programs');
      setPrograms(response.data);
    } catch (err) {
      console.error('Ошибка загрузки программ:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Загрузка...</div>;

  return (
    <div className="cards-container">
      <div className="cards-grid">
        {programs.map((program) => (
          <div key={program.id} className="card">
            <h3 className="card-title">{program.name}</h3>
            <div className="card-info">
              <p className="card-detail">Цель: {program.goal}</p>
              <p className="card-detail">Уровень: {program.level}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReadyProgramsList;