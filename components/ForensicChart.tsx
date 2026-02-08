import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { Finding } from '../types';

interface ForensicChartProps {
  findings?: Finding[];
}

export const ForensicChart: React.FC<ForensicChartProps> = ({ findings = [] }) => {
  // Normalize finding data into categories for the radar chart
  const categories = [
    { subject: 'Ocular Photometrics', key: ['photo', 'reflection', 'lighting', 'ocular', 'shadow'], value: 20 },
    { subject: 'Acoustic Forensics', key: ['linguistic', 'prosody', 'speech', 'audio', 'voice'], value: 20 },
    { subject: '3D Geometry', key: ['geom', 'topology', 'mesh', '3d', 'sfm'], value: 20 },
    { subject: 'Temporal Flux', key: ['temporal', 'motion', 'flow', 'jitter', 'sync', 'frame'], value: 20 },
    { subject: 'Frequency Analysis', key: ['neural', 'fingerprint', 'gan', 'diffusion', 'signature', 'dct', 'spectral'], value: 20 },
    { subject: 'Biological Signals', key: ['biol', 'heart', 'pulse', 'rppg', 'pulse'], value: 20 },
  ];

  const processedData = categories.map(cat => {
    let weight = 30; // Baseline signal strength
    findings.forEach(f => {
      const desc = f.description?.toLowerCase() || '';
      const category = f.category?.toLowerCase() || '';
      if (cat.key.some(k => desc.includes(k) || category.includes(k))) {
        weight = Math.min(100, weight + 25);
      }
    });
    return { subject: cat.subject, A: weight, fullMark: 100 };
  });

  return (
    <div className="w-full h-72 md:h-80 flex flex-col">
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={processedData}>
            <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700, letterSpacing: '0.05em' }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Forensic Depth"
              dataKey="A"
              stroke="#f97316"
              fill="#f97316"
              fillOpacity={0.15}
              strokeWidth={3}
              animationBegin={0}
              animationDuration={1500}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest mt-2">
        Multimodal Signal Density
      </p>
    </div>
  );
};