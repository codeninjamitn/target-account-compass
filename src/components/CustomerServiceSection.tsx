
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LiveChatSection } from "./LiveChatSection";
import { PhoneSupportSection } from "./PhoneSupportSection";
import { BotChatSection } from "./BotChatSection";

export function CustomerServiceSection() {
  const [showChat, setShowChat] = useState(false);
  const [showBotChat, setShowBotChat] = useState(false);

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
          <LiveChatSection showChat={showChat} setShowChat={setShowChat} />
          <PhoneSupportSection />
          <BotChatSection 
            showBotChat={showBotChat} 
            setShowBotChat={setShowBotChat}
            setShowChat={setShowChat}
          />
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
