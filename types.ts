export type Verdict = 'AUTHENTIC' | 'LIKELY_AUTHENTIC' | 'SUSPICIOUS' | 'LIKELY_SYNTHETIC' | 'SYNTHETIC' | 'AUTHENTICATED_HUMAN' | 'SUSPECTED_SYNTHETIC' | 'CONFIRMED_DEEPFAKE' | 'INCONCLUSIVE';
export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type ThreatLevel = 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED';

export interface Finding {
  finding_id: number;
  severity: Severity;
  category: string;
  description: string;
  supporting_modules: number[];
  evidence_coordinates: string;
}

export interface LiveAnomaly {
  type: string;
  severity: Severity;
  first_detected_frame: number;
  consecutive_frames: number;
  spatial_location?: string;
  confidence_impact: number;
}

export interface LivenessChallenge {
  challenge_id: string;
  challenge_type: string;
  challenge_text: string;
  status: 'PENDING' | 'ACTIVE' | 'PASSED' | 'FAILED';
  issued_at: number;
}

export interface FrameAnalysis {
  frame_number: number;
  timestamp_ms: number;
  instant_confidence: number;
  rolling_average_confidence: number;
  threat_level: ThreatLevel;
  active_anomalies: LiveAnomaly[];
  recommended_action: 'CONTINUE' | 'MONITOR_CLOSELY' | 'ISSUE_CHALLENGE' | 'ALERT' | 'TERMINATE';
  challenge_request?: {
    type: string;
    text: string;
  };
}

export interface NeuralAttribution {
  stylegan_details?: {
    version: string;
    dataset: string;
    iterations: string;
    resolution: string;
    truncation_psi: number;
    fine_tuned: boolean;
  };
  stable_diffusion_details?: {
    version: string;
    checkpoint_match: string;
    vae: string;
    sampler: string;
    steps: number;
    cfg_scale: number;
  };
  threat_intelligence?: {
    malicious_match: boolean;
    known_campaigns: string[];
    darknet_tool_association: string;
  };
}

export interface ToolAttribution {
  detected_tool: string;
  confidence: number;
  version_estimate: string;
  skill_level: 'NOVICE' | 'INTERMEDIATE' | 'EXPERT';
  evidence: string[];
}

export interface ForensicReport {
  analysis_metadata: {
    spectre_version: string;
    analysis_mode: string;
    timestamp_utc: string;
    processing_time_ms: number;
    media_type: string;
    file_hash_sha256: string;
    file_name?: string;
  };
  overall_assessment: {
    verdict: Verdict;
    confidence_score: number;
    bayesian_posterior: number;
    credible_interval_95: [number, number];
    entropy_bits: number;
    confidence_level: 'HIGH' | 'MEDIUM' | 'LOW';
  };
  forensic_vectors: {
    biological_rppg: any;
    neural_fingerprint: {
      executed: boolean;
      detected_architecture: string;
      confidence_score: number;
      signature_evidence: string[];
      deep_attribution?: NeuralAttribution;
    };
    tool_attribution?: ToolAttribution;
    ocular_biometrics: any;
    geometric_3d: any;
    linguistic_prosody: any;
    chain_of_custody: {
      analysis_hash_sha256: string;
      timestamp_utc: string;
    };
  };
  critical_findings: Finding[];
  forensic_report_summary: {
    executive_summary: string;
    technical_summary: string;
    legal_admissibility: 'HIGH' | 'MEDIUM' | 'LOW';
  };
}

export interface BatchFile {
  id: string;
  file: File;
  status: 'pending' | 'processing' | 'completed' | 'error';
  report?: ForensicReport;
  error?: string;
  progress: number;
}

export interface BatchAnalysisState {
  files: BatchFile[];
  isProcessing: boolean;
  currentFileIndex: number;
  summary?: {
    avgConfidence: number;
    outliers: string[]; // IDs
    totalAnomalies: number;
    commonFingerprint?: string;
    threatSummary: string;
  };
}

export interface AnalysisState {
  status: 'idle' | 'analyzing' | 'completed' | 'error' | 'live' | 'batch';
  progress: number;
  report: ForensicReport | null;
  error: string | null;
  liveFrame?: FrameAnalysis;
  batchState?: BatchAnalysisState;
}