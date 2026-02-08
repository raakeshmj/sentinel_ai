# SENTINEL AI

## Enterprise-Grade Multimodal Deepfake Detection & Forensic Verification Platform

SENTINEL AI is an advanced forensic intelligence platform designed to combat synthetic media deception. It performs deepfake detection and authenticity verification using biological signals, frequency analysis, physics validation, and real-time live stream monitoring. The system produces cryptographically verifiable, court-admissible forensic evidence.

---

## Overview

SENTINEL AI is a multimodal forensic analysis platform that detects deepfakes and AI-generated media using **15 independent analysis vectors**. It follows a **Defense-in-Depth** architecture, combining signal processing, biological analysis, neural attribution, and physical consistency checks to ensure high-confidence authenticity verification.

---

## Key Capabilities

- Analyze images, videos, audio files, and live camera streams  
- Detect AI-generated content from StyleGAN, Stable Diffusion, DALL·E, Midjourney, and similar models  
- Real-time face swap and voice cloning detection  
- Bayesian ensemble fusion for probabilistic confidence scoring  
- Blockchain-based chain of custody with cryptographic hashing  
- Export forensic reports in PDF, JSON, and CSV formats  

---

## Features

### Core Forensic Analysis

- **Biological Signal Processing** – Remote photoplethysmography (rPPG) for cardiac rhythm detection  
- **Neural Fingerprinting** – Attribution of generative model architecture and version  
- **3D Geometry Validation** – Structure-from-motion facial topology analysis  
- **Micro-Expression Analysis** – FACS-based Action Unit temporal validation  
- **Ocular Biometrics** – Iris micromovement, pupil dynamics, and saccade analysis  
- **Frequency Domain Analysis** – DCT spectral artifacts and upsampling detection  
- **Temporal Consistency** – Optical flow and physics-based motion validation  
- **Audio-Visual Synchronization** – Phoneme-to-viseme alignment and labial closure auditing  
- **Environmental Physics** – Lighting, shadows, and atmospheric perspective validation  
- **Linguistic Prosody** – Disfluency analysis and speech pattern recognition  

### Advanced Capabilities

- **Bayesian Ensemble Fusion** – Weighted probabilistic integration across all modules  
- **Adversarial Robustness Testing** – Detection of anti-forensic evasion techniques  
- **Live Liveness Challenges** – Interactive authentication using biomechanical validation  
- **Explainable AI Output** – Evidence attribution with confidence intervals  
- **Cryptographic Provenance** – SHA-256 hashing with blockchain-based audit trails  

---
## Data Flow

1. **Input** – User uploads media or initiates live stream  
2. **Preprocessing** – Format validation and normalization  
3. **Parallel Execution** – All forensic modules run simultaneously  
4. **Evidence Integration** – Bayesian fusion with weighted confidence scoring  
5. **Report Generation** – Structured forensic output with visualizations  
6. **Provenance** – Cryptographic hash generation and custody recording  

---

## Analysis Modes

### 1. Standard Audit Mode

Analyze static media files.

**Supported Formats**
- Images: JPG, PNG, WebP, GIF  
- Video: MP4, MOV, AVI, WebM  
- Audio: MP3, WAV, M4A, OGG  

**Features**
- Full 15-module forensic analysis  
- Quick Scan and Comprehensive options  
- Detailed JSON reports with confidence scoring  
- PDF and CSV export  

**Use Cases**
- Legal evidence verification  
- Pre-publication media validation  
- Historical content analysis  
- Bulk media screening  

---

### 2. Live Stream Mode

Real-time authentication of camera feeds with liveness challenges.

**Features**
- Continuous 15–30 FPS analysis  
- Automatic anomaly detection and threat escalation  
- Interactive liveness challenges  
- Session-based confidence tracking  
- Immediate alerts on detection  

**Use Cases**
- Video call authentication  
- KYC identity verification  
- Live stream moderation  
- Secure access checkpoints  

---

### 3. Batch Processing Mode

Analyze multiple files with comparative reporting.

**Features**
- Parallel processing of 5–10 files  
- Cross-file anomaly comparison  
- Statistical distribution and outlier detection  
- Bulk export with summary reports  

**Use Cases**
- Dataset authenticity validation  
- Archive verification  
- Coordinated misinformation detection  
- Multi-evidence forensic investigations  

---

## Forensic Modules

### Core Modules (Always Active)

1. **Biological rPPG** – Cardiac rhythm detection and chrominance oscillation analysis  
2. **Photometric Ocular** – Corneal highlights and pupil geometry validation  
3. **Frequency Domain** – DCT analysis and neural upsampling artifact detection  
4. **Acoustic Forensics** – Spectral continuity and respiratory micro-events  
5. **Temporal Optical Flow** – Physics-based motion and drift detection  
6. **Audio-Visual Sync** – Phoneme-viseme alignment and temporal drift  
7. **Metadata Forensics** – EXIF validation and codec history analysis  
8. **Chain of Custody** – SHA-256 hashing and blockchain provenance  

### Advanced Modules (Conditional)

9. **Neural Fingerprinting**  
10. **Micro-Expression FACS**  
11. **Ocular Biometrics**  
12. **3D Geometric Validation**  
13. **Linguistic Prosody Analysis**  
14. **Environmental Physics Validation**  
15. **Live Stream Detection & Liveness Challenges**  

---

## Technology Stack

### Frontend
- React 19  
- Tailwind CSS  
- Recharts  
- Lucide React  

### Backend & Processing
- Google Generative AI SDK  
- Gemini 2.0 Flash API  
- @google/generative-ai  

### Analysis Technologies
- Signal Processing: DCT, FFT, Wavelets  
- Computer Vision: Optical Flow, Structure-from-Motion  
- Audio Processing: Spectral Analysis, Formant Extraction  
- Cryptography: SHA-256 Hashing  

---

## Performance Metrics

| Task | Average Time |
|----|----|
| Quick Scan | 2–5 seconds |
| Comprehensive Image | 8–15 seconds |
| Video (per minute) | 25–45 seconds |
| Live Stream Frame | <500 ms |
| Batch (10 files) | 60–120 seconds |

---

## System Requirements

### Minimum
- 4 GB RAM  
- Dual-core CPU  
- 500 MB storage  
- Modern browser (Chrome 90+, Firefox 88+, Safari 14+)  

### Recommended
- 8 GB+ RAM  
- Quad-core CPU  
- 2 GB storage  
- Webcam (for live mode)  
- GPU acceleration (optional)  

---

## API Response Format

```json
{
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
      "anomalies_detected": [],
      "verdict": "FAIL"
    }
  },
  "critical_findings": [],
  "recommendations": {}
}

