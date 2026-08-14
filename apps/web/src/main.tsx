import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";

import App from "@/App";
import { AuthProvider } from "@/context/AuthContext";
import ReduxProvider from "@/providers/ReduxProvider";
import { QueryProvider } from "@/providers/QueryProvider";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")!,
).render(
  <React.StrictMode>
    <ReduxProvider>
      <QueryProvider>
        <AuthProvider>
          <App />

          <Toaster
            richColors
            position="top-right"
            expand
            closeButton
          />
        </AuthProvider>
      </QueryProvider>
    </ReduxProvider>
  </React.StrictMode>,
);