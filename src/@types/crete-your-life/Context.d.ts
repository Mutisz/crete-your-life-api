import Fixer from "fixer-node";
import { S3 } from "aws-sdk/clients/all";
import { Prisma } from "../../codegen/prisma/client";
import { Config } from "./Config";

export interface Context {
  prisma: Prisma;
  storage: S3;
  currency: Fixer;
  config: Config;
}
