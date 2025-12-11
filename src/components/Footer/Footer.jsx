import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <footer className="footer">
      {/*i*/}
      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-logo-section">
            <div className="footer-logo">
              <img src="/logo.png" alt="Fitness Logo" />
            </div>
            <h2 className="footer-title">FITNESS</h2>
          </div>
          
          <div className="footer-links">
            <span className="footer-link">О проекте</span>
            <span className="footer-link">Связаться с нами</span>
            <span className="footer-link">Реклама</span>
            <span className="footer-link">Политика конфиденциальности</span>
            <span className="footer-link">Правила сервиса</span>
          </div>

          {/*i*/}
          {isHomePage && (
            <div className="footer-copyright">
              © 2025 FITNESS
            </div>
          )}
        </div>
      </div>
      
      {/*i*/}
      <div className="footer-bottom-strip">
        <div className="footer-bottom-container">
          {/*i*/}
        </div>
      </div>
    </footer>
  );
}

export default Footer;