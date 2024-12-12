const VAT_AMOUNT = 14000;
const GRAMS_PER_OUNCE = 31.1;
const GRAMS_TO_CALCULATE = 8;

export function calculateKaratPrice(price24kt: number, karat: number): number {
  if (!price24kt || !karat) return 0;
  return (price24kt / 24) * karat;
}

export function calculate24KTPrice(goldPriceUSD: number, lkrRate: number): number {
  if (!goldPriceUSD || !lkrRate) return 0;
  return (goldPriceUSD * lkrRate / GRAMS_PER_OUNCE * GRAMS_TO_CALCULATE) + VAT_AMOUNT;
}