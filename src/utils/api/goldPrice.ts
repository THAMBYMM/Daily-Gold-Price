import { DEFAULT_GOLD_PRICE_USD } from '../../config/constants';

const GOLD_API_URL = 'https://www.goldapi.io/api/XAU/USD';
const API_KEY = 'goldapi-1nbh9j19m3t5tfwn-io';
const BACKUP_API = 'https://api.metals.live/v1/spot/gold';

// Cache duration of 1 hour
const CACHE_DURATION = 60 * 60 * 1000;

interface CachedPrice {
  value: number;
  timestamp: number;
}

let priceCache: CachedPrice | null = null;

async function fetchFromGoldAPI(): Promise<number> {
  const response = await fetch(GOLD_API_URL, {
    headers: {
      'x-access-token': API_KEY,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  if (typeof data?.price === 'number') {
    return Math.round(data.price * 100) / 100;
  }
  
  throw new Error('Invalid response format from Gold API');
}

async function fetchFromBackupAPI(): Promise<number> {
  const response = await fetch(BACKUP_API);
  const data = await response.json();
  
  if (Array.isArray(data) && data.length > 0 && typeof data[0].price === 'number') {
    return Math.round(data[0].price * 100) / 100;
  }
  
  throw new Error('Invalid response format from backup API');
}

export async function fetchGoldPrice(): Promise<number> {
  try {
    // Return cached price if valid
    if (priceCache && Date.now() - priceCache.timestamp < CACHE_DURATION) {
      return priceCache.value;
    }

    // Try Gold API first
    try {
      const price = await fetchFromGoldAPI();
      if (price > 0) {
        priceCache = { value: price, timestamp: Date.now() };
        return price;
      }
    } catch (error) {
      console.warn('Gold API failed, trying backup...', error);
    }

    // Try backup API if Gold API fails
    try {
      const price = await fetchFromBackupAPI();
      if (price > 0) {
        priceCache = { value: price, timestamp: Date.now() };
        return price;
      }
    } catch (error) {
      console.warn('Backup API failed:', error);
    }

    // If both APIs fail but we have a cached price, use it
    if (priceCache?.value) {
      console.warn('Using cached price as APIs failed');
      return priceCache.value;
    }

    // Last resort: use default price
    return DEFAULT_GOLD_PRICE_USD;
  } catch (error) {
    console.error('Gold price fetch failed completely:', error);
    return priceCache?.value ?? DEFAULT_GOLD_PRICE_USD;
  }
}