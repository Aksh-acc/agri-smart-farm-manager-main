
import React from 'react';
import { Separator } from './separator';
import LottieAnimation from './lottie-animation';

interface LottieSeparatorProps {
  src?: string;
  height?: number;
  className?: string;
}

const LottieSeparator: React.FC<LottieSeparatorProps> = ({
  src = "https://lottie.host/5db57ffb-cce4-49d2-8c93-13932048b244/qctRbXqBj1.lottie",
  height = 80,
  className,
}) => {
  return (
    <div className="relative w-full flex justify-center items-center my-8">
      <Separator className="absolute w-full" />
      <div className="z-10 bg-background px-4">
        <LottieAnimation
          src={src}
          width="100%"
          height={height}
          speed={1}
          loop={true}
          autoplay={true}
          className={className}
        />
      </div>
    </div>
  );
};

export default LottieSeparator;
