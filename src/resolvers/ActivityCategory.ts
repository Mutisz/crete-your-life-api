import {
  FragmentableArray,
  ActivityCategoryTranslation
} from "../codegen/prisma/client";
import { ActivityCategoryResolvers } from "../codegen/resolvers";

export const Resolvers: ActivityCategoryResolvers.Type = {
  ...ActivityCategoryResolvers.defaultResolvers,
  translations: (
    { activityCategoryId },
    _args,
    { prisma }
  ): FragmentableArray<ActivityCategoryTranslation> =>
    prisma.activityCategory({ activityCategoryId }).translations()
};
