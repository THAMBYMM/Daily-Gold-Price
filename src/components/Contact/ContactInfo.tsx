import React from 'react';
import { CONTACT_INFO, WHATSAPP_LINKS } from '../../config/constants';

export function ContactInfo() {
  return (
    <div className="space-y-1">
      <div className="font-bold">{CONTACT_INFO.BUSINESS_NAME}</div>
      <div>Call - {CONTACT_INFO.PHONE}</div>
      <div>
        <a href={WHATSAPP_LINKS.CHAT} className="text-[#00A884]">Chat on WhatsApp</a>
      </div>
      <div>
        <a href={WHATSAPP_LINKS.GROUP} className="text-[#00A884]">Join WhatsApp Group</a>
      </div>
    </div>
  );
}