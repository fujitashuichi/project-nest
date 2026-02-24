declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';

    readonly NODE_FE_URL: string;
    readonly NODE_APP_TITLE: string;
    readonly NODE_JWT_SECRET: string;

    readonly NODE_DEBUG_MODE?: string;
  }
}

interface ImportMetaEnv {
  readonly NODE_FE_URL: string;
  readonly NODE_APP_TITLE: string;
  NODE_JWT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}