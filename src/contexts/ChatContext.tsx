
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define message types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Define language options
export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}

export const supportedLanguages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
];

interface ChatContextType {
  messages: ChatMessage[];
  addMessage: (role: 'user' | 'assistant', content: string) => void;
  clearMessages: () => void;
  isChatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  isLoading: boolean;
  currentLanguage: LanguageOption;
  setCurrentLanguage: (language: LanguageOption) => void;
  toggleChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isChatOpen, setChatOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageOption>(supportedLanguages[0]);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('agriwise-chat-history');
    const savedLanguage = localStorage.getItem('agriwise-chat-language');
    
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert string dates back to Date objects
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
      } catch (error) {
        console.error('Error parsing saved chat messages:', error);
      }
    }
    
    if (savedLanguage) {
      try {
        const language = JSON.parse(savedLanguage);
        setCurrentLanguage(language);
      } catch (error) {
        console.error('Error parsing saved language:', error);
      }
    }
  }, []);

  // Save chat history to localStorage on change
  useEffect(() => {
    localStorage.setItem('agriwise-chat-history', JSON.stringify(messages));
  }, [messages]);
  
  // Save language preference to localStorage on change
  useEffect(() => {
    localStorage.setItem('agriwise-chat-language', JSON.stringify(currentLanguage));
  }, [currentLanguage]);

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
  };
  
  const toggleChat = () => {
    setChatOpen(prev => !prev);
  };

  const value = {
    messages,
    addMessage,
    clearMessages,
    isChatOpen,
    setChatOpen,
    isLoading,
    currentLanguage,
    setCurrentLanguage,
    toggleChat
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
