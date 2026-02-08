
import React from 'react';
import { Verdict } from '../types';

interface VerdictBadgeProps {
  verdict: Verdict;
  confidence: number;
}

export const VerdictBadge: React.FC<VerdictBadgeProps> = ({ verdict, confidence }) => {
  const getColors = () => {
    switch (verdict) {
      case 'AUTHENTIC':
      case 'AUTHENTICATED_HUMAN':
        return 'bg-green-500/10 text-green-400 border-green-500/50';
      case 'SUSPICIOUS':
      case 'SUSPECTED_SYNTHETIC':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/50';
      case 'LIKELY_SYNTHETIC':
      case 'SYNTHETIC':
      case 'CONFIRMED_DEEPFAKE':
        return 'bg-red-500/10 text-red-400 border-red-500/50';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/50';
    }
  };

  return (
    <div className={`px-4 py-2 rounded-full border ${getColors()} inline-flex items-center gap-2 font-semibold`}>
      <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
      {verdict.replace('_', ' ').toUpperCase()} ({confidence}%)
    </div>
  );
};
