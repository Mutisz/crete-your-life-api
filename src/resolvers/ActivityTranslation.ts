import { ActivityTranslationResolvers } from "../codegen/resolvers";

export const Resolvers: ActivityTranslationResolvers.Type = {
  ...ActivityTranslationResolvers.defaultResolvers,
  activity: ({ name }, args, { prisma }) =>
    prisma.activityTranslation({ name }).activity()
};
