import React, { useState, useEffect } from 'react';
import { motivationalQuotes } from '../data/quotes';
import { Quote } from '../types';
import { RefreshCw, Quote as QuoteIcon } from 'lucide-react';

const QuoteDisplay: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  if (!quote) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-lg shadow-lg text-white mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-10">
        <QuoteIcon size={120} />
      </div>
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-xl font-medium italic mb-3">"{quote.text}"</p>
          <p className="text-sm font-light">— {quote.author}</p>
        </div>
        <button 
          onClick={getRandomQuote}
          className="p-2 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Get new quote"
        >
          <RefreshCw size={20} />
        </button>
      </div>
    </div>
  );
};

export default QuoteDisplay;
