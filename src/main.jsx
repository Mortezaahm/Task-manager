import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

import { loadTasks } from "./services/storageService.js";
import { logger } from "./services/logger.js";

import { getMetrics, recordError } from "./services/monitoringService.js";

import "./index.css";

let initialTasks = [];
let initialError = "";

try {
  initialTasks = loadTasks();
} catch (error) {
  logger.error(`Failed to load tasks: ${error.message}`);

  recordError();

  initialError = "Failed to load saved tasks.";
}

const initialMetrics = getMetrics();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App
      initialTasks={initialTasks}
      initialMetrics={initialMetrics}
      initialError={initialError}
    />
  </StrictMode>,
);
