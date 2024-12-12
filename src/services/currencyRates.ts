import axios from 'axios';
import { DEFAULT_CURRENCY_RATES } from '../config/constants';
import type { CurrencyRates } from '../types';

const EXCHANGE_RATE_API = 'https://api.exchangerate.host/latest';

interface ExchangeRateResponse {
  success: boolean;
  rates: Record<string, number>;
}

export async function fetchCurrencyRates(): Promise<CurrencyRates> {
  try {
    const { data } = await axios.get<ExchangeRateResponse>(
      `${EXCHANGE_RATE_API}?base=USD&symbols=LKR,SAR,QAR,KWD`,
      {
        timeout: 5000,
        headers: {
          'Accept': 'application/json'
        }
      }
    );
    
    if (data?.success && validateRates(data.rates)) {
      return {
        LKR: data.rates.LKR,
        SAR: data.rates.SAR,
        QAR: data.rates.QAR,
        KWD: data.rates.KWD
      };
    }
    
    console.warn('Invalid currency rates format, using defaults');
    return DEFAULT_CURRENCY_RATES;
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    return DEFAULT_CURRENCY_RATES;
  }
}

function validateRates(rates: Record<string, number>): rates is Record<keyof CurrencyRates, number> {
  return (
    typeof rates.LKR === 'number' &&
    typeof rates.SAR === 'number' &&
    typeof rates.QAR === 'number' &&
    typeof rates.KWD === 'number'
  );
}