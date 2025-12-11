import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';

function UsersList() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUser(response.data);
    } catch (err) {
      console.error('Ошибка загрузки пользователя:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (!user) return <div className="loading">Пользователь не найден</div>;

  return (
    <div className="user-profile-container">
      <div className="user-info-section">
        <h2 className="user-full-name">{user.full_name}</h2>
        <div className="user-details-grid">
          <div className="user-detail">
            <span className="detail-label">Дата регистрации:</span>
            <span className="detail-value">{user.registration_date}</span>
          </div>
          {user.age && (
            <div className="user-detail">
              <span className="detail-label">Возраст:</span>
              <span className="detail-value">{user.age} лет</span>
            </div>
          )}
          {user.gender && (
            <div className="user-detail">
              <span className="detail-label">Пол:</span>
              <span className="detail-value">{user.gender}</span>
            </div>
          )}
          {user.weight_kg && (
            <div className="user-detail">
              <span className="detail-label">Вес:</span>
              <span className="detail-value">{user.weight_kg} кг</span>
            </div>
          )}
          {user.level && (
            <div className="user-detail">
              <span className="detail-label">Уровень:</span>
              <span className="detail-value">{user.level}</span>
            </div>
          )}
          {user.goal && (
            <div className="user-detail">
              <span className="detail-label">Цель:</span>
              <span className="detail-value">{user.goal}</span>
            </div>
          )}
        </div>
      </div>

      <div className="favorite-programs-section">
        <h3 className="programs-section-title">Избранные программы</h3>
        {user.favorite_ready_programs_data && user.favorite_ready_programs_data.length > 0 ? (
          <div className="favorite-programs-grid">
            {user.favorite_ready_programs_data.map((program) => (
              <div key={`ready-${program.id}`} className="favorite-program-card program-card-compact">
                <span className="program-type">Готовая программа</span>
                <h4 className="program-name">{program.name}</h4>
                <div className="program-details">
                  <p><strong>Цель:</strong> {program.goal}</p>
                  {program.level && <p><strong>Уровень:</strong> {program.level}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-favorites">
            Нет избранных программ
          </div>
        )}
      </div>

      <div className="favorite-programs-section">
        <h3 className="programs-section-title">Избранные групповые программы</h3>
        {user.favorite_group_programs_data && user.favorite_group_programs_data.length > 0 ? (
          <div className="favorite-programs-grid">
            {user.favorite_group_programs_data.map((program) => (
              <div key={`group-${program.id}`} className="favorite-program-card program-card-compact">
                <span className="program-type">Групповая программа</span>
                <h4 className="program-name">{program.name}</h4>
                <div className="program-details">
                  <p><strong>Цель:</strong> {program.goal}</p>
                  {program.max_participants && <p><strong>Макс. участников:</strong> {program.max_participants}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-favorites">
            Нет избранных групповых программ
          </div>
        )}
      </div>

      <div className="favorite-programs-section">
        <h3 className="programs-section-title">Созданные тренировки</h3>
        {user.custom_programs_data && user.custom_programs_data.length > 0 ? (
          <div className="favorite-programs-grid">
            {user.custom_programs_data.map((program) => (
              <div key={`custom-${program.id}`} className="favorite-program-card program-card-compact">
                <span className="program-type">Созданная тренировка</span>
                <h4 className="program-name">{program.name}</h4>
                <div className="program-details">
                  <p><strong>Цель:</strong> {program.goal}</p>
                  {program.level && <p><strong>Уровень:</strong> {program.level}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-favorites">
            Нет созданных тренировок
          </div>
        )}
      </div>
    </div>
  );
}

export default UsersList;