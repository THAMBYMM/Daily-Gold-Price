import React, { useState } from 'react';
import { Container } from './components/Layout';
import { Header } from './components/Header';
import { PriceCalculator } from './components/Price';
import { GeneratedText } from './components/GeneratedText';
import { useRates } from './hooks/useRates';
import { calculatePrices } from './utils/price';
import { generateMessage } from './utils/textGenerator';
import { getDailyQuote } from './utils/quotes';

export default function App() {
  const { goldPriceUSD, isLoading, error, refreshRates } = useRates();
  const [goldPrice24kt, setGoldPrice24kt] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value) {
      const number = parseInt(value, 10);
      setGoldPrice24kt(number.toLocaleString());
    } else {
      setGoldPrice24kt('');
    }
  };

  const generateText = () => {
    const prices = calculatePrices(goldPrice24kt);
    if (!prices) return;
    
    const message = generateMessage({
      date: new Date(),
      ...prices,
      goldPriceUSD,
      quote: getDailyQuote()
    });
    
    setGeneratedText(message);
  };

  return (
    <Container>
      <Header onRefresh={refreshRates} isLoading={isLoading} />
      
      <div className="bg-white p-3 rounded-b-lg shadow-md space-y-4">
        {error && (
          <div className="bg-red-50 text-red-700 p-2 rounded border border-red-200 text-xs">
            {error}
          </div>
        )}
        
        <PriceCalculator
          value24kt={goldPrice24kt}
          onChange={handlePriceChange}
          onGenerate={generateText}
        />

        {generatedText && (
          <GeneratedText
            text={generatedText}
            onCopy={() => navigator.clipboard.writeText(generatedText)}
          />
        )}
      </div>
    </Container>
  );
}