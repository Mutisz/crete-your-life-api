import { Prisma } from "../../generated/client";
import IConfig from "../types/IConfig";

const createPrismaService = (config: IConfig) =>
  new Prisma({ endpoint: config.PRISMA_HOST, secret: config.PRISMA_SECRET });

export default createPrismaService;
