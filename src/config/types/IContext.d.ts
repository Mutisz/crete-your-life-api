import { S3 } from "aws-sdk/clients/all";
import { Prisma } from "../../generated/client";
import IConfig from "./IConfig";

export default interface IContext {
  prisma: Prisma;
  storage: S3;
  currency: any;
  config: IConfig;
}
