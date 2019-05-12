import {
  FragmentableArray,
  Activity,
  ActivityTranslation,
  Image
} from "../codegen/prisma/client";
import { ActivityResolvers, QueryResolvers } from "../codegen/resolvers";
import { Context } from "../@types/crete-your-life/Context";

const activities = (
  _parent: unknown,
  _args: unknown,
  { prisma }: Context
): FragmentableArray<Activity> => prisma.activities({ orderBy: "name_ASC" });

const activity = (
  _parent: unknown,
  args: QueryResolvers.ArgsActivity,
  { prisma }: Context
): Promise<Activity> =>
  prisma.activity({ name: args.name }) as Promise<Activity>;

export const Query = {
  activities,
  activity
};

export const Resolvers: ActivityResolvers.Type = {
  ...ActivityResolvers.defaultResolvers,
  images: ({ name }, _args, { prisma }): FragmentableArray<Image> =>
    prisma.activity({ name }).images(),
  translations: (
    { name },
    _args,
    { prisma }
  ): FragmentableArray<ActivityTranslation> =>
    prisma.activity({ name }).translations()
};
