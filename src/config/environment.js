// Environment configuration
const config = {
  // Use environment variable in production, fallback to localhost in development
  API_URL: process.env.REACT_APP_API_URL || "http://localhost:8081/graphql",
};

export default config;
