
import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface AnimatedIllustrationProps extends HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  size?: number;
  color?: string;
  className?: string;
  animation?: 'float' | 'pulse' | 'bounce' | 'spin' | 'leaf-sway' | 'grow' | 'fade-pulse' | 'shimmer' | 
              'rapid-float' | 'slow-float' | 'rotate-slow' | 'water-ripple' | 'sun-rays' | 'cloud-float' |
              'plant-grow' | '3d-rotate' | 'soil-scatter' | 'data-pulse';
  glowColor?: string;
  glowIntensity?: 'light' | 'medium' | 'strong';
  withTrail?: boolean;
  interactive?: boolean;
}

const AnimatedIllustration = ({
  icon: Icon,
  size = 80,
  color = 'currentColor',
  className,
  animation = 'float',
  glowColor,
  glowIntensity = 'medium',
  withTrail = false,
  interactive = false,
  ...props
}: AnimatedIllustrationProps) => {
  const illustrationRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  // Track mouse movement for interactive illustrations
  useEffect(() => {
    if (!interactive) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!illustrationRef.current) return;
      
      const rect = illustrationRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      setPosition({ 
        x: x * 0.1, 
        y: y * 0.1 
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  useEffect(() => {
    const el = illustrationRef.current;
    if (!el) return;

    // Add animation classes based on the animation type
    if (animation === 'float') {
      el.classList.add('animate-subtle-float');
    } else if (animation === 'rapid-float') {
      el.classList.add('animate-rapid-float');
    } else if (animation === 'slow-float') {
      el.classList.add('animate-slow-float');
    } else if (animation === 'pulse') {
      el.classList.add('animate-pulse-subtle');
    } else if (animation === 'bounce') {
      el.classList.add('animate-bounce');
    } else if (animation === 'spin') {
      el.classList.add('animate-spin-slow');
    } else if (animation === 'leaf-sway') {
      el.classList.add('animate-leaf-sway');
    } else if (animation === 'grow') {
      el.classList.add('animate-grow');
    } else if (animation === 'fade-pulse') {
      el.classList.add('animate-fade-pulse');
    } else if (animation === 'shimmer') {
      el.classList.add('animate-shimmer');
    } else if (animation === 'rotate-slow') {
      el.classList.add('animate-rotate-slow');
    } else if (animation === 'water-ripple') {
      el.classList.add('water-ripple');
    } else if (animation === 'sun-rays') {
      el.classList.add('sun-rays');
    } else if (animation === 'cloud-float') {
      el.classList.add('cloud-float');
    } else if (animation === 'plant-grow') {
      el.classList.add('plant-grow');
    } else if (animation === '3d-rotate') {
      el.classList.add('rotate-3d');
    } else if (animation === 'soil-scatter') {
      // Soil scatter has dynamic elements added in the render method
    } else if (animation === 'data-pulse') {
      el.classList.add('animate-pulse-subtle');
    }

    return () => {
      // Remove all animation classes when component unmounts
      el.classList.remove(
        'animate-subtle-float', 'animate-rapid-float', 'animate-slow-float',
        'animate-pulse-subtle', 'animate-bounce', 'animate-spin-slow',
        'animate-leaf-sway', 'animate-grow', 'animate-fade-pulse',
        'animate-shimmer', 'animate-rotate-slow', 'water-ripple',
        'sun-rays', 'cloud-float', 'plant-grow', 'rotate-3d'
      );
    };
  }, [animation]);

  // Calculate glow opacity based on intensity
  const getGlowOpacity = () => {
    switch (glowIntensity) {
      case 'light':
        return 'opacity-20';
      case 'medium':
        return 'opacity-30';
      case 'strong':
        return 'opacity-40';
      default:
        return 'opacity-30';
    }
  };

  // Generate multiple trail elements for certain animation types
  const renderTrail = () => {
    if (!withTrail) return null;
    
    const trailCount = 3;
    const trails = [];
    
    for (let i = 0; i < trailCount; i++) {
      const delay = i * 0.2;
      const opacity = 0.7 - (i * 0.2);
      const scale = 1 - (i * 0.1);
      
      trails.push(
        <div 
          key={i}
          className="absolute inset-0 z-0"
          style={{
            opacity,
            transform: `scale(${scale})`,
            animation: `${animation === 'float' ? 'float' : 
                        animation === 'rapid-float' ? 'float' : 
                        animation === 'slow-float' ? 'float' : 
                        animation === 'leaf-sway' ? 'leaf-sway' : 'pulse-subtle'} 
                      6s ease-in-out infinite`,
            animationDelay: `${delay}s`
          }}
        >
          <Icon size={size} color={color} />
        </div>
      );
    }
    
    return trails;
  };
  
  const renderSoilParticles = () => {
    if (animation !== 'soil-scatter') return null;
    
    const particles = [];
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
      const size = 2 + Math.random() * 3;
      const angle = (Math.PI * 2 / particleCount) * i;
      const radius = 20 + Math.random() * 10;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const delay = Math.random() * 2;
      
      particles.push(
        <div
          key={i}
          className="absolute rounded-full bg-amber-800"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: '50%',
            top: '50%',
            opacity: 0.6 + Math.random() * 0.4,
            transform: `translate(${x}px, ${y}px)`,
            animation: `float ${2 + Math.random()}s infinite ease-in-out`,
            animationDelay: `${delay}s`
          }}
        />
      );
    }
    
    return particles;
  };
  
  const renderDataPoints = () => {
    if (animation !== 'data-pulse') return null;
    
    const dataPoints = [];
    const pointCount = 5;
    
    for (let i = 0; i < pointCount; i++) {
      const size = 3 + Math.random() * 3;
      const radius = 15 + (i * 5);
      const angle = (Math.PI * 2 / pointCount) * i + (Math.random() * 0.5);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const delay = i * 0.3;
      
      dataPoints.push(
        <div
          key={i}
          className={`absolute rounded-full bg-primary-${400 + i*100}`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: '50%',
            top: '50%',
            opacity: 0.4 + (i * 0.1),
            transform: `translate(${x}px, ${y}px)`,
            animation: `pulse-subtle ${1.5 + Math.random()}s infinite ease-in-out`,
            animationDelay: `${delay}s`
          }}
        />
      );
    }
    
    return dataPoints;
  };

  return (
    <div
      ref={illustrationRef}
      className={cn(
        'relative select-none', 
        interactive && 'cursor-pointer hover:scale-105 transition-transform duration-200',
        className
      )}
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={interactive ? {
        transform: `perspective(1000px) rotateX(${position.y}deg) rotateY(${position.x}deg) ${hover ? 'scale(1.05)' : ''}`,
        transition: 'transform 0.1s ease'
      } : {}}
      {...props}
    >
      {withTrail && renderTrail()}
      {renderSoilParticles()}
      {renderDataPoints()}
      
      <div className={cn(
        'relative z-10',
        animation === 'pulse' && 'animate-pulse-subtle',
        animation === 'float' && 'animate-subtle-float',
        animation === 'rapid-float' && 'animate-rapid-float',
        animation === 'slow-float' && 'animate-slow-float',
        animation === 'bounce' && 'animate-bounce',
        animation === 'spin' && 'animate-spin-slow',
        animation === 'leaf-sway' && 'animate-leaf-sway',
        animation === 'grow' && 'animate-grow',
        animation === 'fade-pulse' && 'animate-fade-pulse',
        animation === 'shimmer' && 'animate-shimmer',
        animation === 'rotate-slow' && 'animate-rotate-slow',
        animation === 'water-ripple' && 'water-ripple',
        animation === 'sun-rays' && 'sun-rays',
        animation === 'cloud-float' && 'cloud-float',
        animation === 'plant-grow' && 'plant-grow',
        animation === '3d-rotate' && 'rotate-3d',
      )}>
        <Icon size={size} color={color} />
      </div>
      
      {/* Glow effect */}
      <div 
        className={cn(
          "absolute inset-0 rounded-full blur-lg -z-10 scale-75", 
          getGlowOpacity()
        )}
        style={{ 
          backgroundColor: glowColor || (color !== 'currentColor' ? color : '#4caf50'),
          filter: `blur(${size / 4}px)`
        }}
      ></div>
      
      {/* Interactive hover ring effect */}
      {interactive && hover && (
        <div 
          className="absolute inset-0 -z-5 rounded-full animate-pulse-subtle"
          style={{
            border: `2px solid ${color}`,
            transform: 'scale(1.1)',
          }}
        ></div>
      )}
    </div>
  );
};

export default AnimatedIllustration;
