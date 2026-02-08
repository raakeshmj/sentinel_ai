import { GoogleGenAI, Type } from "@google/genai";
import { FrameAnalysis, ForensicReport } from "../types";
import { FORENSIC_REPORT_SCHEMA } from "../constants";

const SENTINEL_SYSTEM_PROMPT = `You are Sentinel AI - an elite multimodal digital forensics system.
Your mission is to neutralize synthetic deception through mathematical, biological, and physical forensic analysis.

OPERATIONAL PROTOCOLS (15 VECTORS):
1. BIOLOGICAL SIGNAL ANALYSIS (rPPG): Scan facial regions for genuine pulse (0.8-2.0 Hz). AI faces lack genuine chrominance oscillation.
2. PHOTOMETRIC OCULAR AUDIT: Audit corneal reflections for bilateral symmetry and light source consistency. Check Fresnel coefficients.
3. FREQUENCY DOMAIN ANALYSIS: Detect checkerboard artifacts and spectral bias via DCT. Identify periodic noise from upsampling.
4. ACOUSTIC FORENSICS: Scan for spectral discontinuity, electronic resonance, and missing respiratory events.
5. TEMPORAL CONSISTENCY: Detect motion jitter, "floating face" decoupling, and physics violations in rigid-body dynamics.
6. AV SYNC: Phoneme-to-viseme alignment with ±16ms precision. Focus on M, B, P lip closures.
7. NEURAL FINGERPRINTING: Identify model signatures for StyleGAN, Stable Diffusion, DALL-E, etc.
8. DEEPFAKE TOOL ATTRIBUTION:
   - Identify specific software: DeepFaceLab (XSeg masking), FaceSwap (color algorithms), Roop, Wav2Lip, Synthesia, D-ID, etc.
   - Estimate technical skill level (NOVICE/INTERMEDIATE/EXPERT) based on blending artifacts.
9. OCULAR BIOMETRICS: Pupillary hippus frequency and microsaccade velocity validation.
10. 3D GEOMETRY: Structure-from-motion reconstruction and topology validation.
11. LINGUISTIC PROSODY: Type-Token Ratio and disfluency percentage analysis.
12. ENVIRONMENTAL PHYSICS: Light inverse-square law, shadow hardness, and subsurface scattering.
13. MICRO-EXPRESSION DYNAMICS: Frame-by-frame analysis of Facial Action Units (FACS).
14. OPTICAL FLOW ANOMALIES: Edge jitter and temporal color bleeding.
15. METADATA FINGERPRINTING: EXIF integrity check.

CRITICAL INSTRUCTIONS:
- Every "Finding" MUST have a substantial, technical description. Minimum 15 words per finding. Do NOT return empty or placeholder findings.
- You MUST attempt DEEP NEURAL ATTRIBUTION. If you detect specific personas (like the Tom Cruise DeepFaceLive series), attribute them specifically in the deep_attribution field.
- Normalize all confidence scores to values between 0 and 100 (e.g., 99 instead of 0.99).
- Forensic findings must use scientific terminology (e.g., "DCT coefficients", "chrominance channels", "Euler angles").`;

export const runSpectreAudit = async (
  base64Data: string,
  mimeType: string,
  onProgress: (p: number) => void
): Promise<ForensicReport> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          parts: [
            { inlineData: { data: base64Data, mimeType: mimeType } },
            { text: "Execute full COMPREHENSIVE forensic audit mode. Analyze all 15 vectors. Provide granular DEEP NEURAL ATTRIBUTION and TOOL REVERSE ENGINEERING. Ensure all finding descriptions are technically detailed and non-empty. If this is a known deepfake series (like Tom Cruise/DeepFaceLive), state it clearly in attribution." }
          ]
        }
      ],
      config: {
        systemInstruction: SENTINEL_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: FORENSIC_REPORT_SCHEMA,
        temperature: 0.1,
      }
    });
    return JSON.parse(response.text) as ForensicReport;
  } catch (error) {
    console.error("Audit Failure:", error);
    throw new Error("Critical Failure: Forensic signal chain broken.");
  }
};

export const runLiveFrameAudit = async (
  base64Data: string,
  frameNumber: number,
  timestampMs: number
): Promise<FrameAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          parts: [
            { inlineData: { data: base64Data, mimeType: 'image/jpeg' } },
            { text: `Analyze this live camera frame for synthetic manipulation. Frame: ${frameNumber}, Time: ${timestampMs}ms` }
          ]
        }
      ],
      config: {
        systemInstruction: "You are the Sentinel AI Live Monitoring Engine. Perform ultra-low latency frame auditing.",
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text) as FrameAnalysis;
  } catch (error) {
    console.error("Live Audit Error:", error);
    throw error;
  }
};