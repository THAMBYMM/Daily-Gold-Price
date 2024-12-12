import React from 'react';
import { formatCurrency } from '../../utils/formatters';

interface PriceInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PriceInput({ value, onChange }: PriceInputProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-gray-700 text-sm">
        Enter Gold Price for 24kt:
      </label>
      
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full p-1.5 border border-gray-300 rounded focus:outline-none focus:border-[#00A884] text-sm"
        placeholder="Enter price..."
      />
    </div>
  );
}