import { useState, useEffect } from 'react';
import robotImage from '@/assets/robot-assistant.png';

interface RobotAssistantProps {
  onNavToggle?: () => void;
}

export const RobotAssistant = ({ onNavToggle }: RobotAssistantProps) => {
  const [isWalking, setIsWalking] = useState(false);
  const [position, setPosition] = useState('idle');

  const handleRobotClick = () => {
    setIsWalking(true);
    setPosition('walking');
    if (onNavToggle) {
      onNavToggle();
    }
    
    setTimeout(() => {
      setIsWalking(false);
      setPosition('idle');
    }, 2000);
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <div
        className={`
          relative cursor-pointer transition-all duration-300 hover:scale-110
          ${isWalking ? 'animate-robot-walk' : 'animate-float'}
        `}
        onClick={handleRobotClick}
      >
        <img
          src={robotImage}
          alt="Robot Assistant"
          className="w-16 h-16 drop-shadow-lg hover:drop-shadow-xl"
        />
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-cyber-glow opacity-20 animate-glow-pulse" />
        
        {/* Speech bubble on hover */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-card border border-accent rounded-lg px-2 py-1 text-xs text-foreground whitespace-nowrap">
            Click me! 🤖
          </div>
          <div className="w-2 h-2 bg-card border-r border-b border-accent transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
        </div>
      </div>
    </div>
  );
};