import dotenv from "dotenv-safe";

const createConfig = () => {
  dotenv.config();
  return process.env;
};

export default createConfig;
