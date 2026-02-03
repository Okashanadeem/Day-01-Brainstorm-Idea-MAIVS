import React, { useState } from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface SimulationTooltipProps {
  content: string;
  className?: string;
}

export const SimulationTooltip: React.FC<SimulationTooltipProps> = ({ content, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={`relative inline-flex items-center ml-2 ${className}`}>
      <button
        type="button"
        className="text-indigo-400 hover:text-indigo-600 focus:outline-none transition-colors"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        aria-label="More information about this simulated feature"
      >
        <QuestionMarkCircleIcon className="h-5 w-5" />
      </button>
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-72 p-4 bg-slate-800 text-white text-xs rounded-xl shadow-xl z-[100] border border-slate-700">
          <p className="leading-relaxed">{content}</p>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
        </div>
      )}
    </div>
  );
};
