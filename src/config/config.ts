import IConfig from "./types/IConfig";

const createConfig = (): IConfig => ({
  API_HOST: process.env.API_HOST,
  DB_HOST: process.env.DB_HOST,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: Number(process.env.DB_PORT),
  FIXER_ACCESS_KEY: process.env.FIXER_ACCESS_KEY,
  HANDLER_BOOKING_CREATED: process.env.HANDLER_BOOKING_CREATED,
  PRISMA_HOST: process.env.PRISMA_HOST,
  PRISMA_MANAGEMENT_API_SECRET: process.env.PRISMA_MANAGEMENT_API_SECRET,
  PRISMA_PORT: Number(process.env.PRISMA_PORT),
  PRISMA_SECRET: process.env.PRISMA_SECRET,
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
  S3_BUCKET: process.env.S3_BUCKET,
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
});

export default createConfig;
