
import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/ui/hero-section';
import SectionHeader from '@/components/ui/section-header';
import FileUpload from '@/components/ui/file-upload';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, Check, Info, ExternalLink, Upload, Gift } from 'lucide-react';
import { toast } from 'sonner';
import RewardDialog from '@/components/ui/reward-dialog';

const DiseaseDetection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [isContributing, setIsContributing] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [contributedImage, setContributedImage] = useState<string | null>(null);
  
  // Simulated result - would be calculated by a ML model in a real app
  const diseaseResult = {
    diseaseName: "Late Blight",
    confidence: 94.8,
    crop: "Potato",
    severity: "High",
    description: "Late blight is a serious disease that affects potatoes and tomatoes. It is caused by the fungus-like organism Phytophthora infestans. It can destroy a crop within days under favorable conditions.",
    symptoms: [
      "Water-soaked dark green or black lesions on leaves, stems, and tubers",
      "White fungal growth on the underside of leaves",
      "Rapidly spreading lesions that turn brown and crisp in dry conditions",
      "Distinct odor from affected plants"
    ],
    treatmentMethods: [
      "Remove and destroy all infected plant parts",
      "Apply fungicide treatments containing copper or mancozeb",
      "Improve air circulation around plants",
      "Reduce overhead irrigation",
      "Practice crop rotation with non-host plants"
    ],
    preventionMethods: [
      "Use certified disease-free seed potatoes",
      "Plant resistant varieties when available",
      "Avoid overhead irrigation",
      "Space plants adequately for good air circulation",
      "Apply preventative fungicides during periods of high risk"
    ],
    resources: [
      { name: "Agricultural Extension Office", url: "https://extension.org" },
      { name: "Plant Disease Diagnostic Clinic", url: "https://plantclinic.org" },
      { name: "Organic Control Methods", url: "https://organic-farming.org" }
    ]
  };
  
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleAnalysis = () => {
    if (!selectedFile) {
      toast.error("Please select an image to analyze");
      return;
    }
    
    setAnalyzing(true);
    toast.info("Analyzing your plant image...");
    
    // Simulated API call delay - would be a real ML model API call in production
    setTimeout(() => {
      setAnalyzing(false);
      setShowResults(true);
      toast.success("Analysis completed");
      
      // Scroll to results
      const resultsSection = document.getElementById("results");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 2000);
  };

  const handleContributeImage = () => {
    if (!selectedFile) {
      toast.error("Please select an image to contribute");
      return;
    }
    
    setIsContributing(true);
    toast.info("Submitting your image contribution...");
    
    // Simulate upload and processing
    setTimeout(() => {
      setIsContributing(false);
      if (preview) {
        setContributedImage(preview);
        setShowReward(true);
      }
      toast.success("Image contribution successful!");
    }, 1500);
  };

  return (
    <PageLayout>
      <HeroSection
        title="Plant Disease Detection"
        subtitle="Upload images of your crops to identify diseases and get treatment recommendations"
        imageSrc="https://source.unsplash.com/photo-1465146344425-f00d5f5c8f07"
        imageAlt="Close up of plant leaves"
      />
      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="glass-card p-6 md:p-8">
            <SectionHeader 
              title="Upload Plant Image"
              subtitle="Upload a clear photo of the affected part of your plant for analysis"
            />
            
            <div className="max-w-2xl mx-auto">
              <FileUpload 
                onFileSelect={handleFileSelect}
                accept="image/*"
                maxSize={10} 
                label="Upload a clear image of your plant"
              />
              
              <div className="flex justify-center mt-8 gap-4 flex-wrap">
                <Button 
                  onClick={handleAnalysis}
                  disabled={!selectedFile || analyzing} 
                  className="bg-primary-600 hover:bg-primary-700 px-8"
                >
                  {analyzing ? "Analyzing..." : "Detect Disease"}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleContributeImage}
                  disabled={!selectedFile || isContributing}
                  className="gap-2"
                >
                  {isContributing ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Gift className="h-4 w-4" />
                      Contribute Image & Earn Tokens
                    </>
                  )}
                </Button>
              </div>
              
              <div className="mt-6 p-4 border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 rounded-md">
                <h4 className="flex items-center text-amber-700 dark:text-amber-400 font-medium mb-2">
                  <Gift className="h-4 w-4 mr-2" />
                  Earn AgriTokens by Contributing Images
                </h4>
                <p className="text-sm text-amber-600 dark:text-amber-300">
                  Your images help train our AI. If your contribution is unique and useful, 
                  you'll earn 5-15 tokens that can be redeemed for fertilizers and other products in our store.
                </p>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-3">For best results:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-muted-foreground">
                    <Check className="h-5 w-5 mr-2 text-primary-600" />
                    Take a close-up photograph of the affected area.
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <Check className="h-5 w-5 mr-2 text-primary-600" />
                    Ensure good lighting to show the symptoms clearly.
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <Check className="h-5 w-5 mr-2 text-primary-600" />
                    Include both affected and healthy parts for comparison.
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <Check className="h-5 w-5 mr-2 text-primary-600" />
                    Remove any debris or water droplets from the plant before taking photos.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {showResults && (
        <section id="results" className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Disease Detection Results"
              subtitle="Analysis of your plant image and recommended treatments"
              center
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div>
                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold mb-4">Uploaded Image</h3>
                  {preview && (
                    <img 
                      src={preview} 
                      alt="Uploaded plant"
                      className="w-full h-auto rounded-md shadow-sm"
                    />
                  )}
                  
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Confidence Score</span>
                      <span className="text-sm font-bold text-primary-600">{diseaseResult.confidence}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${diseaseResult.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-md">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-primary-600 mr-2" />
                      <span className="font-medium">Disease Detection</span>
                    </div>
                    {diseaseResult.severity === "High" ? (
                      <div className="flex items-center text-amber-600">
                        <AlertTriangle className="h-5 w-5 mr-1" />
                        <span className="font-medium">High Severity</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-green-600">
                        <Check className="h-5 w-5 mr-1" />
                        <span className="font-medium">Moderate Severity</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="glass-card p-6">
                  <div className="flex items-center mb-6">
                    <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-full mr-4">
                      <Shield className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold">{diseaseResult.diseaseName}</h3>
                      <p className="text-muted-foreground">Affecting {diseaseResult.crop}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <p>{diseaseResult.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium mb-2">Symptoms</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {diseaseResult.symptoms.map((symptom, index) => (
                          <li key={index}>{symptom}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium mb-2">Treatment Methods</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {diseaseResult.treatmentMethods.map((method, index) => (
                          <li key={index}>{method}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium mb-2">Prevention</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {diseaseResult.preventionMethods.map((method, index) => (
                          <li key={index}>{method}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-2 border-t border-border">
                      <h4 className="text-lg font-medium mb-2">Additional Resources</h4>
                      <div className="space-y-2">
                        {diseaseResult.resources.map((resource, index) => (
                          <a
                            key={index}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            {resource.name}
                          </a>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-md border-l-4 border-amber-500">
                      <Info className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                      <p className="text-sm text-amber-800 dark:text-amber-300">
                        This analysis is for informational purposes only. For severe cases, please consult with a local agricultural extension agent or plant pathologist.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Reward Dialog */}
      <RewardDialog 
        open={showReward}
        onClose={() => setShowReward(false)}
        tokensAwarded={10}
        imageContribution={contributedImage || undefined}
      />
    </PageLayout>
  );
};

export default DiseaseDetection;
