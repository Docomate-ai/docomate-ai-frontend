import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useTheme from "@/context/theme.context";

export default function SettingsApp() {
  const { themeMode, darkTheme, lightTheme } = useTheme();

  function handleTheme() {
    if (themeMode === "light") darkTheme();
    else lightTheme();
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>App Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Theme</Label>
          <Select value={themeMode} onValueChange={handleTheme}>
            <SelectTrigger>
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Disabled Language */}
        <div className="space-y-1 opacity-50">
          <Label>Language</Label>
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="English" />
            </SelectTrigger>
          </Select>
        </div>

        {/* Disabled Notifications */}
        <div className="space-y-1 opacity-50">
          <Label>Notifications</Label>
          <Input type="checkbox" disabled className="w-4 h-4" />
        </div>
      </CardContent>
    </Card>
  );
}
