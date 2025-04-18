import LoadingSpinner from "@/components/loader";
import React from "react";
import axios from "@/lib/axios";
import { Outlet, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import { Toaster } from "sonner";

export default function LayoutPrimary() {
  const navigate = useNavigate();

  const { isLoading, isError, error } = useQuery({
    queryKey: ["authCheck"],
    queryFn: async () => {
      const response = await axios.get("/auth/whoami");
      console.log(response);
      return response.data;
    },
  });

  // Handle navigation on error
  React.useEffect(() => {
    if (isError) {
      console.log(error);
      navigate("/auth/login");
    }
  }, [isError, navigate, error]);

  if (isLoading) {
    return (
      <div className="h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
