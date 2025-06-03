
import { useState } from "react";
import { MessageCircle, Phone, Bot, Shield, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export function CustomerServiceSection() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { toast } = useToast();

  const handlePhoneVerification = () => {
    setIsVerifying(true);
    // Simulate verification process
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
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  Available
                </Badge>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Get instant help from our support team
            </p>
            <Dialog open={showChat} onOpenChange={setShowChat}>
              <DialogTrigger asChild>
                <Button onClick={startChat} className="w-full" variant="outline">
                  Start Chat
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
                <h4 className="font-medium">Self-Service Bot</h4>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  24/7 Available
                </Badge>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Get quick answers to common questions
            </p>
            <Button className="w-full" variant="outline">
              Start Self-Service
            </Button>
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
