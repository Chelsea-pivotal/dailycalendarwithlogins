import React from 'react';
import { useAuth } from '../../context/AuthContext';

const UserProfile: React.FC = () => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center space-x-2">
      <span className="text-morandi-stone text-sm">{user.email}</span>
      <button
        onClick={() => signOut()}
        className="text-sm px-3 py-1 bg-morandi-fog text-morandi-stone rounded-md hover:bg-morandi-fog/80 transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
};

export default UserProfile;
