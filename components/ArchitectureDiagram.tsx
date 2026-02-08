import React from 'react';
import { 
  CpuChipIcon, 
  BeakerIcon, 
  ShieldCheckIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';

export const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-12 py-6">
      {/* Input Layer */}
      <div className="relative">
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center space-y-2 w-32 relative z-10 shadow-sm">
          <VideoCameraIcon className="w-6 h-6 text-slate-400" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Signal Feed</span>
        </div>
        <div className="absolute top-1/2 left-full w-12 h-px bg-slate-200">
          <div className="absolute inset-y-0 left-0 w-2.5 bg-orange-500 rounded-full animate-flow-horizontal" />
        </div>
      </div>

      {/* Analysis Core - Bright Orange */}
      <div className="relative">
        <div className="p-8 bg-orange-500 border border-orange-400 rounded-[2rem] flex flex-col items-center space-y-5 w-56 relative z-10 shadow-xl shadow-orange-200">
          <div className="p-3 bg-white/20 rounded-2xl shadow-inner border border-white/30 backdrop-blur-sm">
            <CpuChipIcon className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-1 text-center">
            <span className="text-sm font-black text-white block tracking-tight">Forensic Engine</span>
            <span className="text-[9px] text-orange-100 font-bold uppercase tracking-[0.3em]">15-Vector Audit</span>
          </div>
        </div>
        
        {/* Animated Lines to Fusion */}
        <div className="absolute top-1/2 left-full w-12 h-px bg-slate-200">
           <div className="absolute inset-y-0 left-0 w-2.5 bg-indigo-500 rounded-full animate-flow-horizontal delay-500" />
        </div>
      </div>

      {/* Fusion Layer */}
      <div className="relative">
        <div className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center space-y-3 w-44 relative z-10 shadow-sm">
          <BeakerIcon className="w-6 h-6 text-indigo-400" />
          <div className="text-center">
             <span className="text-[10px] font-bold text-slate-900 uppercase block tracking-widest mb-1">Bayesian Sync</span>
             <span className="text-[9px] text-slate-400 font-bold">Consensus Logic</span>
          </div>
        </div>
        <div className="absolute top-1/2 left-full w-12 h-px bg-slate-200">
           <div className="absolute inset-y-0 left-0 w-2.5 bg-emerald-500 rounded-full animate-flow-horizontal delay-1000" />
        </div>
      </div>

      {/* Outcome */}
      <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex flex-col items-center space-y-2 w-32 relative z-10 shadow-sm">
        <ShieldCheckIcon className="w-6 h-6 text-emerald-600" />
        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Audit Cert</span>
      </div>

      <style>{`
        @keyframes flow-horizontal {
          0% { left: 0; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        .animate-flow-horizontal {
          animation: flow-horizontal 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .delay-500 { animation-delay: 0.7s; }
        .delay-1000 { animation-delay: 1.4s; }
      `}</style>
    </div>
  );
};