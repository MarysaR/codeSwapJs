/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  roots: ["<rootDir>/src/tests"],
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["<rootDir>/src/tests/specs/**/*.spec.ts"],
};
