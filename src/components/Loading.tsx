import { Loader2 } from 'lucide-react';
import React from 'react'

export const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="animate-spin" size={30} />
    </div>
  );
}
