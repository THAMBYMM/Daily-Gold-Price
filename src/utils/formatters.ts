export function formatNumber(num: number): number {
  const ROUND_TO = 500;
  return Math.round(num / ROUND_TO) * ROUND_TO;
}

export function formatDate(date: Date): string {
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  
  const suffix = getOrdinalSuffix(day);
  return `${day}${suffix} ${month} ${year}`;
}

export function formatCurrency(amount: number | undefined): string {
  if (typeof amount !== 'number') return '0.00';
  
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}