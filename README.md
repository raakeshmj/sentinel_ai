SENTINEL AI
Enterprise-Grade Multimodal Deepfake Detection & Forensic Verification Platform
Combat synthetic media deception through biological signals, frequency analysis, physics validation, and live stream monitoring. Features real-time liveness challenges, neural architecture attribution, and cryptographic audit trails for legal admissibility.

Overview
SENTINEL AI is a multimodal forensic platform that detects deepfakes and synthetic media through 15 independent analysis vectors. The system operates on a Defense-in-Depth strategy, combining signal processing, biological analysis, and physics validation to provide court-admissible forensic evidence.
Key Capabilities

Analyze images, videos, audio files, and live camera streams
Detect AI-generated content from StyleGAN, Stable Diffusion, DALL-E, Midjourney
Real-time face swap and voice cloning detection
Bayesian ensemble fusion for probabilistic confidence scoring
Blockchain-based chain of custody with cryptographic hashing
Export forensic reports in PDF, JSON, CSV formats


Features
Core Forensic Analysis

Biological Signal Processing - Remote photoplethysmography (rPPG) for cardiac rhythm detection
Neural Fingerprinting - Identify specific generative AI models and versions
3D Geometry Validation - Structure-from-motion facial topology analysis
Micro-Expression Analysis - FACS temporal validation with Action Unit tracking
Ocular Biometrics - Iris micromovement, pupillary dynamics, saccade patterns
Frequency Domain Analysis - DCT spectral artifacts and upsampling detection
Temporal Consistency - Optical flow and physics-based motion validation
Audio-Visual Sync - Phoneme-to-viseme alignment with labial closure audit
Environmental Physics - Lighting, shadows, and atmospheric perspective validation
Linguistic Prosody - Disfluency analysis and speech pattern recognition

Advanced Features

Bayesian Ensemble Fusion - Weighted probabilistic integration across all modules
Adversarial Robustness Testing - Detect anti-forensic evasion techniques
Live Liveness Challenges - Interactive authentication with biomechanical validation
Explainable AI Output - Detailed evidence attribution with confidence intervals
Cryptographic Provenance - SHA-256 hashing with blockchain simulation


System Architecture
┌──────────────────────────────────────────────────────────┐
│                   SENTINEL AI Platform                    │
└──────────────────────────────────────────────────────────┘
                           │
           ┌───────────────┴───────────────┐
           │                               │
    ┌──────▼──────┐                ┌──────▼──────┐
    │  Frontend   │                │   Analysis  │
    │   React     │◄───────────────┤   Engine    │
    │  Tailwind   │                │  Gemini AI  │
    └─────────────┘                └──────┬──────┘
                                          │
                    ┌─────────────────────┼─────────────────────┐
                    │                     │                     │
             ┌──────▼──────┐      ┌──────▼──────┐      ┌──────▼──────┐
             │ Biological  │      │  Frequency  │      │  Temporal   │
             │   Signals   │      │   Domain    │      │  Coherence  │
             └─────────────┘      └─────────────┘      └─────────────┘
                    │                     │                     │
             ┌──────▼──────┐      ┌──────▼──────┐      ┌──────▼──────┐
             │   Neural    │      │     3D      │      │   Ocular    │
             │ Fingerprint │      │  Geometric  │      │ Biometrics  │
             └─────────────┘      └─────────────┘      └─────────────┘
                    │                     │                     │
                    └─────────────────────┼─────────────────────┘
                                          │
                                   ┌──────▼──────┐
                                   │   Bayesian  │
                                   │   Fusion    │
                                   └──────┬──────┘
                                          │
                                   ┌──────▼──────┐
                                   │  Forensic   │
                                   │   Report    │
                                   └──────┬──────┘
                                          │
                                   ┌──────▼──────┐
                                   │ Blockchain  │
                                   │ Provenance  │
                                   └─────────────┘
Data Flow

Input - User uploads media file or initiates live stream
Preprocessing - Format validation and normalization
Parallel Execution - All 15 forensic modules analyze simultaneously
Evidence Integration - Bayesian fusion with module weighting
Report Generation - Comprehensive JSON output with visualizations
Provenance - Cryptographic hash generation and chain of custody


