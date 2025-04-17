import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react"; // Optional loader icon

const cropOptions = [ "Barley", "Cotton", "Ground Nuts", "Maize", "Millets", "Oil seeds",
  "Paddy", "Pulses", "Sugarcane", "Tobacco", "Wheat",
  "coffee", "kidneybeans", "orange", "pomegranate", "rice", "watermelon" ];
const soilOptions = [ "Black", "Clayey", "Loamy", "Red", "Sandy" ];
const fertilizerDescriptions: Record<string, string> = { 
  "Urea": "A nitrogen-rich fertilizer used to promote leafy growth.",
  "DAP": "Di-Ammonium Phosphate, excellent for root development and early growth.",
  "MOP": "Muriate of Potash, provides potassium to improve disease resistance.",
  "SSP": "Single Super Phosphate, good for phosphorus and sulfur supply.",
  "Ammonium Sulphate": "Rich in nitrogen and sulfur, helps in overall growth.",
  "Magnesium Sulphate": "Boosts chlorophyll production and helps in photosynthesis.",
  "White Potash": "Potassium-based fertilizer to enhance water retention.",
  "Hydrated Lime": "Helps to raise soil pH and reduce soil acidity.",
  "Sulphur": "Improves nitrogen use efficiency and supports protein synthesis.",
  "Ferrous Sulphate": "Provides iron, vital for chlorophyll formation.",
  "Chilated Micronutrient": "Contains trace minerals like zinc, boron, etc.",
  "10:26:26 NPK": "Balanced NPK fertilizer ideal for root development.",
  "12:32:16 NPK": "High phosphorus fertilizer for flowering and fruiting.",
  "13:32:26 NPK": "Promotes early growth and strong root systems.",
  "18:46:00 NPK": "Phosphorus-heavy fertilizer for early stage support.",
  "19:19:19 NPK": "Fully balanced for overall plant health.",
  "20:20:20 NPK": "Universal use across crops, balanced nutrients.",
  "50:26:26 NPK": "High potassium formula for fruiting stages."
 };

const FertilizerRecommendation: React.FC = () => {
  const [location, setLocation] = useState("");
  const [N, setN] = useState("");
  const [P, setP] = useState("");
  const [K, setK] = useState("");
  const [moisture, setMoisture] = useState("");
  const [soilType, setSoilType] = useState("");
  const [cropType, setCropType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedFertilizer, setRecommendedFertilizer] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const weatherRes = await axios.get(
        `https://weather-api167.p.rapidapi.com/api/weather/current`,
        {
          params: { place: `${location},IN`, units: "standard", lang: "en", mode: "json" },
          headers: {
            "x-rapidapi-host": "weather-api167.p.rapidapi.com",
            "x-rapidapi-key": "145a14219bmsh3bf2721a56f82edp17e541jsn973514e1d06f",
            Accept: "application/json"
          }
        }
      );

      const weatherData = (weatherRes.data as { main: { temp?: number; humidity?: number } })?.main ?? { temp: 25, humidity: 50 };
      const temperature = weatherData.temp ?? 25;
      const humidity = weatherData.humidity ?? 50;

      const input = {
        Soil_Type: soilType,
        Crop_Type: cropType,
        Nitrogen: Number(N),
        Phosphorous: Number(P),
        Potassium: Number(K),
        Moisture: Number(moisture),
        Humidity: humidity,
        Temparature: temperature,
      };

      const response = await axios.post<{ recommended_fertilizer: string }>(
        "http://localhost:8000/predict",
        input
      );

      setRecommendedFertilizer(response.data.recommended_fertilizer);
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Failed to fetch fertilizer recommendation.");
    }
    setIsLoading(false);
  };

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-black via-gray-900 to-black text-white rounded-xl shadow-2xl max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-green-400">🌾 Fertilizer Recommendation for Farmers</h1>

      <div className="space-y-5">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your location (e.g., Jaipur)"
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ label: "Nitrogen (N)", val: N, set: setN },
            { label: "Phosphorous (P)", val: P, set: setP },
            { label: "Potassium (K)", val: K, set: setK },
            { label: "Moisture %", val: moisture, set: setMoisture }
          ].map(({ label, val, set }) => (
            <input
              key={label}
              type="number"
              value={val}
              onChange={(e) => set(e.target.value)}
              placeholder={label}
              className="p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
          >
            <option value="">Select Soil Type</option>
            {soilOptions.map((soil) => (
              <option key={soil} value={soil}>{soil}</option>
            ))}
          </select>

          <select
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
          >
            <option value="">Select Crop Type</option>
            {cropOptions.map((crop) => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="mt-4 w-full md:w-fit px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 justify-center transition"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              Predicting...
            </>
          ) : (
            <>🔍 Get Recommendation</>
          )}
        </button>

        {recommendedFertilizer && (
          <div className="mt-8 p-6 rounded-lg bg-green-950 border border-green-600 shadow-lg">
            <h2 className="text-2xl font-bold text-green-400">✅ Recommended Fertilizer</h2>
            <p className="text-2xl mt-2 text-green-300">{recommendedFertilizer}</p>
            <p className="text-gray-300 mt-4 text-sm">
              {fertilizerDescriptions[recommendedFertilizer] || "No description available."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FertilizerRecommendation;
