import { formatNumber } from './formatters';

export function calculatePrices(price24kt: string) {
  if (!price24kt) return null;
  
  const basePrice = parseFloat(price24kt.replace(/,/g, ''));
  if (isNaN(basePrice)) return null;

  return {
    price24kt: basePrice,
    price22kt: formatNumber(basePrice / 24 * 22),
    price21kt: formatNumber(basePrice / 24 * 21)
  };
}