Analysis Modes
SENTINEL AI supports three primary operational modes:
1. Standard Audit Mode
Upload and analyze static media files (images, videos, audio).
Supported Formats:

Images: JPG, PNG, WebP, GIF
Video: MP4, MOV, AVI, WebM
Audio: MP3, WAV, M4A, OGG

Features:

Full 15-module forensic analysis
Comprehensive or quick scan options
Detailed JSON report with confidence scores
Export to PDF/CSV for documentation

Use Cases:

Pre-publication media verification
Evidence authentication for legal proceedings
Historical content analysis
Bulk media screening

2. Live Stream Mode
Real-time authentication of live camera feeds with liveness challenges.
Features:

Continuous frame-by-frame analysis (15-30 FPS)
Automatic anomaly detection with threat levels
Interactive liveness challenges (head rotation, blink patterns, gestures)
Session-based confidence tracking
Immediate alert on deepfake detection

Use Cases:

Video call authentication (Zoom, Teams, Meet)
KYC identity verification
Live stream content moderation
Security checkpoint authentication

3. Batch Processing Mode
Analyze multiple files simultaneously with comparative reporting.
Features:

Parallel processing of 5-10 files concurrently
Cross-file anomaly comparison
Statistical distribution analysis
Outlier detection (files with significantly different confidence scores)
Bulk export with summary report

Use Cases:

Archive verification
Dataset authenticity validation
Misinformation campaign detection
Forensic investigation of multiple evidence files


Forensic Modules
Core Modules (Always Active)
Module 1 - Biological rPPG
Remote photoplethysmography pulse detection, cardiac rhythm analysis (0.8-2.0 Hz expected), chrominance oscillation in facial regions.
Module 2 - Photometric Ocular
Corneal specular highlight analysis, bilateral reflection symmetry validation, pupil geometry assessment.
Module 3 - Frequency Domain
Discrete Cosine Transform (DCT) analysis, checkerboard artifact detection, neural upsampling signature identification.
Module 4 - Acoustic Forensics
Spectral discontinuity detection, voice modulation consistency, respiratory micro-event analysis.
Module 5 - Temporal Optical Flow
Motion vector validation, physics-based acceleration checks, geometric drift detection.
Module 6 - Audio-Visual Sync
Phoneme-to-viseme alignment, labial closure audit for plosives, temporal drift measurement.
Module 7 - Metadata Forensics
EXIF data extraction and validation, codec history analysis, temporal consistency verification.
Module 8 - Chain of Custody
SHA-256 cryptographic hashing, blockchain provenance simulation, immutable audit trail generation.
Advanced Modules (Conditional)
Module 9 - Neural Fingerprinting
AI model architecture detection, version identification (StyleGAN2, Stable Diffusion 1.5, etc.), generation parameter estimation.
Module 10 - Micro-Expression FACS
Facial Action Unit temporal tracking, onset/apex/offset validation, emotional congruence analysis.
Module 11 - Ocular Biometrics
Hippus oscillation measurement, microsaccade pattern analysis, vergence-accommodation coupling.
Module 12 - 3D Geometric
Facial mesh reconstruction, epipolar geometry validation, depth map consistency.
Module 13 - Linguistic Prosody
Type-Token Ratio (TTR) calculation, disfluency percentage analysis, F0 pitch contour variance.
Module 14 - Environmental Physics
Inverse-square law verification, shadow-to-geometry ray tracing, atmospheric perspective validation.
Module 15 - Live Stream Detection
Real-time face swap detection, liveness challenge generation, biomechanical response validation.

Technology Stack
Frontend

React 19 - Component-based UI framework
Tailwind CSS - Utility-first styling
Recharts - Data visualization for anomaly density
Lucide React - Icon library

Backend/Processing

Google Generative AI SDK - Gemini 2.0 Flash API integration
@google/generative-ai - Multimodal analysis engine

Analysis Technologies

