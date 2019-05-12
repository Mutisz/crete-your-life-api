import { ActivityPromise } from "../codegen/prisma/client";
import { ActivityTranslationResolvers } from "../codegen/resolvers";

export const Resolvers: ActivityTranslationResolvers.Type = {
  ...ActivityTranslationResolvers.defaultResolvers,
  activity: ({ name }, _args, { prisma }): ActivityPromise =>
    prisma.activityTranslation({ name }).activity()
};
