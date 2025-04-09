import { ReactNode, useEffect, useState, useRef } from 'react';
import { Cloud, Sun, Tractor, Wind } from 'lucide-react';
import AnimatedIllustration from './animated-illustration';
import { cn } from '@/lib/utils';
import { Seedling } from '@/components/utils/icons';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  backgroundPattern?: 'default' | 'leaves' | 'crops' | 'soil' | 'landscape' | 'tech';
  backgroundOverlay?: boolean;
  imageGlow?: boolean;
  animationType?: 'default' | 'farm' | 'tech' | 'growth';
}

const HeroSection = ({
  title,
  subtitle,
  children,
  imageSrc,
  imageAlt = "Hero image",
  className = "",
  backgroundPattern = 'default',
  backgroundOverlay = false,
  imageGlow = true,
  animationType = 'default'
}: HeroSectionProps) => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        setScrollY(window.scrollY);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const getBackgroundPattern = () => {
    switch (backgroundPattern) {
      case 'leaves':
        return 'pattern-bg-leaves';
      case 'crops':
        return 'pattern-bg-crops';
      case 'soil':
        return 'pattern-bg-soil';
      case 'landscape':
        return 'bg-gradient-to-b from-primary-50 via-background to-muted/50 dark:from-primary-950/20 dark:via-background dark:to-muted/50';
      case 'tech':
        return 'bg-gradient-to-r from-accent-blue/10 to-primary-600/10';
      default:
        return 'pattern-bg';
    }
  };

  const renderFarmAnimations = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sun */}
      <div className="absolute top-10 right-20 animate-pulse-subtle" 
           style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
        <AnimatedIllustration
          icon={Sun}
          size={60}
          color="#F97316"
          animation="sun-rays"
          glowColor="#F97316"
          glowIntensity="strong"
        />
      </div>
      
      {/* Clouds */}
      <div className="absolute top-16 left-10"
           style={{ transform: `translateX(${scrollY * 0.15}px)` }}>
        <AnimatedIllustration
          icon={Cloud}
          size={50}
          color="#94A3B8"
          animation="cloud-float"
        />
      </div>
      <div className="absolute top-24 right-40"
           style={{ transform: `translateX(${-scrollY * 0.1}px)` }}>
        <AnimatedIllustration
          icon={Cloud}
          size={40}
          color="#CBD5E1"
          animation="cloud-float"
        />
      </div>
      
      {/* Tractor */}
      <div className="absolute bottom-10 left-0 z-20"
           style={{ transform: `translateX(${scrollY * 0.2}px)` }}>
        <AnimatedIllustration
          icon={Tractor}
          size={40}
          color="#422006"
          animation="slow-float"
        />
      </div>
      
      {/* Plants/crops - replacing Plant with Seedling */}
      <div className="absolute bottom-20 left-1/4">
        <AnimatedIllustration
          icon={Seedling}
          size={30}
          color="#4CAF50"
          animation="grow"
          className="plant-grow"
        />
      </div>
      <div className="absolute bottom-16 left-1/3">
        <AnimatedIllustration
          icon={Seedling}
          size={35}
          color="#2E7D32"
          animation="leaf-sway"
        />
      </div>
      <div className="absolute bottom-18 right-1/4">
        <AnimatedIllustration
          icon={Seedling}
          size={25}
          color="#388E3C"
          animation="plant-grow"
        />
      </div>
      
      {/* Wind */}
      <div className="absolute top-1/2 right-10">
        <AnimatedIllustration
          icon={Wind}
          size={30}
          color="#94A3B8"
          animation="leaf-sway"
        />
      </div>
    </div>
  );
  
  const renderTechAnimations = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Data points floating */}
      <div className="absolute flex space-x-12 top-1/4 left-0 right-0" 
           style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i}
            className={`h-2 w-2 rounded-full bg-primary-${300 + i*100} opacity-${30 + i*10} animate-pulse-subtle`}
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 grid grid-cols-6 gap-8 opacity-10">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="h-full w-px bg-primary-400 transform" 
               style={{ 
                 transform: `translateX(${scrollY * 0.02 * (i % 2 === 0 ? 1 : -1)}px)`,
                 opacity: 0.05 + (i * 0.01)
               }}
          ></div>
        ))}
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="w-full h-px bg-primary-400" 
               style={{ 
                 top: `${(i+1) * 16.6}%`,
                 position: 'absolute',
                 transform: `translateY(${scrollY * 0.02 * (i % 2 === 0 ? 1 : -1)}px)`,
                 opacity: 0.05 + (i * 0.01)
               }}
          ></div>
        ))}
      </div>
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {Array(10).fill(0).map((_, i) => (
          <div 
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-primary-500 opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
  
  const renderGrowthAnimations = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sun rays */}
      <div className="absolute top-10 right-10 sun-rays"
           style={{ transform: `translateY(${scrollY * 0.08}px)` }}>
        <div className="h-20 w-20 rounded-full bg-amber-400 opacity-20 blur-lg"></div>
      </div>
      
      {/* Water droplets */}
      <div className="absolute left-1/4 top-1/4 rain-container"
           style={{ transform: `translateY(${scrollY * 0.12}px)` }}>
        {Array(3).fill(0).map((_, i) => (
          <div 
            key={i} 
            className="absolute raindrop" 
            style={{
              left: `${i * 10}px`,
              animation: `rain-fall ${1 + Math.random()}s infinite linear`,
              animationDelay: `${i * 0.3}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Growing plants */}
      <div className="absolute bottom-0 left-1/3 w-full">
        <div className="relative">
          <div className="absolute bottom-0 left-0 w-1 h-16 bg-green-800 growth-animation"></div>
          <div className="absolute bottom-16 left-0 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-green-500 growth-animation leaf-flutter"></div>
          <div className="absolute bottom-18 left-1 transform -translate-x-1/2 w-3 h-3 rotate-[135deg] bg-green-400 growth-animation leaf-flutter"></div>
        </div>
        
        <div className="relative" style={{ left: '40px' }}>
          <div className="absolute bottom-0 left-0 w-1 h-24 bg-green-800 growth-animation" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-24 left-0 transform -translate-x-1/2 w-6 h-6 rotate-45 bg-green-500 growth-animation leaf-flutter" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-26 left-1 transform -translate-x-1/2 w-5 h-5 rotate-[135deg] bg-green-400 growth-animation leaf-flutter" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>
      
      {/* Soil particles */}
      <div className="absolute bottom-0 w-full h-10">
        {Array(8).fill(0).map((_, i) => (
          <div 
            key={i} 
            className="absolute soil-particle" 
            style={{
              bottom: `${Math.random() * 10}px`,
              left: `${Math.random() * 100}%`,
              opacity: 0.3 + (Math.random() * 0.4)
            }}
          ></div>
        ))}
      </div>
    </div>
  );

  const renderAnimationsByType = () => {
    switch (animationType) {
      case 'farm':
        return renderFarmAnimations();
      case 'tech':
        return renderTechAnimations();
      case 'growth':
        return renderGrowthAnimations();
      default:
        return null;
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={cn(
        `py-16 md:py-24 relative overflow-hidden ${className} ${getBackgroundPattern()}`,
        animationType !== 'default' && 'min-h-[500px]'
      )}
    >
      {backgroundOverlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 z-0"></div>
      )}
      
      {renderAnimationsByType()}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className={cn(
            "flex-1 text-center lg:text-left",
            animationType !== 'default' && 'lg:backdrop-blur-sm lg:bg-background/30 lg:p-8 lg:rounded-xl'
          )}>
            <div className="relative">
              {/* Animated decorative elements */}
              <div className="absolute -left-8 -top-8 opacity-10 animate-spin-slow hidden lg:block">
                <svg width="60" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path d="M50 20v-15" stroke="currentColor" strokeWidth="4" />
                  <path d="M50 95v-15" stroke="currentColor" strokeWidth="4" />
                  <path d="M20 50h-15" stroke="currentColor" strokeWidth="4" />
                  <path d="M95 50h-15" stroke="currentColor" strokeWidth="4" />
                </svg>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight relative animate-fade-in">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600">
                  {title}
                </span>
                <div className="absolute -right-4 bottom-0 opacity-20 animate-pulse-subtle hidden lg:block">
                  <svg width="20" height="20" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="15,0 18.5,11 30,11 21,17.5 24.5,28.5 15,22 5.5,28.5 9,17.5 0,11 11.5,11" fill="currentColor"/>
                  </svg>
                </div>
              </h1>
              
              {subtitle && (
                <p className="text-lg md:text-xl text-muted-foreground mb-6 relative animate-fade-pulse">
                  {subtitle}
                  <div className="absolute -left-4 bottom-0 opacity-20 animate-leaf-sway hidden lg:block">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22V12" stroke="currentColor" strokeWidth="2"/>
                      <path d="M4 16C4 13.6 5 10 12 10C19 10 20 13.6 20 16" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 10C10.5 7.5 7 1 3 3C7 5 9.5 8 12 10Z" fill="currentColor"/>
                      <path d="M12 10C13.5 7.5 17 1 21 3C17 5 14.5 8 12 10Z" fill="currentColor"/>
                    </svg>
                  </div>
                </p>
              )}
              
              {children}
            </div>
          </div>

          {imageSrc && (
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative">
                {imageGlow && (
                <div className="absolute -inset-1.5 bg-gradient-to-r from-primary-300 to-accent-blue rounded-2xl blur-xl opacity-30 animate-pulse-subtle"></div>
                )}
                <div className="relative">
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="relative rounded-xl w-full max-w-md object-cover shadow-lg animate-subtle-float"
                    style={{ transform: `translateY(${-scrollY * 0.05}px)` }}
                  />
                  
                  {/* Parallax floating elements */}
                  <div className="absolute -top-8 -right-8 opacity-70 parallax" 
                       style={{ transform: `translate(${scrollY * 0.02}px, ${-scrollY * 0.03}px)` }}>
                    <div className="h-16 w-16 rounded-full bg-primary-200/20 backdrop-blur-sm"></div>
                  </div>
                  <div className="absolute -bottom-4 -left-4 opacity-70 parallax"
                       style={{ transform: `translate(${-scrollY * 0.03}px, ${scrollY * 0.02}px)` }}>
                    <div className="h-12 w-12 rounded-full bg-accent-blue/20 backdrop-blur-sm"></div>
                  </div>
                </div>
                
                {/* Decorative elements around the image */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-primary-500 opacity-70 rounded-tl-lg glint"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-primary-500 opacity-70 rounded-br-lg glint"></div>
                <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 bg-primary-500 opacity-70 rounded-full animate-pulse-subtle"></div>
                <div className="absolute top-1/3 -left-2 transform -translate-y-1/2 w-3 h-3 bg-accent-blue opacity-70 rounded-full animate-pulse-subtle" style={{ animationDelay: "0.5s" }}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
