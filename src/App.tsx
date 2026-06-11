import "@/styles/global.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./layout/ThemeProvider";
import { router } from "./routes";

// ✅ ADD THESE
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/common/Toast";

// ✅ create client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster/>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
