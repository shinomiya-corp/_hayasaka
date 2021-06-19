declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    DATABASE_URL: string;
    MUSIC_SERVICE_REDIS_URL: string;
    SUPERUSER_KEY: string;
  }
}
