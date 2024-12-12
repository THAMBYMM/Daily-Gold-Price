import { DEFAULT_CURRENCY_RATES } from '../../config/constants';
import type { CurrencyRates } from '../../types';

const CURRENCY_API = 'https://api.exchangerate.host/latest';
const FALLBACK_API = 'https://api.exchangerate-api.com/v4/latest/USD';

export async function fetchCurrencyRates(): Promise<CurrencyRates> {
  try {
    // Try primary API
    const response = await fetch(
      `${CURRENCY_API}?base=USD&symbols=LKR,SAR,QAR,KWD`
    );
    const data = await response.json();
    
    if (data?.success && validateRates(data.rates)) {
      return formatRates(data.rates);
    }

    // Try fallback API
    const fallbackResponse = await fetch(FALLBACK_API);
    const fallbackData = await fallbackResponse.json();
    
    if (fallbackData?.rates && validateRates(fallbackData.rates)) {
      return formatRates(fallbackData.rates);
    }
    
    throw new Error('Failed to fetch currency rates from both APIs');
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

function formatRates(rates: Record<string, number>): CurrencyRates {
  return {
    LKR: Math.round(rates.LKR * 100) / 100,
    SAR: Math.round(rates.SAR * 100) / 100,
    QAR: Math.round(rates.QAR * 100) / 100,
    KWD: Math.round(rates.KWD * 100) / 100
  };
}