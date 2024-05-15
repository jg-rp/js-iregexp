module.exports = {
  testEnvironment: "node",
  testRegex: ".*test.ts$",
  transform: { "^.+\\.ts?$": "ts-jest" },
  transformIgnorePatterns: ["<rootDir>/src/iregexp.js"],
  moduleFileExtensions: ["ts", "js", "json"],
  roots: ["<rootDir>/src/", "<rootDir>/tests/"],
  collectCoverage: false,
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["html"],
  testPathIgnorePatterns: ["/node_modules/"],
  slowTestThreshold: 10,
};
