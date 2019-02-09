import { ActivityTranslationResolvers } from "../generated/resolvers";

export const Resolvers: ActivityTranslationResolvers.Type = {
  ...ActivityTranslationResolvers.defaultResolvers,
  activity: ({ name }, args, { prisma }) =>
    prisma.activityTranslation({ name }).activity(),
};