Signal Processing - DCT, FFT, Wavelet transforms
Computer Vision - Optical flow, structure-from-motion
Audio Processing - Spectral analysis, formant extraction
Cryptography - SHA-256 hashing for provenance


Using the Application
Standard Audit Workflow
Step 1: Access Standard Audit
Navigate to the "Standard Audit" tab in the main navigation menu.
Step 2: Upload Media
Click the upload area or drag and drop your media file. Supported formats include images (JPG, PNG, WebP), videos (MP4, MOV, WebM), and audio files (MP3, WAV, M4A). Maximum file size is 20MB.
Step 3: Select Analysis Mode
Choose your analysis depth:

Comprehensive Analysis - Executes all 15 forensic modules for maximum accuracy. Recommended for legal evidence or critical verification. Processing time: 10-45 seconds depending on file type.
Quick Scan - Runs 3 priority modules (Frequency Domain, Metadata, Neural Fingerprinting) for rapid triage. Processing time: 2-5 seconds.

Step 4: Configure Sensitivity
Set detection sensitivity level:

High - Flags even minor anomalies. Use for forensic investigations.
Medium - Balanced approach. Recommended for general use.
Low - Only critical violations. Use for bulk screening.

Step 5: Initiate Analysis
Click "Analyze Media" to begin processing. A progress indicator shows the current analysis stage.
Step 6: Review Results
The forensic report displays:

Overall Verdict - AUTHENTIC, LIKELY_AUTHENTIC, SUSPICIOUS, LIKELY_SYNTHETIC, or SYNTHETIC
Confidence Score - 0-100% with 95% credible interval
Threat Level - GREEN, YELLOW, ORANGE, or RED
Module Breakdown - Individual scores from each forensic vector
Critical Findings - Ranked list of detected anomalies with severity
Anomaly Density Radar - Visual chart showing which vectors detected issues

Step 7: Examine Evidence
Click on any module to expand detailed findings:

Specific anomaly types detected
Temporal or spatial coordinates of issues
Technical measurements and thresholds
Evidence strength score

Step 8: Export Report
Download the forensic report in your preferred format:

PDF - Professional formatted report for documentation
JSON - Raw data for integration with other systems
CSV - Tabular data for spreadsheet analysis

Step 9: Verify Chain of Custody
Copy the SHA-256 cryptographic hash displayed at the bottom of the report. This hash serves as an immutable fingerprint of the analysis and can be used for future verification.

Live Stream Workflow
Step 1: Access Live Stream
Navigate to the "Live Stream" tab in the main navigation.
Step 2: Grant Camera Permissions
Click "Start Camera Detection". Your browser will prompt for camera access - click "Allow" to proceed.
Step 3: Position Yourself
Center your face in the camera frame. The system works best with:

Well-lit environment (avoid backlighting)
Neutral background
Face clearly visible (no obstructions)
Stable camera position

Step 4: Monitor Real-Time Analysis
The system begins continuous monitoring, displaying:

Live Confidence Meter - Updates every 500ms showing current authenticity score
Threat Level Indicator - Color-coded status (GREEN/YELLOW/ORANGE/RED)
Active Anomalies Ticker - Scrolling list of detected issues
Session Timeline - Graph showing confidence over time

Step 5: Respond to Liveness Challenges
When confidence drops below 70%, the system issues an interactive challenge:
Challenge Types:

"Turn your head to the LEFT" - Validates 3D facial consistency
"Blink TWICE quickly" - Tests ocular control
"Touch your NOSE" - Verifies gesture response
"SMILE at the camera" - Checks micro-expression authenticity
"Move CLOSER to camera" - Tests depth and parallax

Challenge Response:
You have 5 seconds to perform the requested action. The system validates:

Response timing (natural human reaction: 300-800ms)
Biomechanical correctness (smooth motion, natural physics)
Challenge specificity (exact action match)

Challenge Result:

PASS - Confidence score increases by 10%, threat level improves
FAIL - Confidence decreases by 20%, may trigger additional challenges or alert

Step 6: Review Session Metrics
During the stream, monitor:

