import { get } from "lodash";

import { Config } from "../types/Config";

const requireConfigValue = (variable: string): string => {
  const value = get(process.env, variable, null);
  if (value === null) {
    throw new Error(`No environment variable ${variable} declared`);
  }

  return String(value);
};

const createConfig = (): Config => ({
  API_HOST: requireConfigValue("API_HOST"),

  DB_HOST: requireConfigValue("DB_HOST"),
  DB_PASSWORD: requireConfigValue("DB_PASSWORD"),
  DB_PORT: Number(requireConfigValue("DB_PORT")),

  PRISMA_HOST: requireConfigValue("PRISMA_HOST"),
  PRISMA_MANAGEMENT_API_SECRET: requireConfigValue(
    "PRISMA_MANAGEMENT_API_SECRET"
  ),
  PRISMA_PORT: Number(requireConfigValue("PRISMA_PORT")),
  PRISMA_SECRET: requireConfigValue("PRISMA_SECRET"),

  HANDLER_BOOKING_CREATED: requireConfigValue("HANDLER_BOOKING_CREATED"),

  S3_ACCESS_KEY_ID: requireConfigValue("S3_ACCESS_KEY_ID"),
  S3_BUCKET: requireConfigValue("S3_BUCKET"),
  S3_SECRET_ACCESS_KEY: requireConfigValue("S3_SECRET_ACCESS_KEY"),

  FIXER_ACCESS_KEY: requireConfigValue("FIXER_ACCESS_KEY")
});

export default createConfig;
