import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function SettingsAccount() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handlePasswordSave = () => {
    console.log("Password updated:", { currentPassword, newPassword });
  };

  const handleAccountDelete = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      console.log("Account deleted");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="current-password">Current Password</Label>
          <Input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <Label htmlFor="new-password">New Password</Label>
          <Input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Button onClick={handlePasswordSave} className="mt-2">
            Save Password
          </Button>
        </div>

        <Separator />

        <div>
          <Button variant="destructive" onClick={handleAccountDelete}>
            Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
