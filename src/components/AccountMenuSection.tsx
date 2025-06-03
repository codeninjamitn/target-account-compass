
import { 
  Package, 
  CreditCard, 
  MapPin, 
  Target, 
  Gift, 
  Settings, 
  Lock, 
  Mail,
  ChevronRight 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const accountMenuItems = [
  { icon: Package, title: "Order History", description: "View past orders and tracking", color: "text-blue-600" },
  { icon: CreditCard, title: "Payment Methods", description: "Manage cards and billing", color: "text-green-600" },
  { icon: MapPin, title: "Addresses", description: "Shipping and billing addresses", color: "text-purple-600" },
  { icon: Target, title: "Target Circle", description: "Rewards, offers, and benefits", color: "text-red-600" },
  { icon: Gift, title: "Gift Cards", description: "Check balances and redeem", color: "text-orange-600" },
  { icon: Lock, title: "Privacy & Security", description: "Manage account security", color: "text-gray-600" },
  { icon: Mail, title: "Communication Preferences", description: "Email and notification settings", color: "text-teal-600" },
  { icon: Settings, title: "Account Settings", description: "Personal information and preferences", color: "text-indigo-600" },
];

export function AccountMenuSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {accountMenuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full h-auto p-4 justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <div className="text-left">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.description}</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
