import React, { useState } from 'react';
import { motivationalTips } from '../data/motivationalContent';

const MotivationalTips: React.FC = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const nextTip = () => {
    setCurrentTipIndex((prevIndex) => 
      prevIndex === motivationalTips.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTip = () => {
    setCurrentTipIndex((prevIndex) => 
      prevIndex === 0 ? motivationalTips.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="mb-8 p-6 bg-gradient-to-r from-morandi-blush to-morandi-terracotta rounded-lg shadow-soft">
      <h3 className="text-xl font-semibold text-white mb-4">Productivity Tip</h3>
      
      <div className="bg-white bg-opacity-20 p-4 rounded-lg text-white">
        <p className="text-lg mb-2">{motivationalTips[currentTipIndex].title}</p>
        <p className="text-sm opacity-90">{motivationalTips[currentTipIndex].content}</p>
      </div>
      
      <div className="flex justify-between mt-4">
        <button 
          onClick={prevTip}
          className="px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-sm rounded-md transition-all"
        >
          Previous Tip
        </button>
        
        <button 
          onClick={nextTip}
          className="px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-sm rounded-md transition-all"
        >
          Next Tip
        </button>
      </div>
    </div>
  );
};

export default MotivationalTips;
