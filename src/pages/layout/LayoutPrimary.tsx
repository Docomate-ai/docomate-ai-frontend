import LoadingSpinner from "@/components/loader";
import React from "react";
import axios from "@/lib/axios";
import { Outlet, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import { Toaster } from "sonner";
import ThemeProvider from "@/context/ThemeProvider";
import ContextProvider from "@/context/ContentProvider";

export default function LayoutPrimary() {
  const navigate = useNavigate();
  const { isLoading, isError, error } = useQuery({
    queryKey: ["authCheck"],
    queryFn: async () => {
      const response = await axios.get("/auth/whoami");
      console.log(response);
      return response;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  // Handle navigation on error
  React.useEffect(() => {
    if (isError) {
      console.log(error);
      navigate("/auth/login");
    }
  }, [isError, navigate, error]);

  // handling theme mode context
  const [themeMode, setThemeMode] = React.useState("light");
  function lightTheme() {
    setThemeMode("light");
  }
  function darkTheme() {
    setThemeMode("dark");
  }
  React.useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      const classList = html.classList;
      classList.remove("light", "dark");
      classList.add(themeMode);
    }
  }, [themeMode]);

  const [content, setContent] = React.useState({
    _id: "",
    projectId: "",
    contentName: "",
    contentType: "",
    content: "",
  });

  if (isLoading) {
    return (
      <div className="h-screen">
        <LoadingSpinner messages={["loading"]} fullscreen={true} />
      </div>
    );
  }

  return (
    <ContextProvider value={{ content, setContent }}>
      <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
        <div>
          <Header />
          <main>
            <Outlet />
          </main>
          <Toaster position="bottom-right" richColors />
        </div>
      </ThemeProvider>
    </ContextProvider>
  );
}
