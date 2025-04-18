import React, { useState, useEffect } from 'react';
import { dailyAffirmations } from '../data/motivationalContent';

const DailyAffirmation: React.FC = () => {
  const [affirmation, setAffirmation] = useState('');

  useEffect(() => {
    getRandomAffirmation();
  }, []);

  const getRandomAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * dailyAffirmations.length);
    setAffirmation(dailyAffirmations[randomIndex]);
  };

  return (
    <div className="bg-gradient-to-br from-morandi-sage to-morandi-moss p-6 rounded-lg shadow-soft">
      <h3 className="text-xl font-semibold text-white mb-3">Daily Affirmation</h3>
      
      <p className="text-lg text-white font-medium mb-4">
        {affirmation}
      </p>
      
      <button 
        onClick={getRandomAffirmation}
        className="mt-2 px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-sm rounded-md transition-all"
      >
        New Affirmation
      </button>
    </div>
  );
};

export default DailyAffirmation;
