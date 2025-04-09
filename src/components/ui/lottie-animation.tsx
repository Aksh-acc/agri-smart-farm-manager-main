
import React, { useEffect, useRef } from 'react';

interface LottieAnimationProps {
  src: string;
  width?: string | number;
  height?: string | number;
  speed?: number;
  loop?: boolean;
  autoplay?: boolean;
  background?: string;
  className?: string;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  src,
  width = 300,
  height = 300,
  speed = 1,
  loop = true,
  autoplay = true,
  background = "transparent",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const player = document.createElement('dotlottie-player');
    
    player.setAttribute('src', src);
    player.setAttribute('background', background);
    player.setAttribute('speed', speed.toString());
    
    if (typeof width === 'number') {
      player.style.width = `${width}px`;
    } else {
      player.style.width = width;
    }
    
    if (typeof height === 'number') {
      player.style.height = `${height}px`;
    } else {
      player.style.height = height;
    }
    
    if (loop) {
      player.setAttribute('loop', '');
    }
    
    if (autoplay) {
      player.setAttribute('autoplay', '');
    }
    
    // Clear the container and append the player
    if (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current.appendChild(player);

    return () => {
      if (containerRef.current && containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
    };
  }, [src, width, height, speed, loop, autoplay, background]);

  return <div ref={containerRef} className={className} />;
};

export default LottieAnimation;
