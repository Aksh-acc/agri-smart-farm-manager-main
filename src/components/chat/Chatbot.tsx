
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Globe, Languages, Loader2, MessageSquare, Headphones } from 'lucide-react';
import { useChat, type ChatMessage, supportedLanguages } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import ExpertConsultation from './ExpertConsultation';

const Chatbot = () => {
  const { 
    messages, // Ensure messages is destructured from useChat context
    addMessage, 
    isChatOpen, 
    setChatOpen, 
    clearMessages, 
    isLoading, 
    currentLanguage, 
    setCurrentLanguage 
  } = useChat();
  
  const [inputValue, setInputValue] = useState('');
  const [showExpertConsultation, setShowExpertConsultation] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<string>('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      // Add welcome message based on selected language
      const welcomeMessage = currentLanguage.code === 'en'
        ? "Hello! I'm your AgriWise assistant. How can I help you today with farming advice?"
        : `नमस्ते! मैं आपका एग्रीवाइज़ सहायक हूँ। आज मैं आपकी कृषि सलाह के साथ कैसे मदद कर सकता हूँ?`;
      
      addMessage('assistant', welcomeMessage);
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus textarea when chat opens
  useEffect(() => {
    if (isChatOpen && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 300);
    }
  }, [isChatOpen]);
    
  useEffect(() => {
    // In a real implementation, you would call your BharatGPT or Corover.ai API here
    // For now, simulate a delayed response
    setTimeout(() => {
      const responses = {
        en: "Thank you for your question. I'll help you with farming advice. Please provide more details about your specific farming needs.",
        hi: "आपके प्रश्न के लिए धन्यवाद। मैं आपको खेती की सलाह के साथ मदद करूंगा। कृपया अपनी विशिष्ट खेती की जरूरतों के बारे में अधिक विवरण प्रदान करें।",
        bn: "আপনার প্রশ্নের জন্য ধন্যবাদ। আমি আপনাকে কৃষি পরামর্শ দিয়ে সাহায্য করব। দয়া করে আপনার নির্দিষ্ট কৃষি প্রয়োজনের বিষয়ে আরও বিবরণ দিন।",
        te: "మీ ప్రశ్నకు ధన్యవాదాలు. నేను మీకు వ్యవసాయ సలహాతో సహాయపడతాను. దయచేసి మీ నిర్దిష్ట వ్యవసాయ అవసరాల గురించి మరిన్ని వివరాలను అందించండి.",
      };
      
      // Use the response in the current language or default to English
      const responseText = responses[currentLanguage.code as keyof typeof responses] || responses.en;
      addMessage('assistant', responseText);
    }, 1000);
  }, [currentLanguage]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
  
    const userMessage = inputValue.trim();
    addMessage('user', userMessage);
    setInputValue('');
  
    try {
      const prompt = `You are an agriculture assistant. Reply in ${currentLanguage.name}. Here's the query:\n${userMessage}`;
  
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
  
      addMessage('assistant', data.reply || '🤖 No response received.');
    } catch (err) {
      console.error('Groq API error:', err);
      addMessage('assistant', '❌ Failed to connect to assistant.');
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };  

  if (typeof isChatOpen === 'undefined' || !isChatOpen) return null;
  function handleEscalateToExpert(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    setShowExpertConsultation(true);
    setSelectedQuery(inputValue.trim());
    setInputValue('');
  } return (
    <>
      <Card className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 shadow-xl border-2 overflow-hidden flex flex-col max-h-[600px] h-[70vh]">
        {/* Chat header */}
        <div className="bg-primary-600 text-white p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquareIcon />
            <span className="font-medium">AgriWise Assistant</span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector 
              currentLanguage={currentLanguage}
              setCurrentLanguage={setCurrentLanguage}
            />
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary-700 text-primary-100 hover:text-white"
              onClick={() => setChatOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Chat messages */}
        <ScrollArea className="flex-1 p-3 bg-muted/30">
          <div className="space-y-3">
            {messages.map((message) => (
              <ChatMessageBubble key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center justify-center p-2">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>
        </ScrollArea>

        {/* Expert consultation button */}
        <div className="border-t pt-2 px-3">
          <Button
            variant="outline"
            size="sm"
            className="text-xs w-full flex items-center gap-1.5 bg-muted/50 hover:bg-muted"
            onClick={handleEscalateToExpert}
          >
            <Headphones className="h-3.5 w-3.5" />
            <span>
              {currentLanguage.code === 'en' 
                ? "Connect with Expert or Watch Tutorials" 
                : "विशेषज्ञ से जुड़ें या ट्यूटोरियल देखें"}
            </span>
          </Button>
        </div>

        {/* Input area */}
        <div className="border-t p-3">
          <div className="flex items-end gap-2">
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={currentLanguage.code === 'en' 
                ? "Type your question..." 
                : "अपना प्रश्न लिखें..."}
              className="min-h-[60px] max-h-[120px] resize-none"
              rows={1}
            />
            <Button 
              onClick={handleSendMessage} 
              size="icon"
              disabled={inputValue.trim() === ''}
              className="bg-primary-600 hover:bg-primary-700 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Expert consultation dialog */}
      <ExpertConsultation
        isOpen={showExpertConsultation}
        onClose={() => setShowExpertConsultation(false)}
        queryDescription={selectedQuery}
      />
    </>
  );
};

// Language selector component
const LanguageSelector = ({ 
  currentLanguage, 
  setCurrentLanguage 
}: { 
  currentLanguage: { code: string; name: string; nativeName: string }; 
  setCurrentLanguage: (lang: { code: string; name: string; nativeName: string }) => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-primary-700 text-primary-100 hover:text-white">
          <Languages className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-2" side="top">
        <div className="space-y-1">
          <p className="text-xs font-medium pb-1 text-muted-foreground">Select language / भाषा चुनें</p>
          {supportedLanguages.map((language) => (
            <button
              key={language.code}
              onClick={() => setCurrentLanguage(language)}
              className={cn(
                "w-full text-left px-2 py-1 text-sm rounded-md hover:bg-muted flex items-center justify-between",
                currentLanguage.code === language.code && "bg-primary/10 text-primary font-medium"
              )}
            >
              <span>{language.nativeName}</span>
              {currentLanguage.code === language.code && (
                <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

// Message bubble component
const ChatMessageBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      "flex items-start gap-2",
      isUser ? "flex-row-reverse" : ""
    )}>
      <Avatar className={cn(
        "rounded-full h-8 w-8",
        isUser ? "bg-primary-600" : "bg-accent-gold"
      )}>
        {isUser ? 'U' : 'A'}
      </Avatar>
      
      <div className={cn(
        "rounded-lg px-3 py-2 max-w-[80%] text-sm",
        isUser 
          ? "bg-primary-600 text-white"
          : "bg-muted text-foreground"
      )}>
        <p>{message.content}</p>
        <span className="text-[10px] opacity-70 mt-1 inline-block">
          {format(message.timestamp, 'h:mm a')}
        </span>
      </div>
    </div>
  );
};

// Custom MessageSquare icon with different styling
const MessageSquareIcon = () => (
  <div className="relative">
    <MessageSquare className="h-5 w-5" />
    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-500" />
  </div>
);

export default Chatbot;

