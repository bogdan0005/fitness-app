import React from 'react';
import UsersList from '../database/UsersList';
import './Pages.css';

function AccountPage() {
  return (
    <div className="page">
      <h1 className="page-title">Аккаунт</h1>
      <div className="page-container">
        <UsersList />
      </div>
    </div>
  );
}

export default AccountPage;