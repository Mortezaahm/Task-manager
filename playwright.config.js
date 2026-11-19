import { defineConfig } from "@playwright/test";
import { env } from "node:process";

export default defineConfig({
  testDir: "./tests/e2e",

  fullyParallel: true,

  forbidOnly: Boolean(env.CI),

  retries: env.CI ? 2 : 0,

  workers: env.CI ? 1 : undefined,

  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],

  use: {
    baseURL: "http://127.0.0.1:5173",

    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
      },
    },
  ],

  webServer: {
    command: "npm run dev -- --host 127.0.0.1",

    url: "http://127.0.0.1:5173",

    reuseExistingServer: !env.CI,

    timeout: 30_000,
  },
});
