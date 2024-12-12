import React from 'react';
import { formatCurrency } from '../../utils/formatters';

interface PriceDisplayProps {
  label: string;
  price: number;
}

export function PriceDisplay({ label, price }: PriceDisplayProps) {
  return (
    <div className="text-base font-bold">
      {label} - LKR {formatCurrency(price)}
    </div>
  );
}