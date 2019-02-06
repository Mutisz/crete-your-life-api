import { GraphQLServer } from "graphql-yoga";

import createCurrencyService from "./services/currency";
import createPrismaService from "./services/prisma";
import createStorageService from "./services/storage";

import resolvers from "../resolvers";

import IConfig from "./types/IConfig";
import IContext from "./types/IContext";

const createContext = (config: IConfig): IContext => ({
  config,
  currency: createCurrencyService(config),
  prisma: createPrismaService(config),
  storage: createStorageService(config),
});

const createServer = (config: IConfig) =>
  new GraphQLServer({
    context: createContext(config),
    resolvers,
    typeDefs: "src/schema/app.graphql",
  });

export default createServer;
