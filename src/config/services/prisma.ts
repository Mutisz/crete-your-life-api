import { Config } from "../../@types/crete-your-life/Config";

import { Prisma } from "../../codegen/prisma/client";

const createPrismaService = (config: Config) =>
  new Prisma({
    debug: false,
    endpoint: config.PRISMA_HOST,
    secret: config.PRISMA_SECRET
  });

export default createPrismaService;
