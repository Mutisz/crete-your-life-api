import { ActivityCategoryPromise } from "../codegen/prisma/client";
import { ActivityCategoryTranslationResolvers } from "../codegen/resolvers";

export const Resolvers: ActivityCategoryTranslationResolvers.Type = {
  ...ActivityCategoryTranslationResolvers.defaultResolvers,
  activityCategory: (
    { activityCategoryTranslationId },
    _args,
    { prisma }
  ): ActivityCategoryPromise =>
    prisma
      .activityCategoryTranslation({ activityCategoryTranslationId })
      .activityCategory()
};
