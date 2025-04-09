
import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/ui/hero-section';
import SectionHeader from '@/components/ui/section-header';
import DataCard from '@/components/ui/data-card';
import { Button } from '@/components/ui/button';
import { FlaskConical, Leaf, PieChart, Droplets } from 'lucide-react';
import { toast } from 'sonner';

const FertilizerRecommendation = () => {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    crop_type: '',
    soil_type: '',
    moisture: ''
  });
  
  const [showResults, setShowResults] = useState(false);
  
  const cropOptions = [
    "Rice", "Wheat", "Maize", "Cotton", "Sugarcane",
    "Tomato", "Potato", "Onion", "Chili", "Soybean"
  ];
  
  const soilOptions = [
    "Clay", "Sandy", "Loamy", "Black", "Red", "Alluvial"
  ];
  
  // Simulated result - would be calculated by a ML model in a real app
  const fertilizerRecommendations = [
    {
      name: "NPK 10-26-26",
      suitability: 92,
      description: "Balanced fertilizer ideal for your crop's growth stage.",
      dosage: "250 kg/ha",
      applicationMethod: "Apply in bands 5-7 cm below and to the side of the seed.",
      costRange: "$45-55 per 50kg bag",
      benefits: [
        "Promotes root development",
        "Improves flowering and fruit setting",
        "Enhances overall plant vigor"
      ]
    },
    {
      name: "Urea",
      suitability: 85,
      description: "High nitrogen fertilizer to promote vegetative growth.",
      dosage: "150 kg/ha",
      applicationMethod: "Top dressing during vegetative growth stage.",
      costRange: "$30-40 per 50kg bag",
      benefits: [
        "Rapid nitrogen availability",
        "Promotes leafy growth",
        "Cost-effective nitrogen source"
      ]
    },
    {
      name: "DAP (18-46-0)",
      suitability: 78,
      description: "Phosphorus-rich fertilizer for seedling establishment.",
      dosage: "125 kg/ha",
      applicationMethod: "Broadcast and incorporate before planting.",
      costRange: "$50-60 per 50kg bag",
      benefits: [
        "Supports early growth and rooting",
        "Enhances energy transfer processes",
        "Improves drought resistance"
      ]
    }
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  return (
    <PageLayout>
      <HeroSection
        title="Fertilizer Recommendation"
        subtitle="Get customized fertilizer recommendations based on your soil composition and crop type"
        imageSrc="https://source.unsplash.com/photo-1469474968028-56623f02e42e"
        imageAlt="Field with tractor spreading fertilizer"
      />
      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="glass-card p-6 md:p-8">
            <SectionHeader 
              title="Input Your Soil & Crop Details"
              subtitle="Provide information about your soil characteristics and planned crop"
            />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Soil NPK Information */}
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
                
                {/* Crop and Soil Type Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Crop & Soil Details</h3>
                  
                  <div>
                    <label htmlFor="crop_type" className="block text-sm font-medium mb-1">Crop Type</label>
                    <select
                      id="crop_type"
                      name="crop_type"
                      value={formData.crop_type}
                      onChange={handleInputChange}
                      className="input-field w-full"
                    >
                      <option value="">Select a crop</option>
                      {cropOptions.map((crop) => (
                        <option key={crop} value={crop}>{crop}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="soil_type" className="block text-sm font-medium mb-1">Soil Type</label>
                    <select
                      id="soil_type"
                      name="soil_type"
                      value={formData.soil_type}
                      onChange={handleInputChange}
                      className="input-field w-full"
                    >
                      <option value="">Select soil type</option>
                      {soilOptions.map((soil) => (
                        <option key={soil} value={soil}>{soil}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="moisture" className="block text-sm font-medium mb-1">Soil Moisture (%)</label>
                    <input
                      type="number"
                      id="moisture"
                      name="moisture"
                      value={formData.moisture}
                      onChange={handleInputChange}
                      placeholder="e.g. 40"
                      min="0"
                      max="100"
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
              title="Your Fertilizer Recommendations"
              subtitle={`Based on your ${formData.crop_type} crop and soil analysis, here are the recommended fertilizers`}
              center
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <DataCard
                title="Nitrogen Status"
                value={Number(formData.nitrogen) < 30 ? "Low" : Number(formData.nitrogen) < 60 ? "Medium" : "High"}
                description={`${formData.nitrogen} mg/kg`}
                icon={<Leaf className="h-6 w-6 text-primary-600" />}
              />
              <DataCard
                title="Phosphorus Status"
                value={Number(formData.phosphorus) < 25 ? "Low" : Number(formData.phosphorus) < 50 ? "Medium" : "High"}
                description={`${formData.phosphorus} mg/kg`}
                icon={<PieChart className="h-6 w-6 text-accent-gold" />}
              />
              <DataCard
                title="Potassium Status"
                value={Number(formData.potassium) < 30 ? "Low" : Number(formData.potassium) < 60 ? "Medium" : "High"}
                description={`${formData.potassium} mg/kg`}
                icon={<Droplets className="h-6 w-6 text-accent-blue" />}
              />
            </div>
            
            <div className="space-y-8">
              {fertilizerRecommendations.map((fertilizer, index) => (
                <div key={index} className="glass-card p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/4">
                      <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg flex flex-col items-center justify-center h-full">
                        <FlaskConical className="h-10 w-10 text-primary-600 mb-2" />
                        <h3 className="text-xl font-semibold text-center">{fertilizer.name}</h3>
                        <div className="mt-2 text-center">
                          <div className="text-2xl font-bold text-primary-600">{fertilizer.suitability}%</div>
                          <div className="text-sm text-muted-foreground">Suitability</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-3/4">
                      <div className="space-y-4">
                        <p>{fertilizer.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Recommended Dosage</h4>
                            <p className="font-medium">{fertilizer.dosage}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Cost Range</h4>
                            <p className="font-medium">{fertilizer.costRange}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Application Method</h4>
                          <p>{fertilizer.applicationMethod}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Benefits</h4>
                          <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                            {fertilizer.benefits.map((benefit, i) => (
                              <li key={i}>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Additional Recommendations</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-3 mt-1">
                    <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p>Consider soil testing every 2-3 years to monitor nutrient levels and adjust fertilizer applications.</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1">
                    <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p>Split nitrogen applications to improve efficiency and reduce losses - apply 40% at planting and 60% during peak growth stage.</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1">
                    <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p>Consider adding organic matter to improve soil structure, water retention, and nutrient availability.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
};

export default FertilizerRecommendation;
