import envalid, { str } from "envalid";

const createConfig = () =>
  envalid.cleanEnv(process.env, {
    S3_BUCKET: str(),
    S3_ACCESS_KEY_ID: str(),
    S3_SECRET_ACCESS_KEY: str(),
    FIXER_ACCESS_KEY: str()
  });

export default createConfig;
