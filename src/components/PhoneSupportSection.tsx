
import { useState } from "react";
import { Phone, Shield, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function PhoneSupportSection() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { toast } = useToast();

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

  return (
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
  );
}
