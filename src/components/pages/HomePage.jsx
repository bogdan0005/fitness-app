import React, { useEffect, useState } from 'react';
import './HomePage.css';
import './Pages.css';

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.body.classList.add('home-page');
    return () => {
      document.body.classList.remove('home-page');
    };
  }, []);

  const handleCreatePlanClick = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleOverlayClick = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setMessage('');
    }
  };

  const handleSendClick = (e) => {
    e.stopPropagation();
    setMessage('');
  };

  return (
    <div className="page">
      <h1 className="page-title">Ваша персональная программа тренировок</h1>
      <p className="page-subtitle">Создайте план тренировок за минуту — под ваши цели и уровень подготовки</p>
      
      <div className="home-content">
        <div className="home-left">
          <div className="buttons-block">
            <div className="buttons-row">
              <button className="param-button">
                Возраст <img src="/down-sign.png" alt="▼" className="dropdown-icon" />
              </button>
              <button className="param-button">
                Пол <img src="/down-sign.png" alt="▼" className="dropdown-icon" />
              </button>
              <button className="param-button">
                Вес <img src="/down-sign.png" alt="▼" className="dropdown-icon" />
              </button>
            </div>
            <div className="buttons-row">
              <button className="param-button">
                Рост <img src="/down-sign.png" alt="▼" className="dropdown-icon" />
              </button>
              <button className="param-button">
                Цель <img src="/down-sign.png" alt="▼" className="dropdown-icon" />
              </button>
              <button className="param-button">
                Уровень подготовки <img src="/down-sign.png" alt="▼" className="dropdown-icon" />
              </button>
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="action-button create-plan" onClick={handleCreatePlanClick}>
              Создать свой план
            </button>
            <button className="action-button start">
              Начать
            </button>
          </div>
        </div>
        
        <div className="home-right">
          <div className="photo-block">
            <img 
              src="/images/home-photo.jpg" 
              alt="Фитнес тренировка" 
              className="home-photo"
            />
          </div>
        </div>
      </div>

      {/**/}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content" onClick={handleModalClick}>
            <div className="modal-left">
              <img 
                src="/bot.png" 
                alt="Бот иконка" 
                className="bot-icon"
              />
              <p className="bot-label">Чат-бот</p>
            </div>
            <div className="modal-right">
              <div className="chat-area">
                {/**/}
              </div>
              <div className="chat-input-container">
                <input 
                  type="text" 
                  className="chat-input" 
                  value={message}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder=""
                />
                <button 
                  className="send-button" 
                  onClick={handleSendClick}
                >
                  <img 
                    src="/send.png" 
                    alt="Отправить" 
                    className="send-icon"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;