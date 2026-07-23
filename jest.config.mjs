export default {
    projects: [
        {
            displayName: "Unit Tests in BACKEND fulfilled in",
            testEnvironment: "node",
            testMatch: ["<rootDir>/src/test/backend/**/*.test.js"],
        },
        {
            displayName: "Unit Tests in FRONTEND fulfilled in",
            testEnvironment: "jsdom",
            testMatch: ["<rootDir>/src/test/frontend/**/*.test.js"],
        }
    ],
};