
import { useState } from "react";
import { Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage } from "@/types/customer-service";
import { findFAQAnswer, isLiveChatAvailable } from "@/utils/customer-service";

interface BotChatSectionProps {
  showBotChat: boolean;
  setShowBotChat: (show: boolean) => void;
  setShowChat: (show: boolean) => void;
}

export function BotChatSection({ showBotChat, setShowBotChat, setShowChat }: BotChatSectionProps) {
  const [botMessages, setBotMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hi! I\'m your Target virtual assistant. I can help you with common questions about orders, returns, payments, and more. What can I help you with today?',
      sender: 'bot',
      timestamp: new Date(),
      options: ['Track my order', 'Return policy', 'Payment methods', 'Target Circle rewards']
    }
  ]);
  const [botInput, setBotInput] = useState('');
  const { toast } = useToast();

  const handleBotResponse = (userMessage: string) => {
    const faq = findFAQAnswer(userMessage);
    
    if (faq) {
      const botResponse: ChatMessage = {
        id: Date.now().toString(),
        text: faq.answer,
        sender: 'bot',
        timestamp: new Date(),
        options: ['Is this helpful?', 'I need more help', 'Start over']
      };
      setBotMessages(prev => [...prev, botResponse]);
    } else {
      const noAnswerResponse: ChatMessage = {
        id: Date.now().toString(),
        text: "I couldn't find a specific answer to your question in our Help Center. Would you like me to connect you with a live agent for personalized assistance?",
        sender: 'bot',
        timestamp: new Date(),
        options: isLiveChatAvailable() 
          ? ['Connect to live chat', 'Try different keywords', 'Browse FAQ topics']
          : ['Leave a message', 'Try different keywords', 'Browse FAQ topics']
      };
      setBotMessages(prev => [...prev, noAnswerResponse]);
    }
  };

  const handleBotOptionClick = (option: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: option,
      sender: 'user',
      timestamp: new Date()
    };
    setBotMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      if (option === 'Connect to live chat') {
        setShowBotChat(false);
        setShowChat(true);
        toast({
          title: "Connecting to Live Chat",
          description: "Transferring you to a live agent...",
        });
      } else if (option === 'Browse FAQ topics') {
        const topicsResponse: ChatMessage = {
          id: Date.now().toString(),
          text: 'Here are our most popular help topics:',
          sender: 'bot',
          timestamp: new Date(),
          options: ['Order tracking', 'Returns & exchanges', 'Payment issues', 'Account settings', 'Target Circle']
        };
        setBotMessages(prev => [...prev, topicsResponse]);
      } else if (option === 'Start over') {
        setBotMessages([{
          id: '1',
          text: 'Hi! I\'m your Target virtual assistant. I can help you with common questions about orders, returns, payments, and more. What can I help you with today?',
          sender: 'bot',
          timestamp: new Date(),
          options: ['Track my order', 'Return policy', 'Payment methods', 'Target Circle rewards']
        }]);
      } else {
        handleBotResponse(option);
      }
    }, 500);
  };

  const handleBotSubmit = () => {
    if (!botInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: botInput,
      sender: 'user',
      timestamp: new Date()
    };
    setBotMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      handleBotResponse(botInput);
    }, 500);

    setBotInput('');
  };

  const startBotChat = () => {
    setShowBotChat(true);
  };

  return (
    <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <Bot className="w-6 h-6 text-purple-600" />
        <div>
          <h4 className="font-medium">Help Center Assistant</h4>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            24/7 Available
          </Badge>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-3">
        Get instant answers from our FAQ and Help Center
      </p>
      <Dialog open={showBotChat} onOpenChange={setShowBotChat}>
        <DialogTrigger asChild>
          <Button onClick={startBotChat} className="w-full" variant="outline">
            Start Help Assistant
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Help Center Assistant</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="h-64 bg-gray-50 rounded p-4 overflow-y-auto">
              <div className="space-y-3">
                {botMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-3 py-2 rounded-lg max-w-xs ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-purple-100 text-purple-900'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      {message.options && (
                        <div className="mt-2 space-y-1">
                          {message.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleBotOptionClick(option)}
                              className="block w-full text-left text-xs px-2 py-1 bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition-colors"
                            >
                              <ArrowRight className="w-3 h-3 inline mr-1" />
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Ask a question..." 
                value={botInput}
                onChange={(e) => setBotInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleBotSubmit()}
                className="flex-1 px-3 py-2 border rounded-lg"
              />
              <Button size="sm" onClick={handleBotSubmit}>Send</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