Current frame number and timestamp
Average confidence over session
Number of anomalies detected
Consecutive suspicious frames count

Step 7: End Session
Click "Stop Camera" to terminate the stream. A session summary generates automatically:

Total duration and frames analyzed
Average, minimum, and maximum confidence
Challenge history (issued, passed, failed)
Final authentication verdict
Complete anomaly timeline

Step 8: Export Session Report
Download the session forensic report containing:

Frame-by-frame confidence data
All detected anomalies with timestamps
Liveness challenge results
Session cryptographic hash


Batch Processing Workflow
Step 1: Access Batch Processing
Navigate to the "Batch Processing" tab in the main navigation.
Step 2: Upload Multiple Files
Add files using one of two methods:

Drag and Drop - Drag multiple files or a folder into the upload zone
Browse Files - Click to open file selector, hold Ctrl/Cmd to select multiple

The system accepts up to 100 files per batch. Each file is validated for format and size (max 20MB per file).
Step 3: Review File Queue
The upload area displays all queued files with:

Filename and file type icon
File size
Remove button (to exclude from batch)

Step 4: Configure Batch Settings
Set analysis parameters for the entire batch:

Analysis Mode - Comprehensive or Quick Scan
Parallel Processing - Number of files to analyze simultaneously (5-10 recommended)
Priority Order - Process by upload order, file size, or file type

Step 5: Initiate Batch Processing
Click "Process Batch" to begin. A progress dashboard shows:

Overall completion percentage
Current file being processed (X of Y)
Individual file progress bars
Estimated time remaining

Step 6: Monitor Batch Progress
As files complete, they move to the "Completed" section with:

Confidence score badge (color-coded by verdict)
Quick verdict icon (checkmark for authentic, warning for suspicious)
Processing time

Step 7: Review Comparative Analysis
After all files process, the Batch Summary Report displays:

Statistical Distribution - Histogram of confidence scores across batch
Outlier Detection - Files with scores >2 standard deviations from mean
Anomaly Clustering - Common anomalies across multiple files
Neural Fingerprint Matching - Files likely generated by same AI model

Step 8: Investigate Suspicious Files
Click any file in the results to view its full forensic report. Files flagged as outliers or suspicious are highlighted for priority review.
Step 9: Cross-File Comparison
Select 2-4 files and click "Compare Selected" to generate a differential analysis showing:

Side-by-side confidence scores
Unique vs. shared anomalies
Metadata timeline comparison
Evidence that files may be related

Step 10: Export Batch Results
Download batch results in multiple formats:

Summary PDF - Executive overview with statistics and flagged files
Individual Reports - Separate forensic report for each file
CSV Database - Spreadsheet with all metrics for further analysis
JSON Archive - Complete raw data for all files


Performance Metrics
Processing Times (Average)

Quick Scan - 2-5 seconds
Comprehensive Image - 8-15 seconds
Comprehensive Video (per minute) - 25-45 seconds
Live Stream Frame - <500ms
Batch Processing (10 files) - 60-120 seconds

System Requirements
Minimum:

4GB RAM
Dual-core processor
500MB storage
Modern browser (Chrome 90+, Firefox 88+, Safari 14+)

Recommended:

8GB+ RAM
Quad-core processor
2GB storage
Webcam for live stream mode
GPU acceleration (optional)


API Response Format
All analyses return structured JSON:
json{
  "analysis_metadata": {
    "timestamp_utc": "2025-02-08T12:00:00Z",
    "processing_time_ms": 2847,
    "analysis_mode": "COMPREHENSIVE"
  },
  "overall_assessment": {
    "verdict": "SUSPICIOUS",
    "confidence_score": 67,
    "bayesian_posterior": 68,
    "credible_interval_95": [59, 76],
    "confidence_level": "MEDIUM"
  },
  "forensic_vectors": {
    "biological_rppg": {
      "confidence_score": 45,
      "anomalies_detected": [...],
      "verdict": "FAIL"
    }
  },
  "critical_findings": [...],
  "recommendations": {...}
}
