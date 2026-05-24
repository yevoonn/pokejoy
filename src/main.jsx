import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ApolloAppProvider from "./app/providers/ApolloAppProvider.jsx";
import App from "./app/App.jsx";
import "@fontsource/inter";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloAppProvider>
      <App />
    </ApolloAppProvider>
  </StrictMode>,
);
