import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import { Toaster } from "sonner";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <App />
      <Toaster />
    </Provider>
  </StrictMode>
);
