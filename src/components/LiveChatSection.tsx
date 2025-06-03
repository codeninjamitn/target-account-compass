
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { isLiveChatAvailable } from "@/utils/customer-service";

interface LiveChatSectionProps {
  showChat: boolean;
  setShowChat: (show: boolean) => void;
}

export function LiveChatSection({ showChat, setShowChat }: LiveChatSectionProps) {
  const { toast } = useToast();
  const chatAvailable = isLiveChatAvailable();

  const startChat = () => {
    setShowChat(true);
    toast({
      title: "Chat Started",
      description: "You're now connected with a customer service representative.",
    });
  };

  return (
    <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <MessageCircle className="w-6 h-6 text-blue-600" />
        <div>
          <h4 className="font-medium">Live Chat</h4>
          <Badge variant="secondary" className={chatAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
            <div className={`w-2 h-2 ${chatAvailable ? 'bg-green-500' : 'bg-red-500'} rounded-full mr-1`}></div>
            {chatAvailable ? 'Available' : 'Closed'}
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
            disabled={!chatAvailable}
          >
            {chatAvailable ? 'Start Chat' : 'Chat Closed'}
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
  );
}
