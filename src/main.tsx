import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
// import RefreshComponent from "./pages/RefreshComponent";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OtpPage from "./pages/OtpPage";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LayoutPrimary from "./pages/layout/LayoutPrimary";
import App from "./pages/App";
import LayoutAuth from "./pages/layout/LayoutAuth";
import ProjectPage from "./pages/ProjectPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPrimary />,
    children: [
      {
        path: "",
        element: <App />,
        children: [],
      },
      {
        path: "auth",
        element: <LayoutAuth />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
          {
            path: "verify-otp",
            element: <OtpPage />,
          },
        ],
      },
      {
        path: "project",
        children: [
          {
            path: ":id",
            element: <ProjectPage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
