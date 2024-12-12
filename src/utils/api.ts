import axios from 'axios';
import { DEFAULT_GOLD_PRICE_USD, DEFAULT_CURRENCY_RATES } from './constants';

// Use a CORS-friendly API for gold prices
export async function fetchGoldPrice(): Promise<number> {
  try {
    const response = await axios.get('https://api.metals.live/v1/spot/gold');
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0].price;
    }
    return DEFAULT_GOLD_PRICE_USD;
  } catch (error) {
    console.error('Error fetching gold price:', error);
    return DEFAULT_GOLD_PRICE_USD;
  }
}

// Use a CORS-friendly API for currency rates
export async function fetchAllCurrencyRates(): Promise<typeof DEFAULT_CURRENCY_RATES> {
  try {
    const response = await axios.get(
      'https://api.exchangerate.host/latest?base=USD&symbols=LKR,SAR,QAR,KWD'
    );
    
    if (response.data?.rates) {
      return {
        LKR: response.data.rates.LKR || DEFAULT_CURRENCY_RATES.LKR,
        SAR: response.data.rates.SAR || DEFAULT_CURRENCY_RATES.SAR,
        QAR: response.data.rates.QAR || DEFAULT_CURRENCY_RATES.QAR,
        KWD: response.data.rates.KWD || DEFAULT_CURRENCY_RATES.KWD
      };
    }
    
    return DEFAULT_CURRENCY_RATES;
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    return DEFAULT_CURRENCY_RATES;
  }
}