import { Config } from "../../types/Config";

import { Prisma } from "../../codegen/prisma/client";

const createPrismaService = (config: Config) =>
  new Prisma({
    debug: false,
    endpoint: config.PRISMA_HOST,
    secret: config.PRISMA_SECRET
  });

export default createPrismaService;
