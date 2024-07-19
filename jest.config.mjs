// export default {
//     collectCoverage: true,
//     collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
//     coverageDirectory: 'coverage',
//     testEnvironment: 'jsdom',
//     setupFilesAfterEnv: ['./jest.setup.js'],
//   };

  export default {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
    setupFilesAfterEnv: ["./jest.setup.ts"],
  };