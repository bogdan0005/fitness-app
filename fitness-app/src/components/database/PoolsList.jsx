import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Card.css';

function PoolsList() {
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPools();
  }, []);

  const fetchPools = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/pools');
      setPools(response.data);
    } catch (err) {
      console.error('Ошибка загрузки бассейнов:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Загрузка...</div>;

  return (
    <div className="cards-container">
      <div className="cards-grid">
        {pools.map((pool) => (
          <div key={pool.id} className="card">
            <h3 className="card-title">{pool.name}</h3>
            <div className="card-info">
              <p className="card-detail">Время работы: {pool.work_hours}</p>
              <p className="card-address">{pool.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PoolsList;