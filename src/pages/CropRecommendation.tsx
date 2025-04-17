import React, { useState } from "react";
import axios from "axios";

interface CropRecommendation {
  name: string;
  confidence: number;
}

interface WeatherResponse {
  main?: {
    temp?: number;
    humidity?: number;
  };
  rain?: {
    "1h"?: number;
    "3h"?: number;
  };
}

const CropRecommendation: React.FC = () => {
  const [location, setLocation] = useState("");
  const [N, setN] = useState("");
  const [P, setP] = useState("");
  const [K, setK] = useState("");
  const [ph, setPh] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Fetch weather data
      const weatherRes = await axios.get<WeatherResponse>(
        "https://weather-api167.p.rapidapi.com/api/weather/current",
        {
          params: {
            place: `${location},IN`,
            units: "standard",
            lang: "en",
            mode: "json"
          },
          headers: {
            "x-rapidapi-host": "weather-api167.p.rapidapi.com",
            "x-rapidapi-key": "145a14219bmsh3bf2721a56f82edp17e541jsn973514e1d06f",
            Accept: "application/json"
          }
        }
      );

      const { main, rain } = weatherRes.data;
      const temperature = main?.temp ?? 25;
      const humidity = main?.humidity ?? 50;
      const rainfall = rain?.["1h"] ?? rain?.["3h"] ?? 50;

      const input = {
        N: Number(N) || 0,
        P: Number(P) || 0,
        K: Number(K) || 0,
        ph: Number(ph) || 6.5,
        temperature,
        humidity,
        rainfall
      };

      console.log("🌾 Sanitized Input:", input);

      // Predict crops
      const response = await axios.post<{ top_crops: CropRecommendation[] }>(
        "http://localhost:8001/predict",
        input
      );

      setRecommendations(response.data.top_crops || []);
    } catch (error) {
      console.error("❌ Prediction failed:", error);
      alert("Prediction failed. Check your input or try again later.");
    }

    setIsLoading(false);
  };

  const InputField = ({
    label,
    value,
    onChange,
    type = "number"
  }: {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
  }) => (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={label}
      className="p-2 rounded bg-gray-800 text-white"
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="bg-gray-950 shadow-md py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-400">🌾 SmartAgri - Crop Recommender</h1>
      </header>
  
      {/* Main Card */}
      <main className="flex justify-center items-center py-10 px-4">
        <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-3xl w-full space-y-6">
          <h2 className="text-2xl font-semibold text-center text-white mb-4">🧪 Enter Field Data</h2>
  
          {/* Location */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Jaipur"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-500 mt-1">Used for fetching weather data automatically.</p>
          </div>
  
          {/* Inputs for NPK + pH */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ label: "Nitrogen (N)", state: N, setState: setN },
              { label: "Phosphorus (P)", state: P, setState: setP },
              { label: "Potassium (K)", state: K, setState: setK },
              { label: "pH Level", state: ph, setState: setPh }
            ].map(({ label, state, setState }) => (
              <div key={label}>
                <label className="block text-sm text-gray-400 mb-1">{label}</label>
                <input
                  type="number"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder={label}
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            ))}
          </div>
  
          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 transition-all duration-200 rounded-lg font-semibold text-white disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                  </svg>
                  Predicting...
                </span>
              ) : (
                "Get Crop Recommendation"
              )}
            </button>
          </div>
  
          {/* Results */}
          {recommendations.length > 0 && (
            <div className="bg-gray-800 p-6 rounded-xl shadow-inner">
              <h3 className="text-lg font-semibold text-green-400 mb-3">🌱 Top Recommended Crops</h3>
              <ul className="space-y-2">
                {recommendations.map((crop, idx) => (
                  <li key={idx} className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="capitalize font-medium">{crop.name}</span>
                    <span className="text-green-400">{(crop.confidence * 100).toFixed(2)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}  

export default CropRecommendation;
