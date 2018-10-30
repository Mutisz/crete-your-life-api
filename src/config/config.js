import dotenv from "dotenv";
import joi from "joi";

const configSchema = joi
  .object({
    API_HOST: joi
      .string()
      .uri()
      .required(),
    API_PORT: joi
      .number()
      .port()
      .required(),
    S3_BUCKET: joi.string().required(),
    S3_ACCESS_KEY_ID: joi.string().required(),
    S3_SECRET_ACCESS_KEY: joi.string().required(),
    FIXER_ACCESS_KEY: joi.string().required(),
    PRISMA_HOST: joi
      .string()
      .uri()
      .required(),
    PRISMA_PORT: joi
      .number()
      .port()
      .required(),
    PRISMA_MANAGEMENT_API_SECRET: joi.string().required(),
    PRISMA_SECRET: joi.string().required(),
    DB_PORT: joi
      .number()
      .port()
      .required(),
    DB_HOST: joi
      .string()
      .uri()
      .required(),
    DB_PASSWORD: joi.string().required()
  })
  .required();

const createConfig = () => {
  // const config = dotenv.config();
  // const { parsed } = config;
  // const { error, value: validated } = joi.validate(parsed, configSchema);
  // if (error) throw error;
  return process.env;
};

export default createConfig;
