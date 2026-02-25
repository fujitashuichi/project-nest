const requiredEnv = (value: string | undefined, key: string): string => {
  if (!value) {
    throw new Error(`Environment variable ${key} is missing`);
  }
  return value;
};

export const ENV = {
  FE_URL: requiredEnv(process.env.NODE_FE_URL, "NODE_FE_URL"),
  JWT_SECRET: requiredEnv(process.env.NODE_JWT_SECRET, "NODE_JWT_SECRET"),
};
