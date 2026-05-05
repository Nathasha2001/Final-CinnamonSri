import { Platform } from "react-native";
import Constants from "expo-constants";

/**
 * Backend URL notes:
 * - Android Emulator -> use 10.0.2.2 to reach your computer's localhost
 * - iOS Simulator -> localhost works
 * - Physical device -> use your computer's LAN IP (same Wi‑Fi)
 * 
 * Configure in .env.local file:
 * EXPO_PUBLIC_API_HOST=your-ip-or-localhost
 * EXPO_PUBLIC_API_PORT=8000
 */
const API_HOST = process.env.EXPO_PUBLIC_API_HOST || "localhost";
const API_PORT = process.env.EXPO_PUBLIC_API_PORT || "8000";
const BASE_URL = `http://${API_HOST}:${API_PORT}`;
const FETCH_TIMEOUT = 30000; // 30 seconds timeout - increased for network latency

// ===== Timeout Helper =====
async function fetchWithTimeout(url: string, options?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  
  try {
    console.log(`[API] Fetching ${url} (timeout: ${FETCH_TIMEOUT}ms)`);
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    console.log(`[API] Response received: ${response.status} ${response.statusText}`);
    return response;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error(`[API] Request timeout after ${FETCH_TIMEOUT}ms for ${url}`);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export type FarmerMoistureMode = "weights" | "moisture_tool";

export interface TemperatureReadingInput {
  day: number;
  temp_8am: number;
  temp_12pm: number;
  temp_6pm: number;
}

// ===== Unified /predict (FastAPI) =====
export interface CinnOraclePredictRequest {
  user_type: "farmer" | "large_scale";
  weight_before_drying_kg?: number | null;
  weight_after_drying_kg?: number | null;
  moisture_percentage?: number | null;
  farmer_moisture_mode?: FarmerMoistureMode | null;
  diameter_mm: number;
  drying_days: number;
  temperature_readings: TemperatureReadingInput[];
  color: string;
  visual_mould: "Yes" | "No";
  district: string;
  harvest_quantity_kg: number;
}

export interface CinnOracleCalculatedValues {
  estimated_moisture_percentage: number | null;
  avg_temp_8am_c: number;
  avg_temp_12pm_c: number;
  avg_temp_6pm_c: number;
  overall_average_temperature_c: number;
}

export interface CinnOraclePredictResponse {
  predicted_grade: string;
  farmer_scale: string;
  predicted_price_per_kg: number;
  harvest_quantity_kg: number;
  estimated_total_income: number;
  district: string;
  calculated_values: CinnOracleCalculatedValues;
  recommended_marketplaces: string[];
}

async function readFastApiError(response: Response): Promise<string> {
  try {
    const data: any = await response.json();
    if (data?.detail) {
      if (typeof data.detail === "string") return data.detail;
      if (Array.isArray(data.detail) && data.detail[0]?.msg) {
        return String(data.detail[0].msg);
      }
    }
  } catch {
    // ignore
  }
  return `Request failed (${response.status})`;
}

// ===== Price Prediction Interfaces =====
export interface PriceInput {
  quality_grade: string;
  district?: string;
  weight_loss_percent?: number;
  harvest_date?: string;
  quality_level?: string;
  standard_grade?: string;
  weight_before?: number;
  weight_after?: number;
  temperature?: number;
  batch_id?: string;
}

export interface PricePredictionResponse {
  price: number;
  currency: string;
  quality_grade: string;
  district: string;
  quality_level?: string;
  standard_grade?: string;
  market_suggestions?: { name: string; description: string }[];
  reason?: string;
  message: string;
}

// ===== Prediction History Interfaces =====
export interface PredictionRecord {
  _id: string;
  batch_id?: string | null;
  user_type?: "Farmer Level" | "Large Scale" | string;
  farmer_moisture_mode?: "weights" | "moisture_tool" | string | null;
  moisture_percentage?: number | null;
  weight_before: number;
  weight_after: number;
  temperature: number;
  temperature_readings?: { day: number; temp_8am: number; temp_12pm: number; temp_6pm: number }[] | null;
  district: string;
  harvest_date?: string | null;
  drying_days?: number | null;
  color?: string | null;
  visual_mould?: string | null;
  quality_level?: string | null;
  standard_grade?: string | null;
  predicted_quality: string;
  predicted_standard_grade: string;
  weight_loss_percent: number;
  estimated_price?: number | null;
  estimated_total_income?: number | null;
  harvest_quantity_kg?: number | null;
  currency: string;
  market_suggestions?: { name: string; description?: string }[] | null;
  reason?: string | null;
  created_at: string;
  updated_at: string;
}

export interface PredictionHistoryResponse {
  predictions: PredictionRecord[];
  count: number;
}

// ===== Grades Interfaces =====
export interface GradeCharacteristics {
  code: string;
  name: string;
  description: string;
  characteristics: string[];
}

export interface QualityLevelDetails {
  price_range: string;
  market: string;
  temperature_range: string;
  weight_loss_range: string;
}

export interface GradesResponse {
  grades: GradeCharacteristics[];
  quality_levels: {
    [key: string]: QualityLevelDetails;
  };
}

// ===== Health Check =====
export async function checkHealth() {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/health`);
    if (!response.ok) {
      return false;
    }
    const data = await response.json();
    return data.status === "ok";
  } catch (error) {
    console.error("Health check failed:", error);
    return false;
  }
}

// ===== Unified prediction API =====
export async function predictCinnOracle(
  input: CinnOraclePredictRequest
): Promise<CinnOraclePredictResponse> {
  const response = await fetchWithTimeout(`${BASE_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const msg = await readFastApiError(response);
    throw new Error(msg);
  }

  return await response.json();
}

// ===== Price Prediction API =====
export async function predictPrice(input: PriceInput): Promise<PricePredictionResponse> {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/predict-price`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`Price prediction failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Price prediction error:", error);
    throw error;
  }
}

// ===== Grades Information API =====
export async function getGrades(): Promise<GradesResponse> {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/grades`);

    if (!response.ok) {
      throw new Error(`Failed to fetch grades: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Grades fetch error:", error);
    throw error;
  }
}

// ===== Prediction History API =====
export const getPredictions = async (limit = 100, offset = 0) => {
  const response = await fetch(`${BASE_URL}/history`);

  if (!response.ok) {
    throw new Error(`Failed to fetch prediction history: ${response.status}`);
  }

  return await response.json();
};
// ===== Delete Prediction API =====
export async function deletePrediction(id: string): Promise<void> {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/predictions/${id}`, {
      method: "DELETE",
    });

    if (!response.ok && response.status !== 204) {
      throw new Error(`Failed to delete prediction: ${response.status}`);
    }
  } catch (error) {
    console.error("Prediction delete error:", error);
    throw error;
  }
}

// Back-compat alias (older screen code)
export const predictQuality = predictCinnOracle;
export const predictQualityAndPrice = predictCinnOracle;
