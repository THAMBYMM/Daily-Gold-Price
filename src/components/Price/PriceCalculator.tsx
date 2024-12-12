import React from 'react';
import { PriceInput } from './PriceInput';

interface PriceCalculatorProps {
  value24kt: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGenerate: () => void;
}

export function PriceCalculator({ value24kt, onChange, onGenerate }: PriceCalculatorProps) {
  return (
    <div className="space-y-4">
      <PriceInput value={value24kt} onChange={onChange} />
      
      <button
        onClick={onGenerate}
        disabled={!value24kt}
        className="w-full bg-[#00A884] text-white py-1.5 px-3 rounded hover:bg-[#008C70] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Generate Message
      </button>
    </div>
  );
}