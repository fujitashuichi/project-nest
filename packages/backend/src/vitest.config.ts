import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    env: {
      NODE_JWT_TOKEN: "test-jwt-token",
      DATABASE_URL: 'file:./test.sqlite',
    }
  },
});
