
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChatbotButtonProps {
  className?: string;
}

const ChatbotButton = ({ className }: ChatbotButtonProps) => {
  const { toggleChat, isChatOpen } = useChat();
  
  return (
    <Button
      onClick={toggleChat}
      size="icon"
      variant={isChatOpen ? "default" : "secondary"}
      className={cn(
        "rounded-full shadow-lg fixed bottom-6 right-6 z-50 h-14 w-14",
        isChatOpen && "bg-primary-600 hover:bg-primary-700",
        className
      )}
      aria-label="Toggle chat assistant"
    >
      <MessageSquare className={cn(
        "h-6 w-6",
        isChatOpen && "text-white"
      )} />
    </Button>
  );
};

export default ChatbotButton;
