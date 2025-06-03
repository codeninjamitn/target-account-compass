
import { useState } from "react";
import { MessageCircle, Phone, Bot, Shield, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  options?: string[];
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How can I track my order?',
    answer: 'You can track your order by going to "My Orders" in your account or using your order confirmation email. Enter your order number to see real-time tracking updates.',
    keywords: ['track', 'order', 'tracking', 'status', 'delivery', 'shipping']
  },
  {
    id: '2',
    question: 'What is your return policy?',
    answer: 'You can return most items within 90 days of purchase with a receipt. Items must be in original condition. Some exclusions apply for electronics and personal care items.',
    keywords: ['return', 'refund', 'exchange', 'policy', 'receipt']
  },
  {
    id: '3',
    question: 'How do I use my Target Circle rewards?',
    answer: 'Target Circle rewards are automatically applied at checkout when you scan your barcode or use your phone number. You can view your available rewards in the Target app.',
    keywords: ['circle', 'rewards', 'points', 'discount', 'benefits']
  },
  {
    id: '4',
    question: 'What payment methods do you accept?',
    answer: 'We accept major credit cards, debit cards, Target RedCard, PayPal, Apple Pay, Google Pay, and cash in stores.',
    keywords: ['payment', 'card', 'redcard', 'paypal', 'apple pay', 'google pay', 'cash']
  },
  {
    id: '5',
    question: 'How can I change or cancel my order?',
    answer: 'You can modify or cancel your order within 1 hour of placing it by going to "My Orders" in your account. After that, contact customer service for assistance.',
    keywords: ['cancel', 'change', 'modify', 'edit', 'order']
  }
];

export function CustomerServiceSection() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showBotChat, setShowBotChat] = useState(false);
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

  // Check if live chat is available (7 AM - 10 PM)
  const isLiveChatAvailable = () => {
    const now = new Date();
    const currentHour = now.getHours();
    return currentHour >= 7 && currentHour < 22;
  };

  const findFAQAnswer = (query: string): FAQ | null => {
    const lowerQuery = query.toLowerCase();
    return faqs.find(faq => 
      faq.keywords.some(keyword => lowerQuery.includes(keyword.toLowerCase())) ||
      faq.question.toLowerCase().includes(lowerQuery)
    ) || null;
  };

  const handleBotResponse = (userMessage: string) => {
    const faq = findFAQAnswer(userMessage);
    
    if (faq) {
      // Found answer in FAQ
      const botResponse: ChatMessage = {
        id: Date.now().toString(),
        text: faq.answer,
        sender: 'bot',
        timestamp: new Date(),
        options: ['Is this helpful?', 'I need more help', 'Start over']
      };
      setBotMessages(prev => [...prev, botResponse]);
    } else {
      // No answer found
      const noAnswerResponse: ChatMessage = {
        id: Date.now().toString(),
        text: "I couldn't find a specific answer to your question in our Help Center. Would you like me to connect you with a live agent for personalized assistance?",
        sender: 'bot',
        timestamp: new Date(),
        options: isLiveChatAvailable() 
          ? ['Connect to live chat', 'Try different keywords', 'Browse FAQ topics']
          : ['Leave a message', 'Try different keywords', 'Browse FAQ topics']
      };
      setBotMessages(prev => [...prev, botResponse]);
    }
  };

  const handleBotOptionClick = (option: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: option,
      sender: 'user',
      timestamp: new Date()
    };
    setBotMessages(prev => [...prev, userMessage]);

    // Handle specific options
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
      } else if (faqs.some(faq => faq.question.toLowerCase().includes(option.toLowerCase()))) {
        handleBotResponse(option);
      } else {
        const helpfulResponse: ChatMessage = {
          id: Date.now().toString(),
          text: 'Thank you for your feedback! Is there anything else I can help you with?',
          sender: 'bot',
          timestamp: new Date(),
          options: ['Track my order', 'Return policy', 'Payment methods', 'Browse all topics']
        };
        setBotMessages(prev => [...prev, helpfulResponse]);
      }
    }, 500);
  };

  const handleBotSubmit = () => {
    if (!botInput.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: botInput,
      sender: 'user',
      timestamp: new Date()
    };
    setBotMessages(prev => [...prev, userMessage]);

    // Process bot response
    setTimeout(() => {
      handleBotResponse(botInput);
    }, 500);

    setBotInput('');
  };

  const handlePhoneVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      toast({
        title: "Verification Sent",
        description: "A verification code has been sent to your phone. Please provide it to the representative.",
      });
    }, 2000);
  };

  const startChat = () => {
    setShowChat(true);
    toast({
      title: "Chat Started",
      description: "You're now connected with a customer service representative.",
    });
  };

  const startBotChat = () => {
    setShowBotChat(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-blue-600" />
          Customer Service
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Chat Support */}
          <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <MessageCircle className="w-6 h-6 text-blue-600" />
              <div>
                <h4 className="font-medium">Live Chat</h4>
                <Badge variant="secondary" className={isLiveChatAvailable() ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                  <div className={`w-2 h-2 ${isLiveChatAvailable() ? 'bg-green-500' : 'bg-red-500'} rounded-full mr-1`}></div>
                  {isLiveChatAvailable() ? 'Available' : 'Closed'}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Get instant help from our support team
            </p>
            <Dialog open={showChat} onOpenChange={setShowChat}>
              <DialogTrigger asChild>
                <Button 
                  onClick={startChat} 
                  className="w-full" 
                  variant="outline"
                  disabled={!isLiveChatAvailable()}
                >
                  {isLiveChatAvailable() ? 'Start Chat' : 'Chat Closed'}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Live Chat Support</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="h-64 bg-gray-50 rounded p-4 overflow-y-auto">
                    <div className="space-y-3">
                      <div className="flex justify-start">
                        <div className="bg-blue-100 text-blue-900 px-3 py-2 rounded-lg max-w-xs">
                          Hi! I'm Alex from Target customer service. How can I help you today?
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Type your message..." 
                      className="flex-1 px-3 py-2 border rounded-lg"
                    />
                    <Button size="sm">Send</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Phone Support */}
          <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <Phone className="w-6 h-6 text-green-600" />
              <div>
                <h4 className="font-medium">Phone Support</h4>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="w-3 h-3" />
                  7 AM - 10 PM
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Call us at 1-800-TARGET (827-4388)
            </p>
            <div className="space-y-2">
              <Button 
                onClick={handlePhoneVerification}
                disabled={isVerifying || isVerified}
                className="w-full"
                variant="outline"
              >
                {isVerifying ? (
                  "Sending Verification..."
                ) : isVerified ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verified for Call
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Get Phone Verification
                  </>
                )}
              </Button>
              {isVerified && (
                <p className="text-xs text-green-600 text-center">
                  You're verified! Mention code when calling.
                </p>
              )}
            </div>
          </div>

          {/* Self-Service Chatbot */}
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
        </div>

        <div className="mt-4 p-4 bg-orange-50 rounded-lg">
          <h4 className="font-medium text-orange-900 mb-2">Quick Help Topics</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Button variant="ghost" size="sm" className="justify-start h-auto p-2">
              Order Status & Tracking
            </Button>
            <Button variant="ghost" size="sm" className="justify-start h-auto p-2">
              Returns & Exchanges
            </Button>
            <Button variant="ghost" size="sm" className="justify-start h-auto p-2">
              Payment Issues
            </Button>
            <Button variant="ghost" size="sm" className="justify-start h-auto p-2">
              Account Settings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
