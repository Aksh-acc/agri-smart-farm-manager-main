
import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/ui/hero-section';
import SectionHeader from '@/components/ui/section-header';
import BarChart from '@/components/ui/bar-chart';
import DataCard from '@/components/ui/data-card';
import { Button } from '@/components/ui/button';
import { Droplet, Sun, ThermometerSun, Sprout } from 'lucide-react';
import { toast } from 'sonner';

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    latitude: '',
    longitude: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    rainfall: '',
    temperature: '',
    humidity: '',
  });
  
  const [showResults, setShowResults] = useState(false);
  
  // Simulated result - would be calculated by a ML model in a real app
  const cropsScores = [
    { name: "Rice", score: 85 },
    { name: "Wheat", score: 70 },
    { name: "Maize", score: 65 },
    { name: "Sugarcane", score: 50 },
    { name: "Cotton", score: 35 }
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const requiredFields = Object.entries(formData);
    const emptyFields = requiredFields.filter(([_, value]) => value === '');
    
    if (emptyFields.length > 0) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Process form data - in a real app, this would call an API or ML model
    setTimeout(() => {
      setShowResults(true);
      toast.success('Analysis completed');
      
      // Scroll to results
      const resultsSection = document.getElementById('results');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000);
  };
  
  const chartData = cropsScores.map(crop => ({
    name: crop.name,
    score: crop.score,
  }));

  return (
    <PageLayout>
      <HeroSection
        title="Crop Recommendation"
        subtitle="Get AI-powered recommendations for the best crops to plant based on your soil and climate conditions"
        imageSrc="https://source.unsplash.com/photo-1518495973542-4542c06a5843"
        imageAlt="Field of crops at sunrise"
      />
      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="glass-card p-6 md:p-8">
            <SectionHeader 
              title="Input Your Farm Details"
              subtitle="Provide information about your location and soil characteristics"
            />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Location</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="latitude" className="block text-sm font-medium mb-1">Latitude</label>
                      <input
                        type="number"
                        id="latitude"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleInputChange}
                        placeholder="e.g. 28.6139"
                        step="0.0001"
                        className="input-field w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="longitude" className="block text-sm font-medium mb-1">Longitude</label>
                      <input
                        type="number"
                        id="longitude"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleInputChange}
                        placeholder="e.g. 77.2090"
                        step="0.0001"
                        className="input-field w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="temperature" className="block text-sm font-medium mb-1">Temperature (°C)</label>
                      <input
                        type="number"
                        id="temperature"
                        name="temperature"
                        value={formData.temperature}
                        onChange={handleInputChange}
                        placeholder="e.g. 24.5"
                        step="0.1"
                        className="input-field w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="humidity" className="block text-sm font-medium mb-1">Humidity (%)</label>
                      <input
                        type="number"
                        id="humidity"
                        name="humidity"
                        value={formData.humidity}
                        onChange={handleInputChange}
                        placeholder="e.g. 65"
                        min="0"
                        max="100"
                        className="input-field w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="rainfall" className="block text-sm font-medium mb-1">Annual Rainfall (mm)</label>
                    <input
                      type="number"
                      id="rainfall"
                      name="rainfall"
                      value={formData.rainfall}
                      onChange={handleInputChange}
                      placeholder="e.g. 800"
                      min="0"
                      className="input-field w-full"
                    />
                  </div>
                </div>
                
                {/* Soil Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Soil NPK Levels</h3>
                  
                  <div>
                    <label htmlFor="nitrogen" className="block text-sm font-medium mb-1">Nitrogen (mg/kg)</label>
                    <input
                      type="number"
                      id="nitrogen"
                      name="nitrogen"
                      value={formData.nitrogen}
                      onChange={handleInputChange}
                      placeholder="e.g. 40"
                      min="0"
                      className="input-field w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phosphorus" className="block text-sm font-medium mb-1">Phosphorus (mg/kg)</label>
                    <input
                      type="number"
                      id="phosphorus"
                      name="phosphorus"
                      value={formData.phosphorus}
                      onChange={handleInputChange}
                      placeholder="e.g. 50"
                      min="0"
                      className="input-field w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="potassium" className="block text-sm font-medium mb-1">Potassium (mg/kg)</label>
                    <input
                      type="number"
                      id="potassium"
                      name="potassium"
                      value={formData.potassium}
                      onChange={handleInputChange}
                      placeholder="e.g. 60"
                      min="0"
                      className="input-field w-full"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-8">
                <Button type="submit" className="bg-primary-600 hover:bg-primary-700 px-8">
                  Get Recommendations
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      {showResults && (
        <section id="results" className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Your Crop Recommendations"
              subtitle="Based on your soil and climate data, here are the best crops to plant"
              center
            />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <DataCard
                title="Best Recommended Crop"
                value="Rice"
                description="85% compatibility with your conditions"
                icon={<Sprout className="h-6 w-6 text-primary-600" />}
              />
              <DataCard
                title="Average Rainfall"
                value={`${formData.rainfall} mm`}
                icon={<Droplet className="h-6 w-6 text-accent-blue" />}
              />
              <DataCard
                title="Temperature"
                value={`${formData.temperature}°C`}
                icon={<ThermometerSun className="h-6 w-6 text-accent-gold" />}
              />
              <DataCard
                title="Humidity"
                value={`${formData.humidity}%`}
                icon={<Sun className="h-6 w-6 text-primary-600" />}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BarChart
                data={chartData}
                dataKey="score"
                bars={[
                  { dataKey: "score", fill: "#4caf50", name: "Compatibility Score" }
                ]}
                title="Crop Compatibility Scores"
                subtitle="Higher scores indicate better suitability for your conditions"
              />
              
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-4">Detailed Analysis</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-primary-700">Rice</h4>
                    <p className="text-muted-foreground mt-1">
                      Rice is highly compatible with your soil and climate conditions. With your current NPK levels and rainfall, you can expect good yields.
                    </p>
                    <div className="mt-3">
                      <div className="text-sm font-medium">Optimal Growing Conditions:</div>
                      <ul className="list-disc list-inside text-sm text-muted-foreground mt-1 space-y-1">
                        <li>Temperature: 20-35°C</li>
                        <li>Rainfall: 750-1000mm</li>
                        <li>Soil pH: 5.5-6.5</li>
                        <li>Growing season: 3-6 months</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-primary-700">Wheat</h4>
                    <p className="text-muted-foreground mt-1">
                      Wheat is also compatible with your conditions but may require additional potassium supplementation for optimal growth.
                    </p>
                    <div className="mt-3">
                      <div className="text-sm font-medium">Optimal Growing Conditions:</div>
                      <ul className="list-disc list-inside text-sm text-muted-foreground mt-1 space-y-1">
                        <li>Temperature: 15-24°C</li>
                        <li>Rainfall: 450-650mm</li>
                        <li>Soil pH: 6.0-7.0</li>
                        <li>Growing season: 4-5 months</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
};

export default CropRecommendation;
