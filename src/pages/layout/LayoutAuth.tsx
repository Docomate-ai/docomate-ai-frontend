import { Outlet } from "react-router";
import { Toaster } from "sonner";

export default function LayoutAuth() {
  return (
    <div>
      <Outlet />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
