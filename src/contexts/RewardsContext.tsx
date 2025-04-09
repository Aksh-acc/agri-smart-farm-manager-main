
import React, { createContext, useContext, useState, useEffect } from 'react';

type RewardsContextType = {
  tokens: number;
  addTokens: (amount: number) => void;
  useTokens: (amount: number) => boolean;
};

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

export const RewardsProvider = ({ children }: { children: React.ReactNode }) => {
  const [tokens, setTokens] = useState<number>(0);
  
  // Load tokens from localStorage on mount
  useEffect(() => {
    const savedTokens = localStorage.getItem('agriwise-reward-tokens');
    if (savedTokens) {
      setTokens(parseInt(savedTokens, 10));
    }
  }, []);
  
  // Save tokens to localStorage on change
  useEffect(() => {
    localStorage.setItem('agriwise-reward-tokens', tokens.toString());
  }, [tokens]);
  
  const addTokens = (amount: number) => {
    setTokens(current => current + amount);
  };
  
  const useTokens = (amount: number) => {
    if (tokens >= amount) {
      setTokens(current => current - amount);
      return true;
    }
    return false;
  };
  
  return (
    <RewardsContext.Provider value={{ tokens, addTokens, useTokens }}>
      {children}
    </RewardsContext.Provider>
  );
};

export const useRewards = () => {
  const context = useContext(RewardsContext);
  if (context === undefined) {
    throw new Error('useRewards must be used within a RewardsProvider');
  }
  return context;
};
