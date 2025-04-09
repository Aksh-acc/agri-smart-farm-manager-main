
import React from 'react';
import LottieAnimation from './lottie-animation';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullScreen?: boolean;
  message?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  fullScreen = false,
  message,
  className,
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { width: 100, height: 100 };
      case 'md':
        return { width: 150, height: 150 };
      case 'lg':
        return { width: 200, height: 200 };
      case 'xl':
        return { width: 300, height: 300 };
      default:
        return { width: 150, height: 150 };
    }
  };

  const { width, height } = getSizeStyles();

  const containerClass = cn(
    'flex flex-col items-center justify-center',
    fullScreen ? 'fixed inset-0 bg-background/80 backdrop-blur-sm z-50' : '',
    className
  );

  return (
    <div className={containerClass}>
      <LottieAnimation
        src="https://lottie.host/5db57ffb-cce4-49d2-8c93-13932048b244/qctRbXqBj1.lottie"
        width={width}
        height={height}
        speed={1}
        loop={true}
        autoplay={true}
      />
      {message && <p className="mt-4 text-muted-foreground text-center">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
