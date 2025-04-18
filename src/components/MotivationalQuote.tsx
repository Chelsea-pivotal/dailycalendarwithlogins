import React, { useState, useEffect } from 'react';
import { Quote } from '../types';
import { quotes } from '../data/quotes';

const MotivationalQuote: React.FC = () => {
  const [quote, setQuote] = useState<Quote>({ text: '', author: '' });

  useEffect(() => {
    getRandomQuote();
  }, []);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  return (
    <div className="bg-gradient-to-br from-morandi-sky to-morandi-lavender p-6 rounded-lg shadow-soft">
      <div className="text-white">
        <p className="text-lg font-medium italic mb-3">"{quote.text}"</p>
        <p className="text-right text-sm">— {quote.author}</p>
      </div>
      
      <button 
        onClick={getRandomQuote}
        className="mt-4 px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-sm rounded-md transition-all"
      >
        New Quote
      </button>
    </div>
  );
};

export default MotivationalQuote;
