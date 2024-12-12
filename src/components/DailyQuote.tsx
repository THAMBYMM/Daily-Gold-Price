import React from 'react';
import { getDailyQuote } from '../utils/quotes';

export function DailyQuote() {
  const quote = getDailyQuote();
  
  return (
    <div className="bg-[#DCF8C6] p-2 rounded-lg mb-3">
      <p className="daily-quote text-[#075E54] text-sm italic text-center">"{quote}"</p>
    </div>
  );
}