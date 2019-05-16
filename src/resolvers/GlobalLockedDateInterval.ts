import { QueryResolvers } from "../codegen/resolvers";
import { Context } from "../@types/crete-your-life/Context";

import { map, curry, flatten } from "lodash";
import { parseISO, eachDayOfInterval } from "date-fns";
import { findGlobalLockedDateRanges } from "../repositories/lockedDateIntervalRepository";
import { GlobalLockedDateRange } from "../codegen/prisma/client";

const getDatesFromInterval = curry(
  (
    startDate: string,
    endDate: string,
    range: GlobalLockedDateRange
  ): string[] => {
    const usedStartDate =
      startDate > range.startDate ? startDate : range.startDate;
    const usedEndDate = endDate < range.endDate ? endDate : range.endDate;
    const momentRange = eachDayOfInterval({
      start: parseISO(usedStartDate),
      end: parseISO(usedEndDate)
    });

    return map(momentRange, (date): string => date.toISOString());
  }
);

const globalLockedDates = async (
  _parent: unknown,
  { interval: { start, end } }: QueryResolvers.ArgsGlobalLockedDates,
  { prisma }: Context
): Promise<string[]> =>
  flatten(
    map(
      await findGlobalLockedDateRanges(prisma, start, end),
      getDatesFromInterval(start, end)
    )
  );

export const Query = {
  globalLockedDates
};
