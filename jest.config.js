/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testTimeout: 30000,
  preset: "ts-jest",
  collectCoverage: false,
  moduleDirectories: ["node_modules"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1"
  },
  testEnvironment: "node",
  testRegex: ".test.ts$",
  // testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  modulePathIgnorePatterns: ["dist/package.json", "<rootDir>/package.json"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json"
    },
    astTransformers: {
      before: ["<rootDir>/test/config/gql-plugin.e2e-spec.js"]
    }
  }
}
