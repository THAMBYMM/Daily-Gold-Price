import { WHATSAPP_LINKS, CONTACT_INFO } from '../config/constants';
import { formatDate, formatCurrency } from './formatters';
import { formatTime } from './time';

interface GenerateMessageProps {
  date: Date;
  price24kt: number;
  price22kt: number;
  price21kt: number;
  goldPriceUSD: number;
  quote: string;
}

export function generateMessage({
  date,
  price24kt,
  price22kt,
  price21kt,
  goldPriceUSD,
  quote
}: GenerateMessageProps): string {
  if (!price24kt) return '';

  const currentTime = formatTime(date);

  return `*Gold Price: ${formatDate(date)}*

*24kt - LKR ${formatCurrency(price24kt)}*
*22kt - LKR ${formatCurrency(price22kt)}*
*21kt - LKR ${formatCurrency(price21kt)}*

*${CONTACT_INFO.BUSINESS_NAME}*
*Call - ${CONTACT_INFO.PHONE}*
*Chat - ${WHATSAPP_LINKS.CHAT}*

*Join group - ${WHATSAPP_LINKS.GROUP}*

*${currentTime} Today's Gold Rate (1oz): $${formatCurrency(goldPriceUSD)}*

_${quote}_`;
}