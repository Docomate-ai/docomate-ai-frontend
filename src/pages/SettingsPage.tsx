import { Separator } from "@/components/ui/separator";
import SettingsAccount from "@/components/settings-account";
import SettingsApp from "@/components/settings-app";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 p-6">
      <h1 className="text-3xl font-bold text-center">Settings</h1>

      {/* App Settings */}
      <SettingsApp />
      <Separator />

      {/* Account Settings */}
      <SettingsAccount />
    </div>
  );
}
