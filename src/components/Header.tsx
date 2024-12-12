import React from 'react';
import { RefreshCw } from 'lucide-react';
import { CONTACT_INFO } from '../config/constants';

interface HeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
}

export function Header({ onRefresh, isLoading }: HeaderProps) {
  return (
    <div className="bg-[#00A884] text-white p-2 rounded-t-lg flex justify-between items-center">
      <h1 className="text-lg font-bold">{CONTACT_INFO.BUSINESS_NAME}</h1>
      <button 
        onClick={onRefresh} 
        className="p-1 hover:bg-[#008C70] rounded-full transition-colors disabled:opacity-50"
        disabled={isLoading}
      >
        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
      </button>
    </div>
  );
}