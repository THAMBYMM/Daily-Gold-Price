import axios from 'axios';
import { DEFAULT_CURRENCY_RATES } from './constants';

// XE.com doesn't provide a free API, so we'll scrape the website
async function scrapeXERate(from: string, to: string): Promise<number> {
  try {
    const response = await axios.get(
      `https://www.xe.com/currencyconverter/convert/?Amount=1&From=${from}&To=${to}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      }
    );

    // Extract rate from response HTML
    const html = response.data;
    const rateMatch = html.match(/1 [A-Z]{3} = ([0-9,.]+) [A-Z]{3}/);
    if (rateMatch && rateMatch[1]) {
      return parseFloat(rateMatch[1].replace(/,/g, ''));
    }

    throw new Error('Rate not found in response');
  } catch (error) {
    console.error(`Error fetching ${from}/${to} rate from XE:`, error);
    return DEFAULT_CURRENCY_RATES[to] || 1;
  }
}

export async function fetchAllXERates(): Promise<{
  LKR: number;
  SAR: number;
  QAR: number;
  KWD: number;
}> {
  try {
    const [lkr, sar, qar, kwd] = await Promise.all([
      scrapeXERate('USD', 'LKR'),
      scrapeXERate('USD', 'SAR'),
      scrapeXERate('USD', 'QAR'),
      scrapeXERate('USD', 'KWD')
    ]);

    return {
      LKR: lkr || DEFAULT_CURRENCY_RATES.LKR,
      SAR: sar || DEFAULT_CURRENCY_RATES.SAR,
      QAR: qar || DEFAULT_CURRENCY_RATES.QAR,
      KWD: kwd || DEFAULT_CURRENCY_RATES.KWD
    };
  } catch (error) {
    console.error('Error fetching XE rates:', error);
    return DEFAULT_CURRENCY_RATES;
  }
}