const requiredEnv = (value: string | undefined, key: string): string => {
  if (!value) {
    throw new Error(`Environment variable ${key} is missing`);
  }
  return value;
};

export const ENV = {
  get NODE_FE_URL() {
    return requiredEnv(process.env.NODE_FE_URL, "NODE_FE_URL")
  },
  get JWT_SECRET() {
    return requiredEnv(process.env.NODE_JWT_SECRET, "NODE_JWT_SECRET")
  },
};
