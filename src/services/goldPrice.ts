import axios from 'axios';
import { DEFAULT_GOLD_PRICE_USD } from '../config/constants';

const GOLD_PRICE_API = 'https://api.metals.live/v1/spot/gold';

export async function fetchGoldPrice(): Promise<number> {
  try {
    const { data } = await axios.get<Array<{ price: number }>>(GOLD_PRICE_API, {
      timeout: 5000,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (Array.isArray(data) && data.length > 0 && typeof data[0].price === 'number') {
      return data[0].price;
    }
    
    console.warn('Invalid gold price data format, using default');
    return DEFAULT_GOLD_PRICE_USD;
  } catch (error) {
    console.error('Error fetching gold price:', error);
    return DEFAULT_GOLD_PRICE_USD;
  }
}