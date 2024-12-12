import React from 'react';
import { Copy } from 'lucide-react';

interface GeneratedTextProps {
  text: string;
  onCopy: () => void;
}

export function GeneratedText({ text, onCopy }: GeneratedTextProps) {
  return (
    <div className="space-y-2">
      <div className="bg-[#DCF8C6] p-2 rounded-lg whitespace-pre-wrap text-left">
        <div className="font-mono text-[#075E54] text-sm leading-tight">{text}</div>
      </div>
      
      <button
        onClick={onCopy}
        className="flex items-center justify-center w-full gap-1.5 bg-[#34B7F1] text-white py-1.5 px-3 rounded hover:bg-[#2DA1D9] transition-colors text-sm"
      >
        <Copy size={16} />
        Copy Text
      </button>
    </div>
  );
}