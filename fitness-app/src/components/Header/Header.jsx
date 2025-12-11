import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo-link">
          <div className="logo">
            <img src="/logo.png" alt="Fitness Logo" className="logo-img" />
          </div>
          <h1 className="site-title">FITNESS</h1>
        </Link>
      </div>
      
      <nav className="header-nav">
        <Link to="/clubs" className="nav-link">Фитнес-клубы</Link> {/**/}
        <Link to="/programs" className="nav-link">Готовые программы</Link>
        <Link to="/group" className="nav-link">Групповые программы</Link>
        <Link to="/pool" className="nav-link">Бассейны</Link>
        <Link to="/account" className="nav-link">Аккаунт</Link>
      </nav>
    </header>
  );
}

export default Header;