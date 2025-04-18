import React from 'react';
import { useAuth } from '../context/AuthContext';
import UserProfile from './Auth/UserProfile';

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-morandi-stone">
          Daily Todo & Motivation
        </h1>
        {user && <UserProfile />}
      </div>
      <p className="text-morandi-stone opacity-80">
        Organize your day and stay motivated
      </p>
    </header>
  );
};

export default Header;
