import { ActivityPromise } from "../codegen/prisma/client";
import { ActivityLockedDateIntervalResolvers } from "../codegen/resolvers";

export const Resolvers: ActivityLockedDateIntervalResolvers.Type = {
  ...ActivityLockedDateIntervalResolvers.defaultResolvers,
  activity: (
    { activityLockedDateIntervalId },
    _args,
    { prisma }
  ): ActivityPromise =>
    prisma
      .activityLockedDateInterval({ activityLockedDateIntervalId })
      .activity()
};
