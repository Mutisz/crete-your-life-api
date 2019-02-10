import { ActivityResolvers, QueryResolvers } from "../generated/resolvers";
import { Context } from "../types/Context";

const activities = (parent: any, args: any, { prisma }: Context) =>
  prisma.activities({ orderBy: "name_ASC" });

const activity = (
  parent: any,
  args: QueryResolvers.ArgsActivity,
  { prisma }: Context,
) => prisma.activity({ name: args.name });

export const Query = {
  activities,
  activity,
};

export const Resolvers: ActivityResolvers.Type = {
  ...ActivityResolvers.defaultResolvers,
  images: (parent, args, { prisma }) =>
    prisma.activity({ name: parent.name }).images(),
  translations: (parent, args, { prisma }) =>
    prisma.activity({ name: parent.name }).translations(),
};
