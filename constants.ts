import { Type } from "@google/genai";

export const FORENSIC_REPORT_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    analysis_metadata: {
      type: Type.OBJECT,
      properties: {
        spectre_version: { type: Type.STRING },
        analysis_mode: { type: Type.STRING },
        timestamp_utc: { type: Type.STRING },
        processing_time_ms: { type: Type.NUMBER },
        media_type: { type: Type.STRING },
        file_hash_sha256: { type: Type.STRING },
      },
      required: ["spectre_version", "timestamp_utc", "media_type"]
    },
    overall_assessment: {
      type: Type.OBJECT,
      properties: {
        verdict: { type: Type.STRING },
        confidence_score: { type: Type.NUMBER },
        bayesian_posterior: { type: Type.NUMBER },
        credible_interval_95: { type: Type.ARRAY, items: { type: Type.NUMBER } },
        entropy_bits: { type: Type.NUMBER },
        confidence_level: { type: Type.STRING },
      },
      required: ["verdict", "confidence_score", "bayesian_posterior", "confidence_level"]
    },
    forensic_vectors: {
      type: Type.OBJECT,
      properties: {
        biological_rppg: { type: Type.OBJECT, properties: { executed: { type: Type.BOOLEAN }, verdict: { type: Type.STRING }, confidence_score: { type: Type.NUMBER }, heart_rate_estimate: { type: Type.NUMBER } } },
        neural_fingerprint: { 
          type: Type.OBJECT, 
          properties: { 
            executed: { type: Type.BOOLEAN }, 
            detected_architecture: { type: Type.STRING }, 
            confidence_score: { type: Type.NUMBER },
            signature_evidence: { type: Type.ARRAY, items: { type: Type.STRING } },
            deep_attribution: {
              type: Type.OBJECT,
              properties: {
                stylegan_details: {
                  type: Type.OBJECT,
                  properties: {
                    version: { type: Type.STRING },
                    dataset: { type: Type.STRING },
                    iterations: { type: Type.STRING },
                    resolution: { type: Type.STRING },
                    truncation_psi: { type: Type.NUMBER },
                    fine_tuned: { type: Type.BOOLEAN }
                  }
                },
                stable_diffusion_details: {
                  type: Type.OBJECT,
                  properties: {
                    version: { type: Type.STRING },
                    checkpoint_match: { type: Type.STRING },
                    vae: { type: Type.STRING },
                    sampler: { type: Type.STRING },
                    steps: { type: Type.NUMBER },
                    cfg_scale: { type: Type.NUMBER }
                  }
                },
                threat_intelligence: {
                  type: Type.OBJECT,
                  properties: {
                    malicious_match: { type: Type.BOOLEAN },
                    known_campaigns: { type: Type.ARRAY, items: { type: Type.STRING } },
                    darknet_tool_association: { type: Type.STRING }
                  }
                }
              }
            }
          } 
        },
        tool_attribution: {
          type: Type.OBJECT,
          properties: {
            detected_tool: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            version_estimate: { type: Type.STRING },
            skill_level: { type: Type.STRING },
            evidence: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        },
        ocular_biometrics: { type: Type.OBJECT, properties: { executed: { type: Type.BOOLEAN }, hippus_frequency_hz: { type: Type.NUMBER }, saccade_velocity_deg_per_sec: { type: Type.NUMBER }, verdict: { type: Type.STRING } } },
        geometric_3d: { type: Type.OBJECT, properties: { executed: { type: Type.BOOLEAN }, reconstruction_success: { type: Type.BOOLEAN }, depth_consistency_score: { type: Type.NUMBER }, verdict: { type: Type.STRING } } },
        linguistic_prosody: { type: Type.OBJECT, properties: { executed: { type: Type.BOOLEAN }, type_token_ratio: { type: Type.NUMBER }, prosody_naturalness: { type: Type.NUMBER }, verdict: { type: Type.STRING } } },
        chain_of_custody: { 
          type: Type.OBJECT, 
          properties: { 
            analysis_hash_sha256: { type: Type.STRING },
            timestamp_utc: { type: Type.STRING }
          } 
        }
      }
    },
    critical_findings: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          finding_id: { type: Type.NUMBER },
          severity: { type: Type.STRING },
          category: { type: Type.STRING },
          description: { type: Type.STRING },
          evidence_coordinates: { type: Type.STRING },
          supporting_modules: { type: Type.ARRAY, items: { type: Type.NUMBER } }
        }
      }
    },
    forensic_report_summary: {
      type: Type.OBJECT,
      properties: {
        executive_summary: { type: Type.STRING },
        technical_summary: { type: Type.STRING },
        legal_admissibility: { type: Type.STRING }
      }
    }
  },
  required: ["analysis_metadata", "overall_assessment", "critical_findings", "forensic_report_summary"]
};