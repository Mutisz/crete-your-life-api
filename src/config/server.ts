import { GraphQLServer } from "graphql-yoga";

import createCurrencyService from "./services/currency";
import createPrismaService from "./services/prisma";
import createStorageService from "./services/storage";

import resolvers from "../resolvers";

import { Config } from "../@types/crete-your-life/Config";
import { Context } from "../@types/crete-your-life/Context";

const createContext = (config: Config): Context => ({
  config,
  currency: createCurrencyService(config),
  prisma: createPrismaService(config),
  storage: createStorageService(config)
});

const createServer = (config: Config) =>
  new GraphQLServer({
    context: createContext(config),
    resolvers: resolvers as any,
    typeDefs: "src/schema/app.graphql"
  });

export default createServer;
