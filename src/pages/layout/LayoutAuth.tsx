import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { Toaster } from "sonner";
import axios from "@/lib/axios";
import LoadingSpinner from "@/components/loader";
import { AxiosError } from "axios";

export default function LayoutAuth() {
  const navigate = useNavigate();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["authCheck"],
    queryFn: async () => {
      try {
        const response = await axios.get("/auth/whoami");
        return response.data;
      } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 403) {
          console.log("Bad Request: User not authenticated.");
          return null; // Will allow rendering Outlet
        }
        throw err; // Other errors are treated as actual query errors
      }
    },
    retry: false, // prevent retry on failure
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (data && data.statusCode === 200) {
      navigate("/");
    }
  }, [data, navigate]);

  if (isLoading) {
    return (
      <div className="h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // If other unexpected errors
  if (isError) {
    console.error("Unexpected error during auth check:", error);
  }

  return (
    <div>
      <Outlet />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
