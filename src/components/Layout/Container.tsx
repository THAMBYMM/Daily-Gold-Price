import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="min-h-screen bg-[#ECE5DD] px-2 py-1 max-w-[360px] mx-auto text-sm">
      {children}
    </div>
  );
}