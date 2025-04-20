import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OtpPage from "./pages/OtpPage";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LayoutPrimary from "./pages/layout/LayoutPrimary";
import App from "./pages/App";
import LayoutAuth from "./pages/layout/LayoutAuth";
import ProjectPage from "./pages/ProjectPage";
import ProfilePage from "./pages/ProfilePage";
import ReadmeSectionPage from "./pages/ReadmeSectionsPage";
import ReadmeResult from "./pages/ReadmeResult";
import SettingsPage from "./pages/SettingsPage";
import ContentPage from "./pages/ContentPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <LayoutPrimary />,
        children: [
          {
            path: "",
            element: <App />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "settings",
            element: <SettingsPage />,
          },
        ],
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
        element: <LayoutPrimary />,
        children: [
          {
            path: ":id",
            element: <ProjectPage />,
          },
          {
            path: ":id/readme-sections",
            element: <ReadmeSectionPage />,
          },
          {
            path: ":id/readme",
            element: <ReadmeResult />,
          },
          {
            path: ":projectId/:contentId",
            element: <ContentPage />,
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
