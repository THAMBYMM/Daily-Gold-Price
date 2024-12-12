import { DEFAULT_GOLD_PRICE_USD } from '../config/constants';

export async function fetchGoldPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.exchangerate.host/convert?from=XAU&to=USD&amount=1');
    const data = await response.json();
    
    if (data?.success && typeof data.result === 'number') {
      return Math.round(data.result * 100) / 100;
    }
    
    throw new Error('Invalid gold price data format');
  } catch (error) {
    console.error('Error fetching gold price:', error);
    return DEFAULT_GOLD_PRICE_USD;
  }
}