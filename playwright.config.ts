import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './app/__tests__/e2e',
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  }
})