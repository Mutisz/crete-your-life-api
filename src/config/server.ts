import { GraphQLServer } from "graphql-yoga";
import { IResolvers } from "graphql-tools";

import { Config } from "../@types/crete-your-life/Config";
import { Context } from "../@types/crete-your-life/Context";

import createCurrencyService from "./services/currency";
import createPrismaService from "./services/prisma";
import createStorageService from "./services/storage";

import resolvers from "../resolvers";

const createContext = (config: Config): Context => ({
  config,
  currency: createCurrencyService(config),
  prisma: createPrismaService(config),
  storage: createStorageService(config)
});

const createServer = (config: Config): GraphQLServer =>
  new GraphQLServer({
    context: createContext(config),
    resolvers: resolvers as IResolvers,
    typeDefs: "src/schema/app.graphql"
  });

export default createServer;
