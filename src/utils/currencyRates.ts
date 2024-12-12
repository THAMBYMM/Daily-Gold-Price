import { DEFAULT_CURRENCY_RATES } from '../config/constants';
import type { CurrencyRates } from '../types';

const CURRENCY_API = 'https://api.exchangerate.host/latest';

export async function fetchCurrencyRates(): Promise<CurrencyRates> {
  try {
    const response = await fetch(
      `${CURRENCY_API}?base=USD&symbols=LKR,SAR,QAR,KWD`
    );
    const data = await response.json();
    
    if (data?.success && validateRates(data.rates)) {
      return {
        LKR: data.rates.LKR,
        SAR: data.rates.SAR,
        QAR: data.rates.QAR,
        KWD: data.rates.KWD
      };
    }
    
    throw new Error('Invalid currency rates format');
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