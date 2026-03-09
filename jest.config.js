module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^expo/src/winter$": "<rootDir>/__mocks__/expo-winter.js",
    "^@/constants/theme$": "<rootDir>/src/shared/theme/theme",
    "^@/constants/scaling$": "<rootDir>/src/shared/theme/scaling",
    "^@/constants/typography$": "<rootDir>/src/shared/theme/typography",
    "^@/components/(.*)$": "<rootDir>/src/shared/components/$1",
    "^@/shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@/features/(.*)$": "<rootDir>/src/features/$1",
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
    "^@/i18n$": "<rootDir>/i18n/index.ts",
    "^@/(.*)$": "<rootDir>/$1",
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/app/**/*.tsx",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  coverageThreshold: {
    global: {
      statements: 5,
      branches: 5,
      functions: 2,
      lines: 5,
    },
  },
  // Transform ESM packages used by Redux Toolkit (immer) and Expo setup (expo-modules-core)
  transformIgnorePatterns: [
    "/node_modules/(?!(.pnpm|react-native|@react-native|@react-native-community|expo|@expo|expo-modules-core|@expo-google-fonts|react-navigation|@react-navigation|@sentry/react-native|native-base|immer|@reduxjs/toolkit)/)",
    "/node_modules/react-native-reanimated/plugin/",
  ],
};
