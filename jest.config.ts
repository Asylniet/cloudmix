import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageDirectory: "coverage",
  collectCoverage: true,
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  moduleNameMapper: {
    // ...
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@/styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@/store/(.*)$": "<rootDir>/src/store/$1",
    "^@/lib/(.*)$": "<rootDir>/src/lib/$1",
  },
};

export default createJestConfig(config);
