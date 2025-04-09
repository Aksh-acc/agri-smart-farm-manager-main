
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CropRecommendation from "./pages/CropRecommendation";
import FertilizerRecommendation from "./pages/FertilizerRecommendation";
import DiseaseDetection from "./pages/DiseaseDetection";
import TokenStore from "./pages/TokenStore";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState } from "react";
import { RewardsProvider } from "./contexts/RewardsContext";
import { ChatProvider } from "./contexts/ChatContext";
import ChatbotButton from "./components/chat/ChatbotButton";
import Chatbot from "./components/chat/Chatbot";

const App = () => {
  // Create a new QueryClient instance within the component
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RewardsProvider>
          <ChatProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/crop-recommendation" element={<CropRecommendation />} />
                <Route path="/fertilizer-recommendation" element={<FertilizerRecommendation />} />
                <Route path="/disease-detection" element={<DiseaseDetection />} />
                <Route path="/token-store" element={<TokenStore />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              {/* Chatbot components */}
              <ChatbotButton />
              <Chatbot />
            </TooltipProvider>
          </ChatProvider>
        </RewardsProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
