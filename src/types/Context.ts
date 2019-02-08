import { S3 } from "aws-sdk/clients/all";
import { Prisma } from "../generated/client";
import { Config } from "./Config";

export interface Context {
  prisma: Prisma;
  storage: S3;
  currency: any;
  config: Config;
}
