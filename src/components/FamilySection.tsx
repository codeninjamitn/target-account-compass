
import { useState } from "react";
import { Users, Plus, Crown, UserCheck, UserX, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const familyMembers = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@email.com", role: "Family Manager", status: "active", avatar: "SJ" },
  { id: 2, name: "Mike Johnson", email: "mike.j@email.com", role: "Member", status: "active", avatar: "MJ" },
  { id: 3, name: "Emma Johnson", email: "emma.j@email.com", role: "Member", status: "pending", avatar: "EJ" },
];

export function FamilySection() {
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");

  const handleAddMember = () => {
    console.log("Adding member:", newMemberEmail);
    setNewMemberEmail("");
    setIsAddingMember(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-red-600" />
            Family Shopping Partners
          </CardTitle>
          <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Family Member</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddingMember(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddMember} className="bg-red-600 hover:bg-red-700">
                    Send Invitation
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {familyMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-semibold">
                  {member.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{member.name}</span>
                    {member.role === "Family Manager" && (
                      <Crown className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                  <div className="text-sm text-gray-600">{member.email}</div>
                  <div className="text-xs text-gray-500">{member.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                  member.status === "active" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {member.status === "active" ? (
                    <UserCheck className="w-3 h-3" />
                  ) : (
                    <UserX className="w-3 h-3" />
                  )}
                  {member.status}
                </div>
                {member.role !== "Family Manager" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Remove Member</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Family Benefits</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Share Target Circle rewards and offers</li>
            <li>• Coordinated shopping lists and wish lists</li>
            <li>• Family order history and tracking</li>
            <li>• Shared payment methods (with permissions)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
