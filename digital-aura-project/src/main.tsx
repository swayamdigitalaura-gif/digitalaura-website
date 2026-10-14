// v2
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initAttribution } from "./lib/leadTracking.ts";

initAttribution();

createRoot(document.getElementById("root")!).render(<App />);
