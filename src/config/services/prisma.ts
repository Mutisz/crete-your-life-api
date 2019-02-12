import { Prisma } from "../../generated/client";

import { Config } from "../../types/Config";

const createPrismaService = (config: Config) =>
  new Prisma({
    debug: false,
    endpoint: config.PRISMA_HOST,
    secret: config.PRISMA_SECRET,
  });

export default createPrismaService;
