import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { AxiosError } from "axios";
import axios from "@/lib/axios";
import { toast } from "sonner";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthRoute = location.pathname.startsWith("/auth");

  if (isAuthRoute) {
    return null;
  }

  const onLogout = async () => {
    try {
      const res = await axios.delete("/auth/logout");
      console.log("Logout Success: ", res.data.message);
      toast.success(<strong>{res.data.message}</strong>);
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(<strong>{error.response.data.error}</strong>);
        console.error("Error loggin out: ", error.response.data.error);
      } else {
        console.error("Error loggin out: ", error);
      }
    }
  };

  return (
    <header className="w-full h-[10vh] border-b px-4 py-2 flex items-center justify-between">
      {/* Conditional Rendering Based on Route */}
      {!isAuthRoute && (
        <div className="flex items-center justify-between w-full gap-6 ">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/docomate-ai-frontend/docai-logo.png"
              alt="Logo"
              className="h-14 w-auto rounded-full"
            />
          </Link>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center focus:outline-none cursor-pointer">
                <img
                  src="/docomate-ai-frontend/images/avatar.png"
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button onClick={onLogout}>Logout</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </header>
  );
};

export default Header;
