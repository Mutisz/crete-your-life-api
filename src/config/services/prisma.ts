import { Prisma } from "../../codegen/prisma/client";
import { Config } from "../../@types/crete-your-life/Config";

const createPrismaService = (config: Config): Prisma =>
  new Prisma({
    debug: false,
    endpoint: config.PRISMA_HOST,
    secret: config.PRISMA_SECRET
  });

export default createPrismaService;
