import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import axios from "@/lib/axios";
import { AxiosError } from "axios";

export default function SettingsAccount() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.patch("/users/change-password", {
        currentPassword,
        newPassword,
      });

      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Password updated successfully");
      console.log(data);
      setCurrentPassword(() => "");
      setNewPassword(() => "");
    },
    onError: (err) => {
      if (err instanceof AxiosError && err.response?.data) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
      console.log(err);
    },
  });

  const handlePasswordSave = () => {
    if (currentPassword.length < 4 || newPassword.length < 4) {
      toast.error("password must have atleast 4 characters ");
      return;
    }
    mutation.mutate();
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
