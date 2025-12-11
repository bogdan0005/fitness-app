import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Card.css';

function FitnessClubsList() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/fitness-clubs');
      setClubs(response.data);
    } catch (err) {
      console.error('Ошибка загрузки:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Загрузка...</div>;

  return (
    <div className="cards-container">
      <div className="cards-grid">
        {clubs.map((club) => (
          <div key={club.id} className="card">
            <h3 className="card-title">{club.name}</h3>
            <div className="card-info">
              <p className="card-detail">{club.work_hours}</p>
              <p className="card-address">{club.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FitnessClubsList;