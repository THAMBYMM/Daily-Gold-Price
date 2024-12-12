export interface CurrencyRates {
  LKR: number;
  SAR: number;
  QAR: number;
  KWD: number;
}

export interface DetailedCalculation {
  goldPriceInLKR: number;
  pricePerGram: number;
  priceFor8Grams: number;
  finalPrice: number;
}

export interface ContactInfo {
  PHONE: string;
  BUSINESS_NAME: string;
}