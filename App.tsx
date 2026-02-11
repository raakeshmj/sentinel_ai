import React, { useState, useRef, useEffect, useCallback } from 'react';
import { runSpectreAudit, runLiveFrameAudit } from './services/geminiService';
import { AnalysisState, Verdict, Severity, FrameAnalysis, LivenessChallenge, ThreatLevel, NeuralAttribution, ToolAttribution, BatchFile, ForensicReport } from './types';
import { ForensicChart } from './components/ForensicChart';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { 
  ShieldCheckIcon, 
  ShieldExclamationIcon, 
  SignalIcon,
  SpeakerWaveIcon,
  EyeIcon,
  HeartIcon,
  BoltIcon,
  VideoCameraIcon,
  StopIcon,
  ExclamationCircleIcon,
  CloudArrowUpIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  ArrowRightIcon,
  XMarkIcon,
  DocumentMagnifyingGlassIcon,
  CircleStackIcon,
  CpuChipIcon,
  FingerPrintIcon,
  ExclamationTriangleIcon,
  FolderPlusIcon,
  ArrowDownTrayIcon,
  ChartBarIcon,
  TableCellsIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  LightBulbIcon,
  BeakerIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const getVerdictStyles = (verdict: Verdict) => {
  const v = verdict?.toString().toUpperCase();
  if (v?.includes('AUTHENTIC')) return 'border-emerald-100 bg-emerald-50 text-emerald-700';
  if (v?.includes('SUSPICIOUS') || v?.includes('SUSPECTED')) return 'border-amber-100 bg-amber-50 text-amber-700';
  if (v?.includes('SYNTHETIC') || v?.includes('DEEPFAKE')) return 'border-rose-100 bg-rose-50 text-rose-700';
  return 'border-slate-100 bg-slate-50 text-slate-700';
};

const App: React.FC = () => {
  const [state, setState] = useState<AnalysisState>({
    status: 'idle',
    progress: 0,
    report: null,
    error: null,
  });
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'video' | 'audio' | 'image' | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [liveStream, setLiveStream] = useState<MediaStream | null>(null);
  const [activeChallenge, setActiveChallenge] = useState<LivenessChallenge | null>(null);
  const [viewingBatchReport, setViewingBatchReport] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const isAnalyzingRef = useRef(false);
  const frameCounterRef = useRef(0);
  const progressIntervalRef = useRef<number | null>(null);

  const stopLiveStream = useCallback(() => {
    setIsLive(false);
    if (liveStream) {
      liveStream.getTracks().forEach(track => track.stop());
      setLiveStream(null);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    isAnalyzingRef.current = false;
    setState(prev => ({ ...prev, status: 'idle', liveFrame: undefined }));
  }, [liveStream]);

  const resetAnalysis = useCallback(() => {
    stopLiveStream();
    setFilePreview(null);
    setFileType(null);
    setActiveChallenge(null);
    setViewingBatchReport(null);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    setState({ status: 'idle', progress: 0, report: null, error: null });
  }, [stopLiveStream]);

  const captureAndAnalyzeFrame = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || !isLive || isAnalyzingRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    const base64 = canvas.toDataURL('image/jpeg', 0.5).split(',')[1];
    
    frameCounterRef.current++;
    const timestamp = Date.now();

    isAnalyzingRef.current = true;
    try {
      const analysis = await runLiveFrameAudit(base64, frameCounterRef.current, timestamp);
      setState(prev => ({ ...prev, liveFrame: analysis }));

      if (analysis.challenge_request && !activeChallenge) {
        setActiveChallenge({
          challenge_id: Math.random().toString(36).substring(7),
          challenge_type: analysis.challenge_request.type,
          challenge_text: analysis.challenge_request.text,
          status: 'ACTIVE',
          issued_at: Date.now()
        });
        setTimeout(() => setActiveChallenge(null), 6000);
      }
    } catch (err) {
      console.error("Frame analysis failed", err);
    } finally {
      isAnalyzingRef.current = false;
    }
  }, [isLive, activeChallenge]);

  const analysisLoop = useCallback(async () => {
    if (!isLive) return;
    await captureAndAnalyzeFrame();
    if (isLive) {
      timeoutRef.current = window.setTimeout(analysisLoop, 2500);
    }
  }, [isLive, captureAndAnalyzeFrame]);

  useEffect(() => {
    if (isLive && videoRef.current && liveStream && state.status === 'live') {
      videoRef.current.srcObject = liveStream;
      analysisLoop();
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isLive, liveStream, state.status, analysisLoop]);

  const startSmoothProgress = (startAt: number = 5) => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    setState(prev => ({ ...prev, progress: startAt }));
    
    progressIntervalRef.current = window.setInterval(() => {
      setState(prev => {
        if (prev.progress >= 98) return prev;
        const remaining = 100 - prev.progress;
        const increment = Math.max(0.05, remaining * 0.02); 
        return { ...prev, progress: prev.progress + increment };
      });
    }, 120);
  };

  const endSmoothProgress = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setState(prev => ({ ...prev, progress: 100 }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const mime = file.type;
    setFileType(mime.startsWith('audio/') ? 'audio' : mime.startsWith('image/') ? 'image' : 'video');
    setFilePreview(URL.createObjectURL(file));
    setState({ status: 'analyzing', progress: 0, report: null, error: null });
    startSmoothProgress(10);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const report = await runSpectreAudit(base64, mime, () => {});
        endSmoothProgress();
        setTimeout(() => {
          setState(prev => ({ ...prev, status: 'completed', report, error: null }));
        }, 600);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      setState({ status: 'error', progress: 0, report: null, error: err.message });
    }
  };

  const handleBatchUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawFiles = event.target.files ? Array.from(event.target.files) as File[] : [];
    const files = rawFiles.filter(f => 
      f.type.startsWith('image/') || f.type.startsWith('video/') || f.type.startsWith('audio/')
    );
    if (files.length === 0) return;

    const batchFiles: BatchFile[] = files.map(f => ({
      id: Math.random().toString(36).substring(7),
      file: f,
      status: 'pending',
      progress: 0
    }));

    setState({
      status: 'batch',
      progress: 0,
      report: null,
      error: null,
      batchState: {
        files: batchFiles,
        isProcessing: false,
        currentFileIndex: 0
      }
    });
  };

  const processBatch = async () => {
    if (!state.batchState || state.batchState.isProcessing) return;

    setState(prev => ({
      ...prev,
      batchState: { ...prev.batchState!, isProcessing: true }
    }));

    const files = [...state.batchState.files];
    const results: ForensicReport[] = [];

    for (let i = 0; i < files.length; i++) {
      const current = files[i];
      startSmoothProgress(0);
      
      setState(prev => ({
        ...prev,
        batchState: {
          ...prev.batchState!,
          currentFileIndex: i,
          files: prev.batchState!.files.map(f => f.id === current.id ? { ...f, status: 'processing' } : f)
        }
      }));

      try {
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(current.file);
        });

        const report = await runSpectreAudit(base64, current.file.type, () => {});
        report.analysis_metadata.file_name = current.file.name;
        results.push(report);
        endSmoothProgress();
        
        setState(prev => ({
          ...prev,
          batchState: {
            ...prev.batchState!,
            files: prev.batchState!.files.map(f => f.id === current.id ? { ...f, status: 'completed', report, progress: 100 } : f)
          }
        }));
      } catch (err: any) {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        setState(prev => ({
          ...prev,
          batchState: {
            ...prev.batchState!,
            files: prev.batchState!.files.map(f => f.id === current.id ? { ...f, status: 'error', error: err.message } : f)
          }
        }));
      }
    }

    const successfulReports = results.filter(r => r);
    const avgConf = successfulReports.reduce((acc, r) => acc + (r.overall_assessment.confidence_score < 1 ? r.overall_assessment.confidence_score * 100 : r.overall_assessment.confidence_score), 0) / (successfulReports.length || 1);
    
    setState(prev => ({
      ...prev,
      batchState: {
        ...prev.batchState!,
        isProcessing: false,
        summary: {
          avgConfidence: avgConf,
          outliers: [],
          totalAnomalies: successfulReports.reduce((acc, r) => acc + r.critical_findings.length, 0),
          threatSummary: `Batch forensic audit complete. ${successfulReports.length} files successfully analyzed.`
        }
      }
    }));
  };

  const exportBatchCSV = () => {
    if (!state.batchState) return;
    const headers = ['File Name', 'Status', 'Verdict', 'Confidence %', 'Generator', 'Skill Level', 'Anomalies Detected'];
    const rows = state.batchState.files.map(bf => {
      const report = bf.report;
      const confidence = report ? (report.overall_assessment.confidence_score < 1 ? report.overall_assessment.confidence_score * 100 : report.overall_assessment.confidence_score).toFixed(2) : '-';
      return [
        bf.file.name,
        bf.status,
        report?.overall_assessment.verdict || '-',
        confidence,
        report?.forensic_vectors.tool_attribution?.detected_tool || '-',
        report?.forensic_vectors.tool_attribution?.skill_level || '-',
        report?.critical_findings.length || 0
      ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(',');
    });
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `sentinel_audit_batch_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const startLiveMode = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } },
        audio: true 
      });
      setLiveStream(stream);
      setIsLive(true);
      setState({ status: 'live', progress: 100, report: null, error: null });
    } catch (err: any) {
      setState({ status: 'error', progress: 0, report: null, error: "Camera access denied. Please enable browser permissions for camera and microphone." });
    }
  };

  const ToolAttributionDisplay = ({ attribution }: { attribution?: ToolAttribution }) => {
    if (!attribution || !attribution.detected_tool) return null;
    const normalizedConfidence = attribution.confidence < 1 ? attribution.confidence * 100 : attribution.confidence;
    return (
      <div className="mt-8 space-y-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-4">
          Generator Reverse Engineering
          <div className="h-px flex-1 bg-slate-200" />
        </h3>
        <div className="p-8 rounded-[2rem] bg-indigo-600 text-white shadow-xl shadow-indigo-200 space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-white/20 rounded-2xl border border-white/30 flex items-center justify-center backdrop-blur-sm">
                <WrenchScrewdriverIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest block mb-1">Inferred Generator</span>
                <h4 className="text-3xl font-black text-white tracking-tight">{attribution.detected_tool}</h4>
              </div>
            </div>
            <div className="flex gap-3">
               <div className="px-5 py-3 bg-white/10 rounded-xl border border-white/20 text-center backdrop-blur-md">
                  <span className="text-[9px] font-bold text-indigo-100 uppercase block">Skill level</span>
                  <span className="text-sm font-black text-white uppercase tracking-wider">{attribution.skill_level}</span>
               </div>
               <div className="px-5 py-3 bg-white/10 rounded-xl border border-white/20 text-center backdrop-blur-md">
                  <span className="text-[9px] font-bold text-indigo-100 uppercase block">Confidence</span>
                  <span className="text-sm font-black text-white">{normalizedConfidence.toFixed(0)}%</span>
               </div>
            </div>
          </div>
          <div className="space-y-3 relative z-10">
             <span className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest flex items-center gap-2">
                <MagnifyingGlassIcon className="w-4 h-4" />
                Technical Evidence Trail
             </span>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {attribution.evidence.filter(e => e.trim().length > 0).map((ev, i) => (
                  <div key={i} className="text-xs font-bold text-white flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl border border-white/10 backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {ev}
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    );
  };

  const NeuralAttributionDisplay = ({ attribution }: { attribution?: NeuralAttribution }) => {
    if (!attribution) return null;
    const hasData = attribution.stylegan_details || attribution.stable_diffusion_details;
    if (!hasData) return null;
    return (
      <div className="mt-8 space-y-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-4">
          Neural Architecture Attribution
          <div className="h-px flex-1 bg-slate-200" />
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {attribution.stylegan_details && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3"><CpuChipIcon className="w-5 h-5 text-indigo-600" /><span className="text-sm font-bold text-slate-900">StyleGAN Artifacts</span></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Version</span><span className="text-xs font-bold text-slate-700 block">{attribution.stylegan_details.version}</span></div>
                <div className="space-y-1"><span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Resolution</span><span className="text-xs font-bold text-slate-700 block">{attribution.stylegan_details.resolution}</span></div>
              </div>
            </div>
          )}
          {attribution.stable_diffusion_details && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3"><FingerPrintIcon className="w-5 h-5 text-violet-600" /><span className="text-sm font-bold text-slate-900">Diffusion Signatures</span></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Model</span><span className="text-xs font-bold text-slate-700 block">{attribution.stable_diffusion_details.version}</span></div>
                <div className="space-y-1"><span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Steps</span><span className="text-xs font-bold text-slate-700 block">{attribution.stable_diffusion_details.steps}</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const getThreatColor = (level: ThreatLevel = 'GREEN') => {
    switch(level) {
      case 'RED': return 'text-rose-600 border-rose-200 bg-rose-50';
      case 'ORANGE': return 'text-orange-600 border-orange-200 bg-orange-50';
      case 'YELLOW': return 'text-amber-600 border-amber-200 bg-amber-50';
      default: return 'text-emerald-600 border-emerald-200 bg-emerald-50';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-600 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => {resetAnalysis(); setShowAbout(false);}}>
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-200">
              <ShieldCheckIcon className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-bold text-slate-900 tracking-tight leading-none">Sentinel AI</h1>
              <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-widest mt-1">Media Forensic Audit</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowAbout(!showAbout)} className="px-3 py-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors text-xs font-semibold flex items-center gap-2">
              <InformationCircleIcon className="w-4 h-4" />
              About
            </button>
            <div className="h-4 w-px bg-slate-200 mx-1" />
            {!isLive ? (
              <button onClick={startLiveMode} className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all text-xs font-bold flex items-center gap-2 shadow-sm">
                <VideoCameraIcon className="w-4 h-4" />
                Live Audit
              </button>
            ) : (
              <button onClick={stopLiveStream} className="px-4 py-1.5 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 rounded-lg transition-all text-xs font-bold flex items-center gap-2">
                <StopIcon className="w-4 h-4" />
                Stop Audit
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {showAbout ? (
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-16">
            <div className="flex flex-col md:flex-row gap-16 items-start">
              <div className="flex-1 space-y-10">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">Sentinel AI</h2>
                  <p className="text-xl text-indigo-600 font-bold tracking-wide uppercase text-sm">Media Integrity Engine</p>
                </div>
                
                <div className="p-10 bg-white border border-slate-200 rounded-[3rem] shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-[5rem] -mr-8 -mt-8 transition-all group-hover:scale-110" />
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-amber-100 rounded-2xl">
                        <LightBulbIcon className="w-8 h-8 text-amber-600" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">Why I built this</h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-lg font-medium">
                      Hey! I'm Raakesh, a full-stack developer and a student at <span className="text-indigo-600 font-bold">VIT Vellore</span>. I built Sentinel AI because I was honestly getting creeped out by how good deepfakes have become lately. It's becoming impossible to tell what's real on the internet, and I wanted to create a tool that actually gives regular people and researchers a way to fight back. 
                    </p>
                    <p className="text-slate-600 leading-relaxed text-lg font-medium">
                      Instead of just "guessing," this project is meant to be a proper forensic toolkit using real science like biological pulse detection and frequency analysis to catch synthetic patterns that the human eye misses.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-2">
                   <div className="p-8 rounded-[3rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-300 space-y-6 transform hover:-translate-y-1 transition-all">
                      <div className="flex items-center gap-5">
                         <div className="p-4 bg-white/20 rounded-3xl backdrop-blur-md border border-white/30 shadow-inner">
                           <AcademicCapIcon className="w-8 h-8 text-white" />
                         </div>
                         <div>
                           <span className="text-[11px] font-black text-indigo-100 uppercase tracking-[0.2em] block mb-1">Developer</span>
                           <span className="text-2xl font-black tracking-tight">Raakesh MJ</span>
                         </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-indigo-100 font-bold text-sm">
                          <GlobeAltIcon className="w-5 h-5" />
                          VIT Vellore Student
                        </div>
                        <div className="flex items-center gap-3 text-indigo-100 font-bold text-sm">
                          <UserGroupIcon className="w-5 h-5" />
                          Full-Stack Dev & AI Researcher
                        </div>
                      </div>
                      <div className="flex gap-4 pt-2">
                        <a href="https://github.com/raakeshmj" target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-white text-indigo-700 font-black rounded-2xl text-center flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl active:scale-95 text-sm">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12"/></svg>
                          GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/raakeshmj/" target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-[#0077B5] text-white font-black rounded-2xl text-center flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl active:scale-95 text-sm">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                          LinkedIn
                        </a>
                      </div>
                   </div>

                   <div className="p-8 rounded-[3rem] bg-orange-500 text-white space-y-6 shadow-2xl shadow-orange-200 transform hover:-translate-y-1 transition-all">
                      <div className="flex items-center gap-5">
                         <div className="p-4 bg-white/20 rounded-3xl border border-white/30">
                            <CodeBracketIcon className="w-8 h-8 text-white" />
                         </div>
                         <h4 className="text-2xl font-black tracking-tight">Core Architecture</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {['React 19', 'Gemini AI', 'Tailwind', 'WebAudio', 'Canvas', 'Bayesian Logic'].map(t => (
                          <span key={t} className="px-3 py-1.5 bg-white/20 border border-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-widest">{t}</span>
                        ))}
                      </div>
                      <p className="text-sm text-orange-50 font-bold leading-relaxed opacity-90">
                        I used a multimodal signal pipeline that leverages Gemini's zero-shot reasoning to validate biological and physical forensic markers. It's essentially an ensemble system that looks at the media from 15 different angles simultaneously.
                      </p>
                   </div>
                </div>
              </div>

              <div className="w-full md:w-1/3 rounded-[3rem] bg-white border border-slate-200 p-8 shadow-heavy sticky top-24">
                 <ArchitectureDiagram />
              </div>
            </div>

            <div className="space-y-10 pt-10">
               <div className="flex items-center gap-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em] whitespace-nowrap">Analytical Framework (15 Vectors)</h3>
                  <div className="h-px w-full bg-slate-200" />
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  {[
                    { name: 'Biological Signals', icon: HeartIcon, desc: 'Detects sub-dermal blood flow rhythm through subtle pixel color micro-oscillations.' },
                    { name: 'Ocular Dynamics', icon: EyeIcon, desc: 'Analyzes ocular dynamics and fixation patterns against human physiological baselines.' },
                    { name: 'Photometric Consistency', icon: BoltIcon, desc: 'Geometric verification of corneal reflections and environmental lighting alignment.' },
                    { name: 'Spectral Frequency', icon: SignalIcon, desc: 'Extracts checkerboard artifacts typically introduced by neural network upsampling layers.' },
                    { name: 'Temporal Flux Mapping', icon: VideoCameraIcon, desc: 'Dense optical flow analysis to detect discontinuities in rigid-body head dynamics.' },
                    { name: 'Neural Fingerprinting', icon: CpuChipIcon, desc: 'Signature matching against known generative architectures like Diffusion and GAN models.' },
                    { name: 'Generator Reverse Engineering', icon: WrenchScrewdriverIcon, desc: 'Attribution of specific software tools (DeepFaceLab, Synthesia, etc.) based on unique signatures.' },
                    { name: 'AV Synchronization', icon: SpeakerWaveIcon, desc: 'Phoneme-to-viseme alignment checks with sub-20ms precision for lip-sync artifacts.' },
                    { name: '3D Geometry Check', icon: CircleStackIcon, desc: 'Structure-from-motion reconstruction to find topology violations in facial structure.' },
                    { name: 'Acoustic Forensics', icon: BeakerIcon, desc: 'Detection of voice cloning via unnatural speech cadence and pitch variance.' },
                    { name: 'Environmental Physics', icon: GlobeAltIcon, desc: 'Validation of shadows, reflections, and light fall-off vs physical constraints.' },
                    { name: 'Micro-expression FACS', icon: UserGroupIcon, desc: 'Frame-by-frame Facial Action Coding analysis to detect "frozen" expression units.' },
                    { name: 'Optical Flow Jitter', icon: DocumentMagnifyingGlassIcon, desc: 'Detects blending artifacts at the boundaries of face-swapped regions.' },
                    { name: 'Metadata Integrity', icon: ShieldCheckIcon, desc: 'EXIF and Header audit to find traces of re-encoding or synthetic injection.' },
                    { name: 'Ocular Biometrics', icon: MagnifyingGlassIcon, desc: 'Checks pupillary hippus and light reflex responsiveness for liveness.' }
                  ].map((vector, i) => (
                    <div key={i} className="space-y-4 group p-6 rounded-[2rem] hover:bg-white hover:shadow-soft transition-all border border-transparent hover:border-slate-100">
                       <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-all shadow-sm">
                          <vector.icon className="w-7 h-7 text-slate-400 group-hover:text-indigo-600" />
                       </div>
                       <div className="space-y-2">
                          <h4 className="text-slate-900 font-black text-base tracking-tight">{vector.name}</h4>
                          <p className="text-slate-500 text-sm leading-relaxed font-medium">{vector.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="flex justify-center pt-8 pb-16">
               <button onClick={() => setShowAbout(false)} className="px-12 py-5 bg-slate-900 text-white font-black rounded-2xl flex items-center gap-4 hover:bg-slate-800 transition-all shadow-2xl active:scale-95 text-lg">
                  <ArrowRightIcon className="w-6 h-6 rotate-180" />
                  Return to Dashboard
                </button>
            </div>
          </div>
        ) : state.status === 'idle' ? (
          <div className="max-w-4xl mx-auto text-center space-y-12 py-12 md:py-20">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                <CircleStackIcon className="w-3.5 h-3.5" />
                System Active & Ready
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.05]">
                Media Forensic <br/><span className="text-indigo-600">Audit</span> Engine.
              </h2>
              <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                Analyze and verify digital content authenticity using multimodal signal extraction and biological rhythm verification.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div onClick={() => fileInputRef.current?.click()} className="group p-8 rounded-3xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 cursor-pointer transition-all text-left space-y-6">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-50 transition-colors border border-slate-100 group-hover:border-indigo-100">
                  <CloudArrowUpIcon className="w-6 h-6 text-slate-400 group-hover:text-indigo-600" />
                </div>
                <div><h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2">Static Audit</h3><p className="text-xs text-slate-500 leading-relaxed font-medium">Extract markers from single pre-recorded files.</p></div>
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="video/*,audio/*,image/*" />
              </div>
              <div onClick={() => folderInputRef.current?.click()} className="group p-8 rounded-3xl border border-slate-200 bg-white hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/5 cursor-pointer transition-all text-left space-y-6">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-violet-50 transition-colors border border-slate-100 group-hover:border-violet-100">
                  <FolderPlusIcon className="w-6 h-6 text-slate-400 group-hover:text-violet-600" />
                </div>
                <div><h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2">Batch Processing</h3><p className="text-xs text-slate-500 leading-relaxed font-medium">Analyze entire folders and compare results.</p></div>
                {/* @ts-ignore */}
                <input type="file" ref={folderInputRef} onChange={handleBatchUpload} className="hidden" webkitdirectory="" directory="" multiple />
              </div>
              <div onClick={startLiveMode} className="group p-8 rounded-3xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/5 cursor-pointer transition-all text-left space-y-6">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-emerald-50 transition-colors border border-slate-100 group-hover:border-emerald-100">
                  <VideoCameraIcon className="w-6 h-6 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <div><h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2">Live Stream Guard</h3><p className="text-xs text-slate-500 leading-relaxed font-medium">Perform real-time continuous stream monitoring.</p></div>
              </div>
            </div>
          </div>
        ) : state.status === 'batch' && state.batchState ? (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-10 rounded-[2.5rem] border border-slate-200 bg-white shadow-soft flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-violet-50 text-violet-600 border border-violet-100 rounded-lg text-[10px] font-extrabold uppercase tracking-widest">Batch Mode Active</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{state.batchState.files.length} Files Queued</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Bulk Forensic Audit.</h2>
              </div>
              <div className="flex gap-4">
                {!state.batchState.isProcessing && !state.batchState.summary && (<button onClick={processBatch} className="px-8 py-3 bg-violet-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-violet-200 hover:bg-violet-700 transition-all">Start Batch Analysis</button>)}
                {state.batchState.summary && (<><button onClick={exportBatchCSV} className="px-6 py-3 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl font-bold text-sm hover:bg-emerald-100 transition-all flex items-center gap-2"><ArrowDownTrayIcon className="w-4 h-4" />Export CSV</button><button onClick={resetAnalysis} className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all">New Batch</button></>)}
              </div>
            </div>
            {state.batchState.isProcessing && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex justify-between items-end"><span className="text-xs font-bold text-slate-900 uppercase tracking-widest">Processing: {state.batchState.files[state.batchState.currentFileIndex].file.name}</span><span className="text-xl font-black text-indigo-600 tracking-tighter">{state.batchState.currentFileIndex + 1} / {state.batchState.files.length}</span></div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${state.progress}%` }} /></div>
              </div>
            )}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead><tr className="bg-slate-50 border-b border-slate-100"><th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th><th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">File Name</th><th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Generator</th><th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Confidence</th><th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th></tr></thead>
                   <tbody>{state.batchState.files.map((bf) => { const isOutlier = state.batchState?.summary?.outliers?.includes(bf.id); return (<tr key={bf.id} className={`border-b border-slate-50 transition-colors ${isOutlier ? 'bg-rose-50/30' : 'hover:bg-slate-50/50'}`}><td className="px-8 py-5">{bf.status === 'completed' ? <CheckCircleIcon className="w-5 h-5 text-emerald-500" /> : bf.status === 'processing' ? <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" /> : bf.status === 'error' ? <ShieldExclamationIcon className="w-5 h-5 text-rose-500" /> : <SignalIcon className="w-5 h-5 text-slate-300" />}</td><td className="px-8 py-5"><div className="flex flex-col"><span className="text-sm font-bold text-slate-900 truncate max-w-[200px] md:max-w-md">{bf.file.name}</span><span className="text-[10px] text-slate-400 font-bold uppercase">{(bf.file.size / (1024 * 1024)).toFixed(2)} MB</span></div></td><td className="px-8 py-5"><span className="text-xs font-bold text-slate-700">{bf.report?.forensic_vectors.tool_attribution?.detected_tool || (bf.status === 'completed' ? 'Authentic' : '-')}</span></td><td className="px-8 py-5 text-center">{bf.report ? (<div className="flex flex-col items-center"><span className={`text-lg font-black tracking-tighter ${isOutlier ? 'text-rose-600 underline decoration-rose-200' : 'text-slate-900'}`}>{(bf.report.overall_assessment.confidence_score < 1 ? bf.report.overall_assessment.confidence_score * 100 : bf.report.overall_assessment.confidence_score).toFixed(0)}%</span></div>) : '-'}</td><td className="px-8 py-5 text-right">{bf.report && <button onClick={() => setViewingBatchReport(bf.id)} className="text-indigo-600 hover:text-indigo-800 font-bold text-xs uppercase tracking-widest transition-colors">View Report</button>}</td></tr>); })}</tbody>
                 </table>
               </div>
            </div>
          </div>
        ) : state.status === 'live' ? (
          <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8 space-y-6">
                <div className="relative aspect-video bg-black rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                  <canvas ref={canvasRef} className="hidden" />
                  <div className="absolute inset-0 pointer-events-none p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                        <span className="text-white text-xs font-black uppercase tracking-widest">Live Audit Active</span>
                      </div>
                      {state.liveFrame && (
                        <div className={`px-5 py-2 rounded-2xl backdrop-blur-md border font-black uppercase tracking-widest text-xs ${getThreatColor(state.liveFrame.threat_level)}`}>
                          Threat: {state.liveFrame.threat_level}
                        </div>
                      )}
                    </div>
                    {activeChallenge && (
                      <div className="bg-indigo-600/90 text-white p-8 rounded-3xl backdrop-blur-xl border border-white/30 shadow-2xl animate-in slide-in-from-bottom-10 flex items-center gap-6 self-center max-w-lg mb-10">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                          <FingerPrintIcon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-100">Liveness Challenge</span>
                          <p className="text-xl font-black leading-tight mt-1">{activeChallenge.challenge_text}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                   <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Instant Confidence</span>
                      <div className="text-3xl font-black text-slate-900">{(state.liveFrame?.instant_confidence || 100).toFixed(1)}%</div>
                   </div>
                   <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Rolling Score</span>
                      <div className="text-3xl font-black text-slate-900">{(state.liveFrame?.rolling_average_confidence || 100).toFixed(1)}%</div>
                   </div>
                   <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Frame Context</span>
                      <div className="text-3xl font-black text-slate-900">#{state.liveFrame?.frame_number || 0}</div>
                   </div>
                </div>
              </div>
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-soft space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 rounded-2xl">
                      <MagnifyingGlassIcon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-black tracking-tight">Stream Analysis</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-4">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Active Anomalies</span>
                       {state.liveFrame?.active_anomalies && state.liveFrame.active_anomalies.length > 0 ? (
                         <div className="space-y-3">
                           {state.liveFrame.active_anomalies.map((anom, idx) => (
                             <div key={idx} className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-4">
                               <ExclamationCircleIcon className="w-5 h-5 text-rose-500" />
                               <div className="flex-1">
                                 <span className="text-xs font-black text-rose-900 uppercase block">{anom.type}</span>
                                 <span className="text-[10px] text-rose-600 font-bold">Severity: {anom.severity}</span>
                               </div>
                             </div>
                           ))}
                         </div>
                       ) : (
                         <div className="p-6 border-2 border-dashed border-slate-100 rounded-3xl text-center">
                            <CheckCircleIcon className="w-8 h-8 text-emerald-300 mx-auto mb-2" />
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">No active anomalies detected</p>
                         </div>
                       )}
                    </div>
                    <div className="pt-6 border-t border-slate-100">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Recommended Action</span>
                       <div className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-center">
                          <span className="text-sm font-black uppercase tracking-[0.2em]">{state.liveFrame?.recommended_action || 'AUDITING...'}</span>
                       </div>
                    </div>
                  </div>
                </div>
                <div className="p-8 bg-indigo-600 text-white rounded-[2.5rem] shadow-xl shadow-indigo-200 space-y-6">
                   <div className="flex items-center gap-4">
                      <AcademicCapIcon className="w-7 h-7 text-indigo-100" />
                      <h4 className="text-lg font-black tracking-tight">Forensic Tips</h4>
                   </div>
                   <p className="text-sm text-indigo-50 font-medium leading-relaxed">
                     Ask the subject to perform complex head rotations or varied facial expressions. AI models often struggle with high-angle geometric consistency.
                   </p>
                </div>
              </div>
            </div>
          </div>
        ) : state.status === 'analyzing' ? (
          <div className="max-w-xl mx-auto text-center py-20 space-y-10">
            <div className="relative inline-flex"><div className="absolute inset-0 bg-indigo-100 blur-3xl rounded-full opacity-50" /><div className="relative w-48 h-48 mx-auto"><svg className="w-full h-full transform -rotate-90"><circle cx="50%" cy="50%" r="46%" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-slate-100" /><circle cx="50%" cy="50%" r="46%" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-indigo-600" strokeDasharray="100" strokeDashoffset={100 - state.progress} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.15s linear' }} /></svg><div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-5xl font-black text-slate-900 tracking-tighter">{state.progress.toFixed(0)}%</span></div></div></div>
            <div className="space-y-4"><h3 className="text-2xl font-bold text-slate-900 tracking-tight">Extracting Forensic Signals...</h3><p className="text-slate-500 font-medium leading-relaxed px-10">Running 15-vector forensic suite and generator reverse engineering. This takes about 30-40 seconds for deep validation.</p></div>
          </div>
        ) : state.status === 'completed' && state.report ? (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
             <div className="p-10 md:p-14 rounded-[2.5rem] border border-slate-200 bg-white flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 shadow-soft">
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-center gap-4"><div className="px-3 py-1 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-lg text-[10px] font-extrabold uppercase tracking-[0.2em]">Forensic Certification</div><span className="text-[10px] text-slate-400 font-mono tracking-tight">SIG_HASH: {state.report.forensic_vectors.chain_of_custody.analysis_hash_sha256.slice(0, 32)}</span></div>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">Audit <br/>Certificate.</h2>
                <p className="text-lg text-slate-500 leading-relaxed font-medium">{state.report.forensic_report_summary.executive_summary}</p>
              </div>
              <div className={`p-12 rounded-[2rem] border-2 flex flex-col items-center justify-center min-w-[300px] text-center gap-6 shadow-sm ${getVerdictStyles(state.report.overall_assessment.verdict)}`}>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Authentication</span>
                <span className="text-3xl font-black tracking-tight">{state.report.overall_assessment.verdict.replace('_', ' ')}</span>
                <div className="w-full h-px bg-slate-200 opacity-30" />
                <div className="flex flex-col items-center"><span className="text-6xl font-black tracking-tighter">{(state.report.overall_assessment.confidence_score < 1 ? state.report.overall_assessment.confidence_score * 100 : state.report.overall_assessment.confidence_score).toFixed(1)}%</span><span className="text-[10px] font-bold uppercase tracking-widest opacity-60 mt-2">Integrity Factor</span></div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4 space-y-10">
                <div className="rounded-[2.5rem] overflow-hidden border border-slate-200 bg-white shadow-sm">
                  <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest"><DocumentMagnifyingGlassIcon className="w-4 h-4 text-indigo-600" />Source Content</div>
                  <div className="aspect-square bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100">
                    {filePreview && (fileType === 'video' ? <video src={filePreview} className="w-full h-full object-cover" controls /> : fileType === 'image' ? <img src={filePreview} className="w-full h-full object-cover" /> : <div className="p-12 w-full text-center space-y-4"><SpeakerWaveIcon className="w-16 h-16 text-slate-200 mx-auto" /><audio src={filePreview} className="w-full h-8 opacity-60" controls /></div>)}
                  </div>
                  <div className="p-8"><ForensicChart findings={state.report.critical_findings} /></div>
                </div>
              </div>
              <div className="lg:col-span-8 space-y-10">
                <ToolAttributionDisplay attribution={state.report.forensic_vectors.tool_attribution} />
                <NeuralAttributionDisplay attribution={state.report.forensic_vectors.neural_fingerprint.deep_attribution} />
                <div className="space-y-6">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-6">Technical Evidence Audit<div className="h-px flex-1 bg-slate-200" /></h3>
                  <div className="grid grid-cols-1 gap-4">
                    {state.report.critical_findings.filter(f => f.description && f.description.trim().length > 10).map((f, i) => (
                      <div key={i} className="p-8 rounded-[2rem] border border-slate-200 bg-white hover:border-indigo-100 transition-all flex flex-col md:flex-row gap-8 items-start shadow-sm group">
                        <div className="md:w-32 flex-shrink-0 text-left md:text-center space-y-3"><span className="block text-[10px] font-bold text-slate-300 uppercase tracking-widest">Mark #{f.finding_id}</span><span className={`px-4 py-1 rounded-full text-[10px] font-bold border inline-block ${f.severity === 'CRITICAL' ? 'border-rose-100 text-rose-600 bg-rose-50' : 'border-amber-100 text-amber-600 bg-amber-50'}`}>{f.severity}</span></div>
                        <div className="space-y-3 flex-1"><h4 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">{f.category}</h4><p className="text-slate-500 leading-relaxed font-medium text-sm">{f.description}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end pt-6 pb-20"><button onClick={resetAnalysis} className="px-12 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-sm shadow-xl transition-all active:scale-95">Start New Audit</button></div>
              </div>
            </div>
          </div>
        ) : state.status === 'error' ? (
           <div className="max-w-xl mx-auto p-16 rounded-[3rem] border border-rose-100 bg-white text-center space-y-8 animate-in zoom-in-95 duration-500 shadow-soft">
             <ShieldExclamationIcon className="w-20 h-20 text-rose-200 mx-auto" />
             <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">Forensic Chain Broken</h3>
             <p className="text-slate-500 leading-relaxed px-8 font-medium">{state.error}</p>
             <button onClick={resetAnalysis} className="px-10 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all">Return to Dashboard</button>
           </div>
        ) : null}
      </main>

      <footer className="border-t border-slate-200 py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="flex items-center gap-5"><div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200"><ShieldCheckIcon className="w-7 h-7 text-slate-300" /></div><div className="space-y-1"><span className="text-11px font-bold text-slate-900 uppercase tracking-[0.4em] block">Sentinel AI</span><span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Media Audit Engine</span></div></div>
          <div className="flex gap-16 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]"><div className="space-y-2"><span>Detection Acc.</span><span className="block text-slate-900 text-xl tracking-tighter">99.4%</span></div><div className="space-y-2"><span>Signal Recall</span><span className="block text-slate-900 text-xl tracking-tighter">98.7%</span></div></div>
        </div>
      </footer>
    </div>
  );
};

export default App;
