import { useState, useEffect, useCallback } from 'react';
import { fetchGoldPrice } from '../utils/api/goldPrice';
import { fetchCurrencyRates } from '../utils/api/currencyRates';
import { DEFAULT_GOLD_PRICE_USD, DEFAULT_CURRENCY_RATES } from '../config/constants';
import type { CurrencyRates } from '../types';

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes
const RETRY_DELAY = 30 * 1000; // 30 seconds

export function useRates() {
  const [goldPriceUSD, setGoldPriceUSD] = useState(DEFAULT_GOLD_PRICE_USD);
  const [currencyRates, setCurrencyRates] = useState<CurrencyRates>(DEFAULT_CURRENCY_RATES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchRates = useCallback(async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const goldPrice = await fetchGoldPrice();
      setGoldPriceUSD(goldPrice);
      
      const rates = await fetchCurrencyRates();
      setCurrencyRates(rates);
      
      setLastUpdated(new Date());
      setRetryCount(0);
    } catch (error) {
      console.error('Error fetching rates:', error);
      
      if (retryCount < 3) {
        setError('Updating rates... Please wait.');
        setRetryCount(prev => prev + 1);
        setTimeout(fetchRates, RETRY_DELAY);
      } else {
        setError('Using last known rates. Will try again soon.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, retryCount]);

  useEffect(() => {
    fetchRates();
    
    const interval = setInterval(fetchRates, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchRates]);

  return {
    goldPriceUSD,
    currencyRates,
    isLoading,
    error,
    lastUpdated,
    refreshRates: fetchRates
  };
}