import {
  Prisma,
  FragmentableArray,
  GlobalLockedDateRange,
  ActivityLockedDateInterval,
  ActivityLockedDateIntervalWhereInput,
  GlobalLockedDateRangeWhereInput
} from "../codegen/prisma/client";

const getDateRangeWhereInput = (
  startDate: string,
  endDate: string
): ActivityLockedDateIntervalWhereInput | GlobalLockedDateRangeWhereInput => ({
  NOT: {
    OR: {
      startDate_gt: startDate,
      endDate_lt: endDate
    }
  }
});

export const findActivityLockedDateRanges = (
  prisma: Prisma,
  activityName: string,
  startDate: string,
  endDate: string
): FragmentableArray<ActivityLockedDateInterval> =>
  prisma.activityLockedDateIntervals({
    where: {
      activity: { name: activityName },
      ...getDateRangeWhereInput(startDate, endDate)
    }
  });

export const findGlobalLockedDateRanges = (
  prisma: Prisma,
  startDate: string,
  endDate: string
): FragmentableArray<GlobalLockedDateRange> =>
  prisma.globalLockedDateRanges({
    where: getDateRangeWhereInput(startDate, endDate)
  });
