export interface Config {
  API_HOST: string;
  PRISMA_HOST: string;
  PRISMA_PORT: number;
  PRISMA_SECRET: string;
  PRISMA_MANAGEMENT_API_SECRET: string;
  HANDLER_BOOKING_CREATED: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_PASSWORD: string;
  S3_BUCKET: string;
  S3_ACCESS_KEY_ID: string;
  S3_SECRET_ACCESS_KEY: string;
  FIXER_ACCESS_KEY: string;
}
