import { GraphQLServer } from "graphql-yoga";

import createPrismaService from "./services/prisma";
import createStorageService from "./services/storage";
import createCurrencyService from "./services/currency";

import resolvers from "../resolvers";

const createContext = config =>
  Object.create({
    prisma: createPrismaService(config),
    storage: createStorageService(config),
    currency: createCurrencyService(config),
    config
  });

const createServer = config =>
  new GraphQLServer({
    context: createContext(config),
    typeDefs: "src/schema/api.graphql",
    resolvers
  });

export default createServer;
