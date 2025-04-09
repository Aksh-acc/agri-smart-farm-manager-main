
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Check, Award, Zap, Star } from "lucide-react";
import { useRewards } from "@/contexts/RewardsContext";
import AnimatedIllustration from "@/components/ui/animated-illustration";

interface RewardDialogProps {
  open: boolean;
  onClose: () => void;
  tokensAwarded: number;
  imageContribution?: string; // URL of the contributed image
}

const RewardDialog = ({ 
  open, 
  onClose, 
  tokensAwarded,
  imageContribution
}: RewardDialogProps) => {
  const { addTokens } = useRewards();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (open) {
      // Add tokens to user's balance
      addTokens(tokensAwarded);
      
      // Trigger animation
      setIsAnimating(true);
      
      // Reset animation state after animation completes
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [open, tokensAwarded, addTokens]);

  const renderDecorations = () => (
    <>
      {/* Top left decoration */}
      <div className="absolute -top-2 -left-2 transform -translate-x-1/2 -translate-y-1/2">
        <AnimatedIllustration 
          icon={Star} 
          size={24} 
          color="#F9C80E" 
          animation="pulse" 
          withTrail={true}
        />
      </div>
      
      {/* Top right decoration */}
      <div className="absolute -top-2 -right-2 transform translate-x-1/2 -translate-y-1/2">
        <AnimatedIllustration 
          icon={Zap} 
          size={24} 
          color="#FF6B6B" 
          animation="rapid-float" 
        />
      </div>
      
      {/* Bottom decorations */}
      <div className="absolute -bottom-2 left-1/4 transform -translate-x-1/2 translate-y-1/2">
        <AnimatedIllustration 
          icon={Star} 
          size={20} 
          color="#4ECDC4" 
          animation="spin" 
        />
      </div>
      
      <div className="absolute -bottom-2 right-1/4 transform translate-x-1/2 translate-y-1/2">
        <AnimatedIllustration 
          icon={Star} 
          size={16} 
          color="#FFD166" 
          animation="leaf-sway" 
        />
      </div>
    </>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md relative overflow-hidden">
        {/* Background sparkle effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20"></div>
        
        {/* Decorative elements */}
        {renderDecorations()}
        
        <DialogHeader>
          <DialogTitle className="text-center text-2xl flex items-center justify-center gap-2">
            <span className="text-amber-500">
              <AnimatedIllustration 
                icon={Award} 
                size={28} 
                animation="pulse" 
                glowColor="#FFD166"
                glowIntensity="strong"
              />
            </span>
            Thank You for Your Contribution!
          </DialogTitle>
          <DialogDescription className="text-center">
            Your image will help us improve our disease detection system.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-6">
          <div className="relative mb-6 group">
            {imageContribution && (
              <>
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-amber-300 rounded-lg opacity-75 blur-lg group-hover:opacity-100 transition duration-500"></div>
                <img 
                  src={imageContribution} 
                  alt="Contributed image" 
                  className="relative w-40 h-40 object-cover rounded-lg shadow-md border-2 border-amber-200 dark:border-amber-700 transition-all duration-300 group-hover:scale-105"
                />
                <div className="absolute -right-2 -bottom-2 p-1 bg-white dark:bg-gray-800 rounded-full shadow-md border border-amber-200 dark:border-amber-700">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
              </>
            )}
          </div>
          
          <div className={`flex items-center justify-center gap-3 p-4 ${isAnimating ? 'animate-pulse-subtle' : ''}`}>
            <div className="relative">
              <AnimatedIllustration 
                icon={Sparkles} 
                size={36} 
                color="#F59E0B" 
                animation="shimmer" 
                className="text-amber-400"
                withTrail={true}
                glowIntensity="strong"
              />
            </div>
            <div>
              <p className="text-lg font-medium">You've earned</p>
              <div className="relative">
                <p className="text-3xl font-bold text-gradient bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
                  {tokensAwarded} AgriTokens
                </p>
                <div className="absolute inset-0 blur-sm bg-amber-300/30 -z-10 rounded-lg"></div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground text-center">
            <p>Tokens can be used to purchase items in our store.</p>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose} className="w-full relative overflow-hidden btn-glow bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 border-none">
            <div className="relative z-10 flex items-center justify-center">
              <Check className="h-4 w-4 mr-2" />
              Continue
            </div>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RewardDialog;
