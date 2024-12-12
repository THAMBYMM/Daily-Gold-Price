const GOLD_QUOTES = [
  "Gold holds its beauty forever, just like precious memories.",
  "In a world of uncertainty, gold remains a constant.",
  "Every piece of jewelry tells a story waiting to be cherished.",
  "Gold: Nature's timeless masterpiece.",
  "Invest in gold, secure your tomorrow.",
  "Like gold, true value only appreciates with time.",
  "Gold: The language of elegance spoken across generations.",
  "In the world of investments, gold whispers wisdom.",
  "Jewelry isn't just an accessory, it's a legacy.",
  "Gold: Where tradition meets investment."
];

export function getDailyQuote(): string {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const quoteIndex = dayOfYear % GOLD_QUOTES.length;
  return GOLD_QUOTES[quoteIndex];
